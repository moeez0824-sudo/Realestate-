import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { FaSearch, FaMapMarkerAlt, FaHome, FaTag } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Fade from "react-reveal/Fade";

const HeroSection = styled.section`
  min-height: 92vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 4rem;

  @media screen and (max-width: 768px) {
    min-height: auto;
    padding-top: 90px;
    padding-bottom: 3rem;
  }
`;

const BackgroundSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(11, 15, 25, 0.72) 0%,
      rgba(11, 15, 25, 0.85) 60%,
      rgba(11, 15, 25, 0.95) 100%
    );
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.8s ease-in-out, transform 8s ease;
  opacity: ${({ active }) => (active ? "1" : "0")};
  transform: ${({ active }) => (active ? "scale(1.04)" : "scale(1)")};
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  padding: 2rem 2rem;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #34d399;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
`;

const MainHeading = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1px;
  max-width: 950px;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  span {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SubHeading = styled.p`
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  color: rgba(241, 245, 249, 0.9);
  max-width: 760px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`;

const SearchBoxCard = styled.div`
  width: 100%;
  max-width: 1100px;
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(19, 28, 46, 0.95)" : "#FFFFFF"};
  border-radius: 20px;
  padding: 1.75rem 2rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5),
    0 0 0 1px ${({ theme }) => theme.borderColor};
  backdrop-filter: blur(16px);
  text-align: left;
  color: ${({ theme }) => theme.primaryText};

  @media screen and (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const PurposeTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding-bottom: 0.75rem;
`;

const TabButton = styled.button`
  background: ${({ active, theme }) =>
    active
      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColorHover})`
      : "transparent"};
  color: ${({ active, theme }) => (active ? "#FFFFFF" : theme.secondaryText)};
  border: none;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.55rem 1.4rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ active, theme }) => (active ? "#FFFFFF" : theme.headingColor)};
    background: ${({ active, theme }) =>
      active ? undefined : theme.primaryColorLight};
  }
`;

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1.3fr 1.3fr 1.1fr;
  gap: 1rem;
  align-items: flex-end;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.825rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.secondaryText};
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  select, input {
    width: 100%;
    height: 52px;
    background: ${({ theme }) => theme.backgroundVariant2};
    border: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.primaryText};
    border-radius: 12px;
    padding: 0 1rem;
    font-size: 0.95rem;
    font-weight: 500;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    }
  }
`;

const SearchSubmitBtn = styled.button`
  height: 52px;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(5, 150, 105, 0.5);
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
`;

const SliderControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 2rem;
  z-index: 20;
  display: flex;
  gap: 0.75rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SliderArrow = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #10b981;
    border-color: #10b981;
    transform: scale(1.1);
  }
`;

