import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Slide from "react-reveal/Slide";
import { ActionButton } from "../components/Button";

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  max-width: var(--max-width, 1400px);
  margin-left: auto;
  margin-right: auto;
  padding: 4rem 2rem 6rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3.5rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadowLg};

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

  h1 {
    font-size: clamp(2rem, 3.5vw, 2.5rem);
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.secondaryText};
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    input, textarea {
      width: 100%;
      background: ${({ theme }) => theme.backgroundVariant2};
      border: 1px solid ${({ theme }) => theme.borderColor};
      color: ${({ theme }) => theme.primaryText};
      border-radius: 12px;
      padding: 0.9rem 1.1rem;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
      }
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .info-card {
    background: ${({ theme }) => theme.cardBg};
    border: 1px solid ${({ theme }) => theme.cardBorder};
    border-radius: 20px;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.shadowSm};

    h3 {
      font-size: 1.35rem;
      font-weight: 800;
      color: ${({ theme }) => theme.headingColor};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ theme }) => theme.secondaryText};
      margin-bottom: 1.5rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.85rem;
        color: ${({ theme }) => theme.primaryText};
        font-size: 0.95rem;
        line-height: 1.5;

        svg {
          color: #10b981;
          font-size: 1.2rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        strong {
          display: block;
          color: ${({ theme }) => theme.headingColor};
          margin-bottom: 0.1rem;
        }
      }
    }
  }
`;

const SuccessBox = styled.div`
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid #10b981;
  color: #10b981;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <Layout>
      <Container>
        <FormCard>
          <Slide left>
            <div>
              <div className="tag">
                <HiSparkles /> Get In Touch
              </div>
              <h1>Contact PakEstate</h1>
              <p>
                Have a property question or want to list your estate? Reach out to our nationwide team.
              </p>

              {sent && (
                <SuccessBox>
                  <FaCheckCircle />
                  <span>Thank you! Your message has been received. Our advisory team will get back to you shortly.</span>
                </SuccessBox>
              )}

              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Full Name" required />
                <input type="email" placeholder="Your Email Address" required />
                <input type="tel" placeholder="Your Phone Number (+92...)" required />
                <input type="text" placeholder="Subject / Property Reference" />
                <textarea placeholder="Type your message or inquiry here..." required></textarea>
                <ActionButton primary="true" big="true" type="submit">
                  <FaPaperPlane /> Send Message
                </ActionButton>
              </form>
            </div>
          </Slide>
        </FormCard>

        <RightColumn>
          <Slide right>
            <div className="info-card">
              <h3>Headquarters & Regional Offices</h3>
              <p>PakEstate Real Estate Network (Private) Limited</p>
              <ul>
                <li>
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Lahore Head Office</strong>
                    Main Boulevard, Phase 5, DHA, Lahore, Punjab
                  </div>
                </li>
                <li>
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Islamabad Regional Office</strong>
                    Plot 14, Executive Heights, Blue Area, Islamabad
                  </div>
                </li>
                <li>
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Karachi Regional Office</strong>
                    Ocean Tower, Block 9, Clifton, Karachi, Sindh
                  </div>
                </li>
                <li>
                  <FaPhoneAlt />
                  <div>
                    <strong>UAN Helpline</strong>
                    +92 (042) 111-725-725 / +92 300 1234567
                  </div>
                </li>
                <li>
                  <FaEnvelope />
                  <div>
                    <strong>Official Email</strong>
                    support@pakestate.com.pk
                  </div>
                </li>
                <li>
                  <FaClock />
                  <div>
                    <strong>Business Hours</strong>
                    Mon – Sat: 9:00 AM – 7:00 PM (PKT)
                  </div>
                </li>
              </ul>
            </div>
          </Slide>
        </RightColumn>
      </Container>
    </Layout>
  );
}

export default Contact;
