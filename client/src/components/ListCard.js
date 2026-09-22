import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Button } from "./Button";
import { handleImageError } from "../utils/imageHelper";

const CardWrapper = styled.div`
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  margin: 1.25rem 0;
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadowHover};
    border-color: #10b981;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 230px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  background: #0f172a;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.4s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const PurposeTag = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 5;
  background: linear-gradient(135deg, #059669, #047857);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const ArrowBtn = styled.button`
  width: 36px;
  height: 36px;
  z-index: 10;
  color: #ffffff;
  cursor: pointer;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin: 0 0.75rem;
  backdrop-filter: blur(6px);
  transition: all 0.2s ease;

  &:hover {
    background: #10b981;
    border-color: #10b981;
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;

  .price-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 0.4rem;

    .price {
      font-size: 1.35rem;
      font-weight: 800;
      color: #10b981;
      letter-spacing: -0.5px;
    }

    .type-badge {
      font-size: 0.8rem;
      font-weight: 600;
      color: ${({ theme }) => theme.secondaryText};
      background: ${({ theme }) => theme.backgroundVariant2};
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
    }
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({ theme }) => theme.headingColor};
    line-height: 1.3;
    margin-bottom: 0.4rem;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #10b981;
    }
  }

  .location {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.secondaryText};
    margin-bottom: 0.85rem;

    svg {
      color: #10b981;
    }
  }

  .specs-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    border-top: 1px solid ${({ theme }) => theme.borderColor};
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    margin-bottom: 1rem;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.primaryText};

    .spec-item {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-weight: 600;

      svg {
        color: ${({ theme }) => theme.secondaryText};
      }
    }
  }
`;

function ListCard({
  _id,
  images = [],
  title,
  address,
  city,
  price,
  priceFormatted,
  type,
  purpose,
  date,
  rooms,
  washrooms,
  size,
  sizeFormatted,
}) {
  const history = useHistory();
  const [selectedImg, setSelectedImg] = useState(0);

  const imgList = Array.isArray(images) && images.length > 0 ? images : ["/uploads/house1.jpg"];

  const forward = (e) => {
    e.stopPropagation();
    setSelectedImg((prev) => (prev + 1) % imgList.length);
  };

  const backward = (e) => {
    e.stopPropagation();
    setSelectedImg((prev) => (prev === 0 ? imgList.length - 1 : prev - 1));
  };

  const displayPrice = priceFormatted || (price ? `PKR ${price.toLocaleString()}` : "Price on Call");
  const displaySize = sizeFormatted || (size ? `${size} Sq Ft` : "Standard");

  return (
    <CardWrapper className="list-card">
      <ImagesWrapper>
        <PurposeTag>{purpose ? `For ${purpose}` : "For Sale"}</PurposeTag>
        {imgList.length > 1 && <ArrowBtn onClick={backward}><IoChevronBack /></ArrowBtn>}
        <ImageContainer onClick={() => history.push(`/homes/${_id}`)}>
          <img
            src={imgList[selectedImg]}
            alt={title || "Property"}
            onError={(e) => handleImageError(e, "/uploads/house1.jpg")}
          />
        </ImageContainer>
        {imgList.length > 1 && <ArrowBtn onClick={forward}><IoChevronForward /></ArrowBtn>}
      </ImagesWrapper>

      <CardContent>
        <div className="price-row">
          <div className="price">{displayPrice}</div>
          <div className="type-badge">{type}</div>
        </div>

        <h3 onClick={() => history.push(`/homes/${_id}`)}>{title}</h3>

        <div className="location">
          <FaMapMarkerAlt />
          <span>{address}{city ? `, ${city}` : ""}</span>
        </div>

        <div className="specs-bar">
          {rooms > 0 && (
            <div className="spec-item">
              <FaBed /> {rooms} Beds
            </div>
          )}
          {washrooms > 0 && (
            <div className="spec-item">
              <FaBath /> {washrooms} Baths
            </div>
          )}
          <div className="spec-item">
            <FaRulerCombined /> {displaySize}
          </div>
        </div>

        <Button to={`/homes/${_id}`} primary="true" small="true" style={{ width: "100%" }}>
          View Property Details <FaArrowRight />
        </Button>
      </CardContent>
    </CardWrapper>
  );
}

export default ListCard;
