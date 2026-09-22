import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PakEstateLogo from "./Logo";

const FooterSection = styled.footer`
  width: 100%;
  background: ${({ theme }) =>
    theme.name === "dark" ? "#070A10" : "#0F172A"};
  color: #F8FAFC;
  padding: 5rem 2rem 2.5rem;
  border-top: 1px solid
    ${({ theme }) => (theme.name === "dark" ? "#1E293B" : "#1E293B")};
`;

const Container = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;

  .brand-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
    text-decoration: none;

    .icon-box {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: linear-gradient(135deg, #059669, #047857);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1.2rem;
    }

    .brand-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      span {
        color: #10b981;
      }
    }
  }

  p {
    color: #94A3B8;
    font-size: 0.95rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
  }

  .social-links {
    display: flex;
    gap: 0.75rem;

    a {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #CBD5E1;
      font-size: 1.1rem;
      transition: all 0.25s ease;

      &:hover {
        background: #10b981;
        color: #ffffff;
        border-color: #10b981;
        transform: translateY(-3px);
      }
    }
  }
`;

const NavCol = styled.div`
  h4 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 30px;
      height: 2px;
      background: #10b981;
      border-radius: 2px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    li a {
      color: #94A3B8;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.2s ease;
      display: inline-block;

      &:hover {
        color: #10b981;
        transform: translateX(4px);
      }
    }
  }
`;

const ContactCol = styled.div`
  h4 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 30px;
      height: 2px;
      background: #10b981;
      border-radius: 2px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: #94A3B8;
      font-size: 0.925rem;
      line-height: 1.5;

      svg {
        color: #10b981;
        font-size: 1.1rem;
        margin-top: 0.2rem;
        flex-shrink: 0;
      }
    }
  }
`;

const BottomBar = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: #64748B;

  a {
    color: #94A3B8;
    text-decoration: none;
    margin-left: 1rem;

    &:hover {
      color: #10b981;
    }
  }
`;

function Footer() {
  return (
    <FooterSection>
      <Container>
        <BrandCol>
          <div style={{ marginBottom: "1.25rem" }}>
            <PakEstateLogo size="large" />
          </div>
          <p>
            Pakistan's leading digital real estate portal. Find verified houses, apartments, residential & commercial plots in Lahore, Islamabad, Karachi, Rawalpindi, Faisalabad, and Multan.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
              <FaYoutube />
            </a>
          </div>
        </BrandCol>

        <NavCol>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home Portal</Link>
            </li>
            <li>
              <Link to="/homes?purpose=buy">Buy Properties</Link>
            </li>
            <li>
              <Link to="/homes?purpose=rent">Rent Properties</Link>
            </li>
            <li>
              <Link to="/homes">All Listings</Link>
            </li>
            <li>
              <Link to="/addhome">Post Property Free</Link>
            </li>
            <li>
              <Link to="/about">About PakEstate</Link>
            </li>
          </ul>
        </NavCol>

        <NavCol>
          <h4>Popular Cities</h4>
          <ul>
            <li>
              <Link to="/homes?city=Lahore">Lahore</Link>
            </li>
            <li>
              <Link to="/homes?city=Islamabad">Islamabad</Link>
            </li>
            <li>
              <Link to="/homes?city=Karachi">Karachi</Link>
            </li>
            <li>
              <Link to="/homes?city=Rawalpindi">Rawalpindi</Link>
            </li>
            <li>
              <Link to="/homes?city=Faisalabad">Faisalabad</Link>
            </li>
            <li>
              <Link to="/homes?city=Multan">Multan</Link>
            </li>
            <li>
              <Link to="/homes?city=Gujranwala">Gujranwala</Link>
            </li>
          </ul>
        </NavCol>

        <ContactCol>
          <h4>Head Office & Contacts</h4>
          <ul>
            <li>
              <FaMapMarkerAlt />
              <span>
                Main Boulevard, Phase 5, DHA, Lahore, Punjab 54792, Pakistan
              </span>
            </li>
            <li>
              <FaPhoneAlt />
              <span>+92 (042) 111-725-725 / +92 300 1234567</span>
            </li>
            <li>
              <FaEnvelope />
              <span>support@pakestate.com.pk</span>
            </li>
          </ul>
        </ContactCol>
      </Container>

      <BottomBar>
        <div>
          &copy; {new Date().getFullYear()} PakEstate Real Estate Network. All Rights Reserved.
        </div>
        <div>
          <Link to="/about">Privacy Policy</Link>
          <Link to="/about">Terms of Service</Link>
          <Link to="/contact">Contact Support</Link>
        </div>
      </BottomBar>
    </FooterSection>
  );
}

export default Footer;
