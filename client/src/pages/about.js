import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import InfoSection from "../components/InfoSection";
import TrustStats from "../components/TrustStats";
import { AboutUsSection } from "../data/AboutUsData";
import { FaShieldAlt, FaAward, FaHandshake, FaCompass } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Fade from "react-reveal/Fade";

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
`;

const ValuesSection = styled.section`
  width: 100%;
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.backgroundVariant};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const ValuesContainer = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;

  .tag {
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
    font-size: clamp(2rem, 3.5vw, 2.5rem);
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 18px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: #10b981;
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25));
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    margin: 0 auto 1.25rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.secondaryText};
    line-height: 1.6;
  }
`;

function About() {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: "100% Verified Titles",
      desc: "Comprehensive legal vetting and LDA/CDA/DHA authority verification for every property.",
    },
    {
      icon: <FaAward />,
      title: "Excellence & Trust",
      desc: "Top rated real estate brokerage trusted by 5,000+ local and overseas families.",
    },
    {
      icon: <FaHandshake />,
      title: "Transparent Dealings",
      desc: "Direct buyer-seller negotiations with zero hidden markups or false commitments.",
    },
    {
      icon: <FaCompass />,
      title: "Nationwide Network",
      desc: "Active field presence across Lahore, Islamabad, Karachi, Rawalpindi, and Multan.",
    },
  ];

  return (
    <Layout>
      <Container>
        <InfoSection {...AboutUsSection} />
        <TrustStats />
        <ValuesSection>
          <ValuesContainer>
            <Fade bottom>
              <Header>
                <div className="tag">
                  <HiSparkles /> Our Core Values
                </div>
                <h2>Why Pakistan Trusts PakEstate</h2>
              </Header>
            </Fade>

            <ValuesGrid>
              {values.map((v, i) => (
                <Fade bottom delay={i * 100} key={i}>
                  <ValueCard>
                    <div className="icon">{v.icon}</div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </ValueCard>
                </Fade>
              ))}
            </ValuesGrid>
          </ValuesContainer>
        </ValuesSection>
      </Container>
    </Layout>
  );
}

export default About;
