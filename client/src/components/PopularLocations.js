import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Fade from "react-reveal/Fade";
import { propertyImages, handleImageError } from "../utils/imageHelper";

const Section = styled.section`
  width: 100%;
  padding: 5.5rem 2rem;
  background: ${({ theme }) => theme.backgroundVariant};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const Container = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const LocationCard = styled(Link)`
  position: relative;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: ${({ theme }) => theme.shadowSm};
  background-color: #0f172a;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.15) 0%,
      rgba(15, 23, 42, 0.55) 45%,
      rgba(15, 23, 42, 0.95) 100%
    );
    z-index: 2;
    transition: all 0.3s ease;
  }

  .location-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadowHover};
    border-color: #10b981;

    .location-bg {
      transform: scale(1.08);
    }

    &::before {
      background: linear-gradient(
        180deg,
        rgba(5, 150, 105, 0.2) 0%,
        rgba(15, 23, 42, 0.65) 40%,
        rgba(15, 23, 42, 0.98) 100%
      );
    }

    .explore-btn {
      color: #34d399;
      transform: translateX(4px);
    }
  }
`;

const LocationContent = styled.div`
  position: relative;
  z-index: 3;
  color: #ffffff;

  .property-count-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: #34d399;
    background: rgba(16, 185, 129, 0.25);
    border: 1px solid rgba(16, 185, 129, 0.4);
    padding: 0.3rem 0.75rem;
    border-radius: 50px;
    margin-bottom: 0.6rem;
    backdrop-filter: blur(6px);
  }

  h3 {
    font-size: 1.45rem;
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 0.35rem;
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .city-name {
    font-size: 0.925rem;
    color: rgba(241, 245, 249, 0.85);
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .explore-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: #ffffff;
    transition: all 0.2s ease;
  }
`;

const locations = [
  {
    title: "DHA Lahore",
    city: "Lahore, Punjab",
    properties: "2,400+ Properties",
    image: propertyImages.bahriaLahore,
    link: "/homes?city=Lahore",
  },
  {
    title: "Bahria Town Lahore",
    city: "Lahore, Punjab",
    properties: "1,850+ Properties",
    image: propertyImages.dhaLahore,
    link: "/homes?city=Lahore",
  },
  {
    title: "Gulberg & MM Alam",
    city: "Lahore, Punjab",
    properties: "920+ Properties",
    image: propertyImages.gulbergApartment,
    link: "/homes?city=Lahore",
  },
  {
    title: "DHA Islamabad",
    city: "Islamabad, ICT",
    properties: "1,600+ Properties",
    image: propertyImages.islamabadHouse,
    link: "/homes?city=Islamabad",
  },
  {
    title: "Bahria Town Islamabad",
    city: "Islamabad / Rawalpindi",
    properties: "1,420+ Properties",
    image: propertyImages.bahriaRawalpindi,
    link: "/homes?city=Rawalpindi",
  },
  {
    title: "Clifton & DHA Karachi",
    city: "Karachi, Sindh",
    properties: "1,150+ Properties",
    image: propertyImages.cliftonKarachi,
    link: "/homes?city=Karachi",
  },
];

const PopularLocations = () => {
  return (
    <Section id="popular-locations">
      <Container>
        <Fade bottom>
          <SectionHeader>
            <div className="section-tag">
              <HiSparkles /> Prime Investment Hubs
            </div>
            <h2>Popular Locations in Pakistan</h2>
            <p>
              Explore top trending neighborhoods with highest capital growth, rental yields, and modern infrastructure.
            </p>
          </SectionHeader>
        </Fade>

        <Grid>
          {locations.map((loc, index) => (
            <Fade bottom delay={index * 80} key={index}>
              <LocationCard to={loc.link}>
                <img
                  className="location-bg"
                  src={loc.image}
                  alt={loc.title}
                  onError={(e) => handleImageError(e, "/uploads/house1.jpg")}
                  loading="lazy"
                />
                <LocationContent>
                  <div className="property-count-pill">{loc.properties}</div>
                  <h3>{loc.title}</h3>
                  <div className="city-name">
                    <FaMapMarkerAlt /> {loc.city}
                  </div>
                  <div className="explore-btn">
                    Explore Area <FaArrowRight />
                  </div>
                </LocationContent>
              </LocationCard>
            </Fade>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default PopularLocations;
