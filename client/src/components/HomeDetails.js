import React, { useState } from "react";
import styled from "styled-components";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { IoChevronForward, IoChevronBack, IoArrowBackOutline } from "react-icons/io5";
import { ActionButton } from "./Button";
import { handleImageError } from "../utils/imageHelper";

const Container = styled.div`
  margin-top: 80px;
  padding: 2.5rem 2rem 5rem;
  max-width: var(--max-width, 1400px);
  margin-left: auto;
  margin-right: auto;
`;

const BackNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  color: #10b981;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-4px);
  }

  svg {
    font-size: 1.4rem;
  }
`;

const PropertyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadowSm};

  .title-col {
    h1 {
      font-size: clamp(1.6rem, 3vw, 2.25rem);
      font-weight: 800;
      color: ${({ theme }) => theme.headingColor};
      margin-bottom: 0.5rem;
    }

    .location-info {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 1rem;
      color: ${({ theme }) => theme.secondaryText};

      svg {
        color: #10b981;
      }
    }
  }

  .price-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media screen and (max-width: 768px) {
      align-items: flex-start;
    }

    .price-tag {
      font-size: 2.2rem;
      font-weight: 800;
      color: #10b981;
      letter-spacing: -0.5px;
    }

    .status-badge {
      font-size: 0.85rem;
      font-weight: 700;
      color: #ffffff;
      background: linear-gradient(135deg, #059669, #047857);
      padding: 0.3rem 0.85rem;
      border-radius: 6px;
      text-transform: uppercase;
      margin-top: 0.35rem;
    }
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 2.5rem;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  border-radius: 20px;
  overflow: hidden;
  background: #0f172a;
  border: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: ${({ theme }) => theme.shadowMd};
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GalleryArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === "left" ? "left: 1.25rem;" : "right: 1.25rem;")}
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: #10b981;
    border-color: #10b981;
    transform: translateY(-50%) scale(1.1);
  }
`;

const QuickOverview = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 1.75rem;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 1.25rem;
  }

  .specs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .spec-box {
      padding: 1rem;
      border-radius: 12px;
      background: ${({ theme }) => theme.backgroundVariant2};
      border: 1px solid ${({ theme }) => theme.borderColor};
      display: flex;
      align-items: center;
      gap: 0.85rem;

      svg {
        color: #10b981;
        font-size: 1.5rem;
      }

      .spec-meta {
        font-size: 0.8rem;
        color: ${({ theme }) => theme.secondaryText};
        font-weight: 600;
        text-transform: uppercase;
      }

      .spec-val {
        font-size: 1.1rem;
        font-weight: 700;
        color: ${({ theme }) => theme.headingColor};
      }
    }
  }
`;

const DescriptionBox = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 1.75rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.secondaryText};
    line-height: 1.75;
  }
`;

const ContactCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadowLg};
  position: sticky;
  top: 100px;

  h3 {
    font-size: 1.35rem;
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.35rem;
  }

  .sub {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondaryText};
    margin-bottom: 1.5rem;
  }

  .agent-badge {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem;
    border-radius: 12px;
    background: ${({ theme }) => theme.backgroundVariant2};
    border: 1px solid ${({ theme }) => theme.borderColor};
    margin-bottom: 1.5rem;

    .agent-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #10b981;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.2rem;
    }

    .agent-name {
      font-weight: 700;
      color: ${({ theme }) => theme.headingColor};
    }

    .agent-tag {
      font-size: 0.8rem;
      color: #10b981;
      font-weight: 600;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input, textarea {
      width: 100%;
      background: ${({ theme }) => theme.backgroundVariant2};
      border: 1px solid ${({ theme }) => theme.borderColor};
      color: ${({ theme }) => theme.primaryText};
      border-radius: 10px;
      padding: 0.8rem 1rem;
      font-size: 0.95rem;
      outline: none;

      &:focus {
        border-color: #10b981;
      }
    }
  }
