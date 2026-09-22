import React, { useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DispatchContext, StateContext } from "../context/GlobalContext";
import { useTheme } from "styled-components";
import styled from "styled-components";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { homes as defaultHomes } from "../data/homesData";

const MapContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "dark" ? "#0b0f19" : "#f1f5f9"};
    font-family: inherit;
  }

  /* Custom Leaflet Dark & Light styling */
  .custom-price-marker {
    background: linear-gradient(135deg, #059669, #047857);
    color: #ffffff;
    font-weight: 800;
    font-size: 0.8rem;
    padding: 0.35rem 0.65rem;
    border-radius: 20px;
    border: 2px solid #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    &:hover {
      transform: scale(1.12);
      background: linear-gradient(135deg, #10b981, #059669);
      box-shadow: 0 6px 16px rgba(5, 150, 105, 0.5);
    }
  }

  .leaflet-popup-content-wrapper {
    background: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.primaryText};
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    box-shadow: ${({ theme }) => theme.shadowLg};
    padding: 0;
    overflow: hidden;
  }

  .leaflet-popup-content {
    margin: 0;
    line-height: 1.4;
  }

  .leaflet-popup-tip {
    background: ${({ theme }) => theme.cardBg};
  }

  .map-popup-card {
    width: 240px;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      height: 125px;
      object-fit: cover;
      cursor: pointer;
    }

    .popup-body {
      padding: 0.85rem 1rem;

      .popup-price {
        color: #10b981;
        font-weight: 800;
        font-size: 1.1rem;
        margin-bottom: 0.2rem;
      }

      .popup-title {
        font-weight: 700;
        font-size: 0.95rem;
        color: ${({ theme }) => theme.headingColor};
        margin-bottom: 0.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .popup-specs {
        font-size: 0.8rem;
        color: ${({ theme }) => theme.secondaryText};
        margin-bottom: 0.6rem;
      }

      .popup-btn {
        width: 100%;
        background: linear-gradient(135deg, #059669, #047857);
        color: #ffffff;
        border: none;
        border-radius: 8px;
        padding: 0.45rem;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        text-align: center;
        transition: all 0.2s ease;

        &:hover {
          background: #10b981;
        }
      }
    }
  }
`;

const MapContainer = () => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { homes } = state.homesList;

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  const propertyList =
    Array.isArray(homes) && homes.length > 0 ? homes : defaultHomes;

  useEffect(() => {
    if (!mapRef.current) return;

    // Default center on Pakistan (Lahore / Islamabad region)
    const initialLat = 31.5204;
    const initialLng = 74.3587;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [initialLat, initialLng],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      mapInstanceRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;

    // Choose Tile Layer matching Dark or Light theme
    const tileUrl =
      theme.name === "dark"
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    // Alternative dark tiles if desired: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    // Clear existing markers
    if (markersGroupRef.current) {
      markersGroupRef.current.clearLayers();
    }

    const bounds = [];

    propertyList.forEach((home) => {
      if (home.position && home.position.lat && home.position.lng) {
        const lat = Number(home.position.lat);
        const lng = Number(home.position.lng);

        if (!isNaN(lat) && !isNaN(lng)) {
          bounds.push([lat, lng]);

          // Formatted short price label for marker badge
          let shortPrice = home.priceFormatted || `PKR ${home.price}`;
          if (home.priceFormatted) {
            shortPrice = home.priceFormatted.replace("PKR ", "");
          }

          const customIcon = L.divIcon({
            className: "custom-div-icon",
            html: `<div class="custom-price-marker">${shortPrice}</div>`,
            iconSize: [95, 30],
            iconAnchor: [47, 15],
          });

          const marker = L.marker([lat, lng], { icon: customIcon });

          const imageSrc =
            home.images && home.images[0] ? home.images[0] : "/uploads/house1.jpg";
          const displaySize =
            home.sizeFormatted || `${home.size || 1500} Sq Ft`;
          const displayPrice =
            home.priceFormatted || `PKR ${home.price || "Contact"}`;

          const popupContent = `
            <div class="map-popup-card">
              <img src="${imageSrc}" alt="${home.title}" id="popup-img-${home._id}" />
              <div class="popup-body">
                <div class="popup-price">${displayPrice}</div>
                <div class="popup-title">${home.title}</div>
                <div class="popup-specs">${home.rooms ? home.rooms + " Beds • " : ""}${displaySize} • ${home.city || "Pakistan"}</div>
                <button class="popup-btn" id="popup-btn-${home._id}">View Details</button>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, { maxWidth: 260, offset: [0, -10] });

          marker.on("click", () => {
            dispatch({ type: "SET_SELECTEDITEM", payload: home });
          });

          marker.on("popupopen", () => {
            const btn = document.getElementById(`popup-btn-${home._id}`);
            const img = document.getElementById(`popup-img-${home._id}`);
            if (btn) {
              btn.onclick = () => history.push(`/homes/${home._id}`);
            }
            if (img) {
              img.onclick = () => history.push(`/homes/${home._id}`);
            }
          });

          markersGroupRef.current.addLayer(marker);
        }
      }
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }

    return () => {
      // Map cleanup on unmount
    };
  }, [propertyList, theme.name, history, dispatch]);

  return (
    <MapContainerWrapper>
      <div ref={mapRef} />
    </MapContainerWrapper>
  );
};

export default MapContainer;
