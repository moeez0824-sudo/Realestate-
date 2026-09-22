import React from "react";
import styled from "styled-components";
import { FaBuilding, FaUsers, FaCity, FaUserCheck } from "react-icons/fa";
import Fade from "react-reveal/Fade";

const StatsSection = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.backgroundVariant};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 3.5rem 2rem;
`;

const Container = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media screen and (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(30, 41, 59, 0.4)" : "rgba(241, 245, 249, 0.6)"};
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #10b981;
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25));
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    flex-shrink: 0;
  }

  .stat-info {
    display: flex;
    flex-direction: column;

    .number {
      font-size: 2rem;
      font-weight: 800;
      color: ${({ theme }) => theme.headingColor};
      letter-spacing: -0.5px;
      line-height: 1.1;
    }

    .label {
      font-size: 0.925rem;
      font-weight: 600;
      color: ${({ theme }) => theme.secondaryText};
      margin-top: 0.25rem;
    }
  }
`;

const stats = [
  {
    icon: <FaBuilding />,
    number: "10,000+",
    label: "Properties Listed",
  },
  {
    icon: <FaUsers />,
    number: "5,000+",
    label: "Happy Clients",
  },
  {
    icon: <FaCity />,
    number: "25+",
    label: "Cities Covered",
  },
  {
    icon: <FaUserCheck />,
    number: "500+",
    label: "Verified Agents",
  },
];

const TrustStats = () => {
  return (
    <StatsSection>
      <Container>
        {stats.map((stat, index) => (
          <Fade bottom delay={index * 100} key={index}>
            <StatCard>
              <div className="icon-wrapper">{stat.icon}</div>
              <div className="stat-info">
                <div className="number">{stat.number}</div>
                <div className="label">{stat.label}</div>
              </div>
            </StatCard>
          </Fade>
        ))}
      </Container>
    </StatsSection>
  );
};

export default TrustStats;