const FeaturedPreviewBadge = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);

  .current-slide-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }

  .slide-price {
    color: #34d399;
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;

const Hero = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const [purpose, setPurpose] = useState("buy");
  const [propertyType, setPropertyType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const history = useHistory();

  const length = slides.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  useEffect(() => {
    if (length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 6000);
    return () => clearInterval(timer);
  }, [length]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (purpose) params.append("purpose", purpose);
    if (propertyType !== "all") params.append("type", propertyType);
    if (selectedCity !== "all") params.append("city", selectedCity);
    if (priceRange !== "all") params.append("price", priceRange);

    history.push(`/homes?${params.toString()}`);
  };

  return (
    <HeroSection>
      <BackgroundSlider>
        {slides.map((slide, index) => (
          <SlideImage
            key={index}
            src={slide.image}
            alt={slide.alt || "Pakistan Luxury Property"}
            active={index === current}
          />
        ))}
      </BackgroundSlider>

      <HeroContainer>
        <Fade top>
          <div>
            <Badge>
              <HiSparkles /> Pakistan's Premier Real Estate Portal
            </Badge>
            <MainHeading>
              Find Your Perfect Property in <span>Pakistan</span>
            </MainHeading>
            <SubHeading>
              Discover houses, apartments, plots and commercial properties in Pakistan's most desirable locations.
            </SubHeading>
          </div>
        </Fade>

        <Fade bottom>
          <div>
            <SearchBoxCard>
              <PurposeTabs>
                <TabButton
                  active={purpose === "buy"}
                  onClick={() => setPurpose("buy")}
                  type="button"
                >
                  Buy Properties
                </TabButton>
                <TabButton
                  active={purpose === "rent"}
                  onClick={() => setPurpose("rent")}
                  type="button"
                >
                  Rent Properties
                </TabButton>
                <TabButton
                  active={purpose === "commercial"}
                  onClick={() => setPurpose("commercial")}
                  type="button"
                >
                  Commercial
                </TabButton>
              </PurposeTabs>

              <SearchForm>
                <FormGroup>
                  <label>
                    <FaHome /> Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="all">All Property Types</option>
                    <option value="Houses">Houses & Villas</option>
                    <option value="Apartments">Flats & Apartments</option>
                    <option value="Plots">Residential Plots</option>
                    <option value="Commercial">Commercial Properties</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>
                    <FaMapMarkerAlt /> City / Location
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="all">All Cities (Pakistan)</option>
                    <option value="Lahore">Lahore (DHA, Bahria, Gulberg)</option>
                    <option value="Islamabad">Islamabad (F-7, DHA, Bahria)</option>
                    <option value="Karachi">Karachi (Clifton, DHA, Gulshan)</option>
                    <option value="Rawalpindi">Rawalpindi (Bahria, DHA)</option>
                    <option value="Faisalabad">Faisalabad (Kohinoor, Madina Town)</option>
                    <option value="Multan">Multan (Royal Orchard, DHA, Cantt)</option>
                    <option value="Gujranwala">Gujranwala (DC Colony, Master City, Citi Housing)</option>
                    <option value="Hyderabad">Hyderabad (Qasimabad, Latifabad)</option>
                    <option value="Peshawar">Peshawar (Hayatabad, DHA, Regi Model)</option>
                    <option value="Quetta">Quetta (Cantt, Samungli, Zarghoon)</option>
                    <option value="Sialkot">Sialkot (Cantt, Model Town, Citi Housing)</option>
                    <option value="Bahawalpur">Bahawalpur (DHA, Model Town)</option>
                    <option value="Sargodha">Sargodha (University Road, Satellite Town)</option>
                    <option value="Sahiwal">Sahiwal (Farid Town)</option>
                    <option value="Gwadar">Gwadar (Marine Drive, Sangar)</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>
                    <FaTag /> Price Range (PKR)
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="all">Any Price</option>
                    <option value="under50l">Under PKR 50 Lakh</option>
                    <option value="50l-150l">PKR 50 Lakh – 1.5 Crore</option>
                    <option value="150l-300l">PKR 1.5 Crore – 3.0 Crore</option>
                    <option value="300l-600l">PKR 3.0 Crore – 6.0 Crore</option>
                    <option value="above600l">PKR 6.0 Crore+</option>
                  </select>
                </FormGroup>

                <SearchSubmitBtn type="button" onClick={handleSearch}>
                  <FaSearch /> Find Properties
                </SearchSubmitBtn>
              </SearchForm>
            </SearchBoxCard>

            {slides[current] && (
              <FeaturedPreviewBadge>
                <div className="current-slide-info">
                  <span>Featured:</span> {slides[current].title} ({slides[current].city})
                </div>
                <div className="slide-price">{slides[current].price}</div>
              </FeaturedPreviewBadge>
            )}
          </div>
        </Fade>
      </HeroContainer>

      {length > 1 && (
        <SliderControls>
          <SliderArrow onClick={prevSlide} title="Previous slide">
            <IoChevronBack />
          </SliderArrow>
          <SliderArrow onClick={nextSlide} title="Next slide">
            <IoChevronForward />
          </SliderArrow>
        </SliderControls>
      )}
    </HeroSection>
  );
};

export default Hero;
