import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Fade from "react-reveal/Fade";
import { Button } from "./Button";
import { handleImageError, fallbackPropertyImage } from "../utils/imageHelper";

const Section = styled.section`
  width: 100%;
  padding: 5.5rem 2rem;
  background: ${({ theme }) => theme.background};
`;

const Container = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  .section-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #10b981;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
    letter-spacing: -0.5px;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.secondaryText};
    max-width: 650px;
    margin: 0 auto;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
`;

const FilterTab = styled.button`
  background: ${({ active, theme }) =>
    active
      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColorHover})`
      : theme.backgroundVariant};
  color: ${({ active, theme }) => (active ? "#FFFFFF" : theme.primaryText)};
  border: 1px solid
    ${({ active, theme }) => (active ? "transparent" : theme.borderColor)};
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.65rem 1.4rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ active }) =>
    active ? "0 4px 12px rgba(5, 150, 105, 0.35)" : "none"};

  &:hover {
    transform: translateY(-2px);
    border-color: #10b981;
    color: ${({ active, theme }) => (active ? "#FFFFFF" : "#10b981")};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowSm};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadowHover};
    border-color: #10b981;

    .card-img {
      transform: scale(1.06);
    }
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #0f172a;

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .badge-tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(15, 23, 42, 0.85);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.4);
    backdrop-filter: blur(8px);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
    z-index: 2;
  }

  .purpose-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: ${({ purpose }) =>
      purpose === "Rent"
        ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
        : "linear-gradient(135deg, #059669, #047857)"};
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 0.35rem 0.85rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.6rem;

  .price {
    font-size: 1.45rem;
    font-weight: 800;
    color: #10b981;
    letter-spacing: -0.5px;
  }

  .type {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.secondaryText};
    background: ${({ theme }) => theme.backgroundVariant2};
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
  }
`;

const PropertyTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.headingColor};
  line-height: 1.35;
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #10b981;
  }
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 1.25rem;

  svg {
    color: #10b981;
    flex-shrink: 0;
  }
`;

const SpecsGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 0;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.primaryText};

  .spec-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;

    svg {
      color: ${({ theme }) => theme.secondaryText};
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const BottomCTA = styled.div`
  text-align: center;
  margin-top: 3.5rem;
`;

const FeaturedProperties = ({ homes = [] }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "All Properties" },
    { id: "Houses", label: "Houses & Villas" },
    { id: "Apartments", label: "Apartments & Flats" },
    { id: "Plots", label: "Residential Plots" },
    { id: "Commercial", label: "Commercial" },
  ];

  const filteredHomes =
    activeFilter === "all"
      ? homes.slice(0, 6)
      : homes
          .filter(
            (item) =>
              item.category === activeFilter ||
              (item.type && item.type.toLowerCase() === activeFilter.toLowerCase())
          )
          .slice(0, 6);

  return (
    <Section>
      <Container>
        <Fade bottom>
          <SectionHeader>
            <div className="section-tag">
              <HiSparkles /> Handpicked Exclusive Listings
            </div>
            <h2>Featured Properties</h2>
            <p>
              Explore top-tier residential and commercial properties verified by our team in Pakistan.
            </p>
          </SectionHeader>

          <FilterTabs>
            {filterOptions.map((tab) => (
              <FilterTab
                key={tab.id}
                active={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}
              </FilterTab>
            ))}
          </FilterTabs>
        </Fade>

        <Grid>
          {filteredHomes.map((home, index) => {
            const imgSrc =
              home.images && home.images.length > 0 && home.images[0]
                ? home.images[0]
                : fallbackPropertyImage;

            return (
              <Fade bottom delay={index * 80} key={home._id || index}>
                <Card>
                  <CardImageWrapper purpose={home.purpose}>
                    <img
                      className="card-img"
                      src={imgSrc}
                      alt={home.title}
                      onError={(e) => handleImageError(e, "/uploads/house1.jpg")}
                      loading="lazy"
                    />
                    {home.badge && <span className="badge-tag">{home.badge}</span>}
                    <span className="purpose-badge">
                      {home.purpose ? `For ${home.purpose}` : "For Sale"}
                    </span>
                  </CardImageWrapper>

                  <CardBody>
                    <PriceRow>
                      <div className="price">
                        {home.priceFormatted || `PKR ${home.price}`}
                      </div>
                      <div className="type">{home.type}</div>
                    </PriceRow>

                    <PropertyTitle to={`/homes/${home._id}`}>
                      {home.title}
                    </PropertyTitle>

                    <LocationText>
                      <FaMapMarkerAlt />
                      <span>
                        {home.address}, {home.city}
                      </span>
                    </LocationText>

                    <SpecsGrid>
                      {home.rooms > 0 && (
                        <div className="spec-item">
                          <FaBed /> {home.rooms} Beds
                        </div>
                      )}
                      {home.washrooms > 0 && (
                        <div className="spec-item">
                          <FaBath /> {home.washrooms} Baths
                        </div>
                      )}
                      <div className="spec-item">
                        <FaRulerCombined /> {home.sizeFormatted || `${home.size} Sq Ft`}
                      </div>
                    </SpecsGrid>

                    <CardFooter>
                      <Button
                        to={`/homes/${home._id}`}
                        primary="true"
                        small="true"
                      >
                        View Property <FaArrowRight />
                      </Button>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Fade>
            );
          })}
        </Grid>

        <BottomCTA>
          <Button to="/homes" big="true" variant="outline">
            Browse All 10,000+ Properties in Pakistan
          </Button>
        </BottomCTA>
      </Container>
    </Section>
  );
};

export default FeaturedProperties;
