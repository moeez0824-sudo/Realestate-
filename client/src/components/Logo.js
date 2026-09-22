import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const goldShimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
`;

const LogoWrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: transform 0.25s ease;

  .logo-emblem {
    position: relative;
    width: ${({ size }) => (size === "large" ? "52px" : size === "small" ? "36px" : "44px")};
    height: ${({ size }) => (size === "large" ? "52px" : size === "small" ? "36px" : "44px")};
    min-width: ${({ size }) => (size === "large" ? "52px" : size === "small" ? "36px" : "44px")};
    border-radius: 14px;
    background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 55%, #090d16 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 4px 14px rgba(0, 0, 0, 0.4),
      0 0 0 1.5px rgba(245, 158, 11, 0.4),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 15%, rgba(251, 191, 36, 0.22), transparent 70%);
      pointer-events: none;
    }

    svg {
      width: 70%;
      height: 70%;
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
      transition: transform 0.35s ease;
    }
  }

  &:hover {
    transform: translateY(-1px);

    .logo-emblem {
      transform: translateY(-2px) scale(1.06);
      box-shadow: 
        0 8px 24px rgba(245, 158, 11, 0.35),
        0 0 0 2px #f59e0b,
        inset 0 1px 2px rgba(255, 255, 255, 0.4);

      svg {
        transform: scale(1.06);
      }
    }

    .brand-estate {
      background-size: 200% auto;
      animation: ${goldShimmer} 2.5s linear infinite;
    }

    .brand-dot {
      box-shadow: 0 0 12px rgba(245, 158, 11, 1);
      animation: ${pulseGlow} 1.5s infinite ease-in-out;
    }
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .brand-row {
      display: flex;
      align-items: center;
      gap: 0.22rem;
      font-size: ${({ size }) =>
        size === "large" ? "1.9rem" : size === "small" ? "1.2rem" : "1.55rem"};
      font-weight: 900;
      letter-spacing: -0.5px;
      line-height: 1.05;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;

      .brand-pak {
        color: ${({ scrolled, atHome, theme, lightModeForce }) =>
          lightModeForce
            ? theme.headingColor
            : !scrolled && atHome
            ? "#FFFFFF"
            : theme.headingColor};
        letter-spacing: -0.3px;
        transition: color 0.2s ease;
      }

      .brand-estate {
        background: linear-gradient(120deg, #fef08a 0%, #f59e0b 35%, #fbbf24 60%, #d97706 100%);
        background-size: 150% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 900;
        letter-spacing: -0.4px;
      }

      .brand-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        margin-left: 2px;
        display: inline-block;
        box-shadow: 0 0 8px rgba(245, 158, 11, 0.85);
        transition: all 0.2s ease;
      }
    }

    .brand-sub {
      font-size: ${({ size }) => (size === "large" ? "0.74rem" : "0.66rem")};
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: ${({ scrolled, atHome, theme, lightModeForce }) =>
        lightModeForce
          ? theme.secondaryText
          : !scrolled && atHome
          ? "rgba(255, 255, 255, 0.88)"
          : theme.secondaryText};
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 5px;

      .sub-gold {
        color: #f59e0b;
        font-weight: 800;
      }
    }
  }
`;

export const PakEstateLogo = ({
  to = "/",
  scrolled = false,
  atHome = false,
  size = "medium",
  lightModeForce = false,
  className = "",
  onClick,
}) => {
  return (
    <LogoWrapper
      to={to}
      scrolled={scrolled ? 1 : 0}
      atHome={atHome ? 1 : 0}
      size={size}
      lightModeForce={lightModeForce ? 1 : 0}
      className={className}
      onClick={onClick}
    >
      <div className="logo-emblem">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 24K Royal Gold Gradients */}
            <linearGradient id="goldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="30%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            <linearGradient id="goldSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            <linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>

            <linearGradient id="platinumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.2)" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.2)" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Luxury Geometric Architectural Monogram (Diamond Crown + Modern Villa Gable + Penthouse Highrise) */}
          
          {/* Central Architectural Spire / Tower */}
          <path
            d="M24 6L33 13.5V38H24V6Z"
            fill="url(#goldPrimary)"
          />
          <path
            d="M24 6L15 13.5V38H24V6Z"
            fill="url(#goldSecondary)"
          />

          {/* Left Villa Wing / Modern Pitched Gable */}
          <path
            d="M15 17L7 23.5V38H15V17Z"
            fill="url(#platinumGrad)"
            fillOpacity="0.9"
          />

          {/* Right Skyline Wing */}
          <path
            d="M33 20L41 26.5V38H33V20Z"
            fill="url(#sapphireGrad)"
            fillOpacity="0.9"
          />

          {/* Precision Architectural Glass Cutouts / Facets */}
          {/* Main Tower Windows */}
          <rect x="18" y="18" width="3" height="3" rx="0.75" fill="#0B0F19" />
          <rect x="18" y="24" width="3" height="3" rx="0.75" fill="#0B0F19" />
          <rect x="18" y="30" width="3" height="3" rx="0.75" fill="#0B0F19" />

          <rect x="27" y="18" width="3" height="3" rx="0.75" fill="#0B0F19" />
          <rect x="27" y="24" width="3" height="3" rx="0.75" fill="#0B0F19" />
          <rect x="27" y="30" width="3" height="3" rx="0.75" fill="#0B0F19" />

          {/* Left Wing Facet */}
          <rect x="10" y="27" width="2.5" height="3" rx="0.5" fill="#0B0F19" fillOpacity="0.8" />
          <rect x="10" y="32" width="2.5" height="3" rx="0.5" fill="#0B0F19" fillOpacity="0.8" />

          {/* Right Wing Facet */}
          <rect x="35.5" y="29" width="2.5" height="3" rx="0.5" fill="#0B0F19" fillOpacity="0.8" />
          <rect x="35.5" y="34" width="2.5" height="2.5" rx="0.5" fill="#0B0F19" fillOpacity="0.8" />

          {/* Pinnacle 4-Point Brilliant Star / Diamond Crown atop Spire */}
          <polygon
            points="24,2 25.8,5.2 29,6 25.8,6.8 24,10 22.2,6.8 19,6 22.2,5.2"
            fill="#FFFFFF"
            filter="url(#goldGlow)"
          />

          {/* Bottom Platinum & Gold Foundation Plinth */}
          <rect x="4" y="39" width="40" height="2.5" rx="1.25" fill="url(#goldLine)" />
          <circle cx="24" cy="40.25" r="1.5" fill="#FDE68A" />
        </svg>
      </div>

      <div className="logo-text">
        <div className="brand-row">
          <span className="brand-pak">PAK</span>
          <span className="brand-estate">ESTATE</span>
          <span className="brand-dot"></span>
        </div>
        <div className="brand-sub">
          <span>Pakistan</span>
          <span className="sub-gold">•</span>
          <span>Properties</span>
        </div>
      </div>
    </LogoWrapper>
  );
};

export default PakEstateLogo;