`;

function HomeDetails({ home, back }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);

  if (!home) {
    return (
      <Container>
        <BackNav onClick={back}>
          <IoArrowBackOutline /> Back to All Listings
        </BackNav>
        <h2>Property Not Found</h2>
      </Container>
    );
  }

  const images = Array.isArray(home.images) && home.images.length > 0 ? home.images : ["/uploads/house1.jpg"];
  const displayPrice = home.priceFormatted || (home.price ? `PKR ${home.price.toLocaleString()}` : "Price on Call");
  const displaySize = home.sizeFormatted || `${home.size} Sq Ft`;

  const nextImg = () => setSelectedImg((prev) => (prev + 1) % images.length);
  const prevImg = () => setSelectedImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <Container>
      <BackNav onClick={back}>
        <IoArrowBackOutline /> Back to Pakistani Property Listings
      </BackNav>

      <PropertyHeader>
        <div className="title-col">
          <h1>{home.title}</h1>
          <div className="location-info">
            <FaMapMarkerAlt />
            <span>
              {home.address}, {home.city || "Pakistan"}
            </span>
          </div>
        </div>

        <div className="price-col">
          <div className="price-tag">{displayPrice}</div>
          <div className="status-badge">
            {home.purpose ? `For ${home.purpose}` : "For Sale"}
          </div>
        </div>
      </PropertyHeader>

      <MainGrid>
        <div>
          <GalleryWrapper>
            {images.length > 1 && (
              <GalleryArrow direction="left" onClick={prevImg}>
                <IoChevronBack />
              </GalleryArrow>
            )}
            <img
              src={images[selectedImg]}
              alt={home.title}
              onError={(e) => handleImageError(e, "/uploads/house1.jpg")}
            />
            {images.length > 1 && (
              <GalleryArrow direction="right" onClick={nextImg}>
                <IoChevronForward />
              </GalleryArrow>
            )}
          </GalleryWrapper>

          <QuickOverview>
            <h3>Property Overview & Features</h3>
            <div className="specs-grid">
              <div className="spec-box">
                <FaBed />
                <div>
                  <div className="spec-meta">Bedrooms</div>
                  <div className="spec-val">{home.rooms || "N/A"} Beds</div>
                </div>
              </div>

              <div className="spec-box">
                <FaBath />
                <div>
                  <div className="spec-meta">Bathrooms</div>
                  <div className="spec-val">{home.washrooms || "N/A"} Baths</div>
                </div>
              </div>

              <div className="spec-box">
                <FaRulerCombined />
                <div>
                  <div className="spec-meta">Covered Area</div>
                  <div className="spec-val">{displaySize}</div>
                </div>
              </div>
            </div>
          </QuickOverview>

          <DescriptionBox>
            <h3>Property Description</h3>
            <p>{home.details}</p>
          </DescriptionBox>
        </div>

        <div>
          <ContactCard>
            <h3>Inquire About This Property</h3>
            <div className="sub">Direct connection with certified agent</div>

            <div className="agent-badge">
              <div className="agent-avatar">P</div>
              <div>
                <div className="agent-name">PakEstate Verified Agent</div>
                <div className="agent-tag">Licensed Consultant • DHA & Bahria Specialist</div>
              </div>
            </div>

            {inquirySent ? (
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid #10b981",
                  color: "#10b981",
                  padding: "1rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                <FaCheckCircle /> Your inquiry has been sent to the agent. They will call you shortly!
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <input type="text" placeholder="Your Name" required />
                <input type="tel" placeholder="Phone Number (+92 300...)" required />
                <input type="email" placeholder="Email Address" required />
                <textarea
                  rows="4"
                  placeholder="I am interested in this property. Please share full details and arrange a visit..."
                  defaultValue={`I am interested in: ${home.title} (${displayPrice}). Please contact me with more information.`}
                ></textarea>
                <ActionButton primary="true" big="true" type="submit" style={{ width: "100%" }}>
                  <FaPaperPlane /> Request Agent Call Back
                </ActionButton>
              </form>
            )}
          </ContactCard>
        </div>
      </MainGrid>
    </Container>
  );
}

export default HomeDetails;
