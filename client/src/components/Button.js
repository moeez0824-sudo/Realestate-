import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled(Link)`
  background: ${({ primary, theme, variant }) => {
    if (variant === "outline") return "transparent";
    if (variant === "secondary") return theme.backgroundVariant2;
    return primary
      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColorHover})`
      : theme.backgroundVariant;
  }};
  border: ${({ variant, theme }) =>
    variant === "outline" ? `2px solid ${theme.primaryColor}` : "none"};
  color: ${({ primary, variant, theme }) => {
    if (variant === "outline") return theme.primaryColor;
    return primary ? "#FFFFFF" : theme.primaryText;
  }};
  white-space: nowrap;
  outline: none;
  border-radius: ${({ round }) => (round ? "50px" : "10px")};
  min-width: ${({ small }) => (small ? "90px" : "120px")};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  padding: ${({ big, small }) =>
    big ? "16px 36px" : small ? "10px 18px" : "13px 26px"};
  font-size: ${({ big, small }) =>
    big ? "1.05rem" : small ? "0.875rem" : "0.95rem"};
  box-shadow: ${({ primary, theme }) =>
    primary ? `0 4px 14px 0 rgba(5, 150, 105, 0.35)` : theme.shadowSm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ primary }) =>
      primary
        ? `0 6px 20px rgba(5, 150, 105, 0.45)`
        : "0 6px 16px rgba(0,0,0,0.12)"};
    background: ${({ variant, theme }) =>
      variant === "outline" ? theme.primaryColorLight : undefined};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ActionButton = styled.button`
  background: ${({ primary, theme, variant }) => {
    if (variant === "outline") return "transparent";
    if (variant === "secondary") return theme.backgroundVariant2;
    return primary
      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColorHover})`
      : theme.backgroundVariant;
  }};
  border: ${({ variant, theme }) =>
    variant === "outline" ? `2px solid ${theme.primaryColor}` : "none"};
  color: ${({ primary, variant, theme }) => {
    if (variant === "outline") return theme.primaryColor;
    return primary ? "#FFFFFF" : theme.primaryText;
  }};
  white-space: nowrap;
  outline: none;
  border-radius: ${({ round }) => (round ? "50px" : "10px")};
  min-width: ${({ small }) => (small ? "90px" : "120px")};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  padding: ${({ big, small }) =>
    big ? "16px 36px" : small ? "10px 18px" : "13px 26px"};
  font-size: ${({ big, small }) =>
    big ? "1.05rem" : small ? "0.875rem" : "0.95rem"};
  box-shadow: ${({ primary, theme }) =>
    primary ? `0 4px 14px 0 rgba(5, 150, 105, 0.35)` : theme.shadowSm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ primary }) =>
      primary
        ? `0 6px 20px rgba(5, 150, 105, 0.45)`
        : "0 6px 16px rgba(0,0,0,0.12)"};
    background: ${({ variant, theme }) =>
      variant === "outline" ? theme.primaryColorLight : undefined};
  }

  &:active {
    transform: translateY(0);
  }
`;
