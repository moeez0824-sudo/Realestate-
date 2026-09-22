import { FaTimes, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { menuData } from "../data/MenuData";
import { Button } from "./Button";

import PakEstateLogo from "./Logo";

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    theme.name === "dark" ? "rgba(11, 15, 25, 0.98)" : "rgba(255, 255, 255, 0.98)"};
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: ${({ isopen }) => (isopen === "true" ? "0" : "100%")};
  opacity: ${({ isopen }) => (isopen === "true" ? "1" : "0")};
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2rem;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${({ theme }) => theme.primaryText};
  transition: all 0.2s ease;

  &:hover {
    color: #10b981;
    transform: rotate(90deg);
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
`;

const Dropdownlink = styled(Link)`
  font-size: 1.35rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.4rem 1.5rem;
  border-radius: 8px;

  &:hover {
    color: #10b981;
    background: ${({ theme }) => theme.primaryColorLight};
    transform: scale(1.05);
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 280px;
`;

const Dropdown = ({ toggle, isOpen }) => {
  return (
    <DropdownContainer isopen={isOpen.toString()}>
      <CloseButton onClick={toggle}>
        <FaTimes />
      </CloseButton>

      <PakEstateLogo size="large" lightModeForce={true} onClick={toggle} />

      <DropdownMenu>
        {menuData.map((menu, i) => {
          const handleClick = (e) => {
            toggle();
            if (menu.link.includes("#")) {
              const hash = menu.link.split("#")[1];
              setTimeout(() => {
                const elem = document.getElementById(hash);
                if (elem) elem.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }
          };

          return (
            <Dropdownlink to={menu.link} key={i} onClick={handleClick}>
              {menu.title}
            </Dropdownlink>
          );
        })}
      </DropdownMenu>

      <BtnWrap>
        <Button primary="true" big="true" to="/addhome" onClick={toggle}>
          <FaPlus /> Post Property
        </Button>
        <Button variant="outline" big="true" to="/login" onClick={toggle}>
          Sign In
        </Button>
      </BtnWrap>
    </DropdownContainer>
  );
};

export default Dropdown;
