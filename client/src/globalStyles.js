import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap');

  :root {
    --max-width: 1400px;
    --transition-smooth: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  html, body {
    overflow-x: hidden;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primaryText};
    font-size: 16px;
    line-height: 1.6;
    scroll-behavior: smooth;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  /* Custom Clean Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumb};
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.scrollbarTrack};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primaryColor};
  }
`;

export default GlobalStyles;

// System themes with a sophisticated Pakistani luxury real estate palette
export const themes = {
  light: {
    name: "light",
    background: "#F8FAFC",
    backgroundVariant: "#FFFFFF",
    backgroundVariant2: "#F1F5F9",
    cardBg: "#FFFFFF",
    cardBorder: "#E2E8F0",
    primaryColor: "#059669", // Emerald Green
    primaryColorHover: "#047857",
    primaryColorLight: "#ECFDF5",
    accentGold: "#D97706",
    headingColor: "#0F172A", // Deep Slate
    primaryText: "#1E293B",
    secondaryText: "#64748B",
    mutedText: "#94A3B8",
    textColor: "#334155",
    interactiveText: "#059669",
    disabledText: "#94A3B8",
    borderColor: "#E2E8F0",
    navBg: "rgba(255, 255, 255, 0.92)",
    navBorder: "rgba(226, 232, 240, 0.8)",
    shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    shadowHover: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    scrollbarTrack: "#F1F5F9",
    scrollbarThumb: "#CBD5E1",
    error: "#EF4444",
    success: "#10B981",
  },
  dark: {
    name: "dark",
    background: "#0B0F19",
    backgroundVariant: "#131C2E",
    backgroundVariant2: "#1E293B",
    cardBg: "#131C2E",
    cardBorder: "#1E293B",
    primaryColor: "#10B981", // Vibrant Emerald
    primaryColorHover: "#059669",
    primaryColorLight: "rgba(16, 185, 129, 0.15)",
    accentGold: "#F59E0B",
    headingColor: "#F8FAFC",
    primaryText: "#F1F5F9",
    secondaryText: "#94A3B8",
    mutedText: "#64748B",
    textColor: "#CBD5E1",
    interactiveText: "#10B981",
    disabledText: "#64748B",
    borderColor: "#1E293B",
    navBg: "rgba(11, 15, 25, 0.92)",
    navBorder: "rgba(30, 41, 59, 0.8)",
    shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
    shadowHover: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
    scrollbarTrack: "#0B0F19",
    scrollbarThumb: "#334155",
    error: "#F87171",
    success: "#34D399",
  },
};

// Google Map Theme Styles
export const mapStyles = {
  dark: [
    { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#10b981" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#10b981" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#334155" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1e293b" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  ],
  light: [
    { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#cbd5e1" }] },
  ],
};
