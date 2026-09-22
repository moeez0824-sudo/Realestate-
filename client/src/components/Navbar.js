import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { menuData } from "../data/MenuData";
import { Button } from "./Button";
import { FaBars, FaSun, FaMoon, FaPlus } from "react-icons/fa";
import { DispatchContext, StateContext } from "../context/GlobalContext";
import { USER_LOGOUT } from "../context/constants/userConstants";
import PakEstateLogo from "./Logo";

const Nav = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ scrolled, atHome, theme }) =>
    scrolled
      ? theme.navBg
      : atHome
      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)"
      : theme.backgroundVariant};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(14px)" : "none")};
  border-bottom: 1px solid
    ${({ scrolled, atHome, theme }) =>
      scrolled
        ? theme.navBorder
        : atHome
        ? "transparent"
        : theme.borderColor};
  box-shadow: ${({ scrolled, theme }) =>
    scrolled ? theme.shadowMd : "none"};

  @media screen and (max-width: 900px) {
    height: 70px;
    padding: 0.5rem 1.25rem;
  }
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuBars = styled(FaBars)`
  display: none;
  color: ${({ scrolled, atHome, theme }) =>
    !scrolled && atHome ? "#FFFFFF" : theme.primaryText};
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 900px) {
    display: block;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const NavMenuLinks = styled(Link)`
  color: ${({ scrolled, atHome, theme, active }) =>
    active
      ? "#10B981"
      : !scrolled && atHome
      ? "rgba(255, 255, 255, 0.95)"
      : theme.primaryText};
  font-size: 1rem;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: #10B981;
    background: ${({ scrolled, atHome, theme }) =>
      !scrolled && atHome
        ? "rgba(255, 255, 255, 0.12)"
        : theme.primaryColorLight};
  }
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const ThemeToggleBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid
    ${({ scrolled, atHome, theme }) =>
      !scrolled && atHome
        ? "rgba(255, 255, 255, 0.3)"
        : theme.borderColor};
  background: ${({ scrolled, atHome, theme }) =>
    !scrolled && atHome
      ? "rgba(255, 255, 255, 0.15)"
      : theme.backgroundVariant2};
  color: ${({ scrolled, atHome, theme }) =>
    !scrolled && atHome ? "#FFFFFF" : theme.primaryText};
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &:hover {
    transform: rotate(20deg) scale(1.05);
    background: ${({ theme }) => theme.primaryColorLight};
    color: #10B981;
    border-color: #10B981;
  }
`;

const UserProfile = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #000;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid #10B981;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 54px;
  right: 0;
  min-width: 13rem;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadowLg};
  padding: 0.5rem 0;
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MenuItem = styled.div`
  padding: 0.7rem 1.25rem;
  color: ${({ theme }) => theme.primaryText};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColorLight};
    color: #10B981;
  }
`;

function Navbar({ toggleDropdown, setTheme, theme, atHome }) {
  const { user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const history = useHistory();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logout = () => {
    dispatch({ type: USER_LOGOUT });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollPos > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showUserOptions &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowUserOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, showUserOptions]);

  return (
    <Nav scrolled={scrolled} atHome={atHome}>
      <NavContainer>
        <PakEstateLogo scrolled={scrolled} atHome={atHome} />

        <MenuBars
          scrolled={scrolled}
          atHome={atHome}
          onClick={toggleDropdown}
        />

        <NavMenu>
          {menuData.map((item, index) => {
            const isActive =
              location.pathname === item.link ||
              (item.link.includes("?") &&
                location.pathname + location.search === item.link);

            const handleClick = (e) => {
              if (item.link.includes("#")) {
                const hash = item.link.split("#")[1];
                if (location.pathname === "/") {
                  e.preventDefault();
                  const elem = document.getElementById(hash);
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }
              }
            };

            return (
              <NavMenuLinks
                to={item.link}
                key={index}
                scrolled={scrolled}
                atHome={atHome}
                active={isActive ? 1 : 0}
                onClick={handleClick}
              >
                {item.title}
              </NavMenuLinks>
            );
          })}
        </NavMenu>

        <NavBtn>
          <ThemeToggleBtn
            scrolled={scrolled}
            atHome={atHome}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </ThemeToggleBtn>

          <Button primary="true" to="/addhome" small="true">
            <FaPlus /> Post Property
          </Button>

          {user && user.auth ? (
            <UserProfile
              onClick={() => setShowUserOptions(!showUserOptions)}
              img={user.profileImg || "/uploads/user/user.png"}
            >
              {showUserOptions && (
                <ProfileMenu ref={dropdownRef}>
                  <MenuItem onClick={() => history.push("/admin")}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => history.push("/user")}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </ProfileMenu>
              )}
            </UserProfile>
          ) : (
            <Button
              variant="outline"
              to="/login"
              small="true"
              style={{
                borderColor: !scrolled && atHome ? "rgba(255,255,255,0.7)" : undefined,
                color: !scrolled && atHome ? "#FFFFFF" : undefined,
              }}
            >
              Sign In
            </Button>
          )}
        </NavBtn>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
