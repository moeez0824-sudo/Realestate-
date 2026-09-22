import React, { useState } from "react";
import {
  IoChevronForward,
  IoChevronBack,
  IoCloseCircleSharp,
} from "react-icons/io5";
import styled, { css } from "styled-components";
import { BsDot } from "react-icons/bs";
import { handleImageError } from "../utils/imageHelper";

const InfoWindowContent = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.primaryText};
  position: absolute;
  left: -80px;
  bottom: 100%;
  width: 250px;
  background: ${(props) => props.theme.backgroundVariant};
  padding: 0.5rem;
  padding-top: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

  span {
    display: flex;
    align-items: center;
    font-size: 0.82rem;
    color: ${(props) => props.theme.secondaryText};
  }

  h3 {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0.4rem 0 0.2rem;
    color: ${(props) => props.theme.headingColor};
  }

  .price {
    font-size: 1.05rem;
    font-weight: 800;
    color: #10b981;
  }
`;

const InfoWindowImgContainer = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #0f172a;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }
`;

const arrowStyles = css`
  width: 32px;
  height: 32px;
  z-index: 2;
  color: #fff;
  cursor: pointer;
  background: rgba(15, 23, 42, 0.7);
  border-radius: 50%;
  padding: 4px;
  user-select: none;
  transition: 0.2s;

  &:hover {
    background: #10b981;
    transform: scale(1.15);
  }
`;

const ForwardArrow = styled(IoChevronForward)`
  ${arrowStyles}
`;

const BackwardArrow = styled(IoChevronBack)`
  ${arrowStyles}
`;

const CloseBtn = styled(IoCloseCircleSharp)`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryText};
  position: absolute;
  right: 6px;
  top: 6px;
  z-index: 10;
  transition: color 0.2s ease;

  &:hover {
    color: #ef4444;
  }
`;

function MapInfoWindow({ selectedPlace, history, closeInfoWindow }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const images =
    selectedPlace && Array.isArray(selectedPlace.images) && selectedPlace.images.length > 0
      ? selectedPlace.images
      : ["/uploads/house1.jpg"];

  const forward = () => setSelectedImg((selectedImg + 1) % images.length);
  const backward = () =>
    setSelectedImg(selectedImg === 0 ? images.length - 1 : selectedImg - 1);

  const displayPrice =
    selectedPlace.priceFormatted ||
    (selectedPlace.price ? `PKR ${selectedPlace.price.toLocaleString()}` : "Price on Call");

  return (
    <InfoWindowContent>
      <CloseBtn onClick={closeInfoWindow} />
      <InfoWindowImgContainer>
        {images.length > 1 && <BackwardArrow onClick={backward} />}
        <img
          src={images[selectedImg]}
          alt={selectedPlace.type || "Property"}
          onClick={() => history.push(`/homes/${selectedPlace._id}`)}
          onError={(e) => handleImageError(e, "/uploads/house1.jpg")}
        />
        {images.length > 1 && <ForwardArrow onClick={forward} />}
      </InfoWindowImgContainer>

      <h3>{selectedPlace.title}</h3>
      <span className="price">{displayPrice}</span>
      <span>
        {selectedPlace.type} <BsDot /> {selectedPlace.city || "Pakistan"}
      </span>
      <span>
        {selectedPlace.rooms > 0 ? `${selectedPlace.rooms} Beds • ` : ""}
        {selectedPlace.sizeFormatted || `${selectedPlace.size} Sq Ft`}
      </span>
    </InfoWindowContent>
  );
}

export default MapInfoWindow;
