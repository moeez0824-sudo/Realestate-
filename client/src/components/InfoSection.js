import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import Slide from "react-reveal/Slide";
import { FaArrowRight } from "react-icons/fa";
import { handleImageError } from "../utils/imageHelper";

const Section = styled.section`
  width: 100%;
  padding: 5.5rem 2rem;
  background: ${({ theme }) => theme.background};
`;

const Container = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  order: ${({ reverse }) => (reverse ? 2 : 1)};

  @media screen and (max-width: 900px) {
    order: 2;
  }

  h2 {
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
    line-height: 1.25;
    letter-spacing: -0.5px;
    margin-bottom: 1.25rem;
  }

  p {
    margin-bottom: 1.25rem;
    color: ${({ theme }) => theme.secondaryText};
    font-size: 1.05rem;
    line-height: 1.7;
  }
`;

const ColumnRight = styled.div`
  order: ${({ reverse }) => (reverse ? 1 : 2)};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 900px) {
    order: 1;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 440px;
    border-radius: 24px;
    overflow: hidden;
    background: #0f172a;
    box-shadow: ${({ theme }) => theme.shadowLg};
    border: 1px solid ${({ theme }) => theme.borderColor};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

function InfoSection({
  heading,
  paragraphOne,
  paragraphTwo,
  buttonLabel = "Explore Properties",
  buttonLink = "/homes",
  image,
  reverse = false,
}) {
  return (
    <Section>
      <Container>
        <ColumnLeft reverse={reverse}>
          <Slide right={reverse} left={!reverse}>
            <div>
              <h2>{heading}</h2>
              <p>{paragraphOne}</p>
              {paragraphTwo && <p>{paragraphTwo}</p>}
              <div style={{ marginTop: "1rem" }}>
                <Button to={buttonLink} primary="true" big="true">
                  {buttonLabel} <FaArrowRight />
                </Button>
              </div>
            </div>
          </Slide>
        </ColumnLeft>

        <ColumnRight reverse={reverse}>
          <Slide right={!reverse} left={reverse}>
            <div className="image-wrapper">
              <img
                src={image}
                alt={heading}
                onError={(e) => handleImageError(e, "/uploads/interior1.jpg")}
                loading="lazy"
              />
            </div>
          </Slide>
        </ColumnRight>
      </Container>
    </Section>
  );
}

export default InfoSection;
