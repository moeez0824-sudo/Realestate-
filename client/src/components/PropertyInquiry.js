import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaPhoneAlt, FaEnvelope, FaCity, FaTag, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Fade from "react-reveal/Fade";
import { ActionButton } from "./Button";

const Section = styled.section`
  width: 100%;
  padding: 5.5rem 2rem;
  background: ${({ theme }) => theme.background};
`;

const Container = styled.div`
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 3.5rem;
  align-items: center;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;

  .inquiry-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #10b981;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
    line-height: 1.2;
    letter-spacing: -0.5px;
    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.secondaryText};
    line-height: 1.65;
    margin-bottom: 2rem;
  }

  .benefits-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .benefit-item {
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;

      svg {
        color: #10b981;
        font-size: 1.25rem;
        margin-top: 0.2rem;
        flex-shrink: 0;
      }

      .benefit-text {
        h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: ${({ theme }) => theme.headingColor};
          margin-bottom: 0.15rem;
        }
        p {
          font-size: 0.95rem;
          color: ${({ theme }) => theme.secondaryText};
          margin-bottom: 0;
        }
      }
    }
  }
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadowLg};

  @media screen and (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 1.75rem;
`;

const LookingToggle = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  button {
    flex: 1;
    height: 46px;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid
      ${({ theme, active }) => (active ? "transparent" : theme.borderColor)};
    background: ${({ active, theme }) =>
      active
        ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColorHover})`
        : theme.backgroundVariant2};
    color: ${({ active, theme }) => (active ? "#FFFFFF" : theme.primaryText)};

    &:hover {
      border-color: #10b981;
    }
  }
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: 1 / -1;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    font-weight: 700;
    color: ${({ theme }) => theme.secondaryText};
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  input, select, textarea {
    width: 100%;
    background: ${({ theme }) => theme.backgroundVariant2};
    border: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.primaryText};
    border-radius: 12px;
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    }
  }

  textarea {
    resize: vertical;
    min-height: 90px;
  }
`;

const SuccessAlert = styled.div`
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid #10b981;
  color: #10b981;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PropertyInquiry = () => {
  const [lookingTo, setLookingTo] = useState("buy");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "House",
    city: "Lahore",
    area: "DHA Phase 5",
    budget: "1.5 - 3.0 Crore",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        propertyType: "House",
        city: "Lahore",
        area: "DHA Phase 5",
        budget: "1.5 - 3.0 Crore",
        message: "",
      });
    }, 6000);
  };

  return (
    <Section>
      <Container>
        <Fade left>
          <LeftInfo>
            <div className="inquiry-tag">
              <HiSparkles /> Free Consultation & Property Match
            </div>
            <h2>Looking for Your Dream Property in Pakistan?</h2>
            <p>
              Tell us your specific requirements, preferred location, and budget. Our verified property consultants will handpick the best off-market and hot deals for you within 24 hours.
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <FaCheckCircle />
                <div className="benefit-text">
                  <h4>100% Verified Listings</h4>
                  <p>Every property is verified for clear ownership titles and NOC approvals.</p>
                </div>
              </div>

              <div className="benefit-item">
                <FaCheckCircle />
                <div className="benefit-text">
                  <h4>Zero Hidden Charges</h4>
                  <p>Transparent commission structure with direct seller meetings.</p>
                </div>
              </div>

              <div className="benefit-item">
                <FaCheckCircle />
                <div className="benefit-text">
                  <h4>Overseas Pakistani Support</h4>
                  <p>Dedicated video walkthroughs, power of attorney handling, and digital documentation.</p>
                </div>
              </div>
            </div>
          </LeftInfo>
        </Fade>

        <Fade right>
          <FormCard>
            <FormTitle>Property Inquiry Form</FormTitle>
            <FormSubtitle>
              Fill out the form below and an expert real estate consultant will contact you.
            </FormSubtitle>

            {submitted && (
              <SuccessAlert>
                <FaCheckCircle />
                <span>
                  Thank you, {formData.fullName || "User"}! Your inquiry has been received. Our Pakistan real estate specialist will contact you shortly on {formData.phone || "your phone"}.
                </span>
              </SuccessAlert>
            )}

            <LookingToggle>
              <button
                type="button"
                active={lookingTo === "buy" ? 1 : 0}
                onClick={() => setLookingTo("buy")}
              >
                Looking to Buy
              </button>
              <button
                type="button"
                active={lookingTo === "rent" ? 1 : 0}
                onClick={() => setLookingTo("rent")}
              >
                Looking to Rent
              </button>
            </LookingToggle>

            <FormGrid onSubmit={handleSubmit}>
              <FormGroup>
                <label>
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Muhammad Usman"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>
                  <FaPhoneAlt /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+92 300 1234567"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup className="full-width">
                <label>
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="House">House / Villa</option>
                  <option value="Apartment">Flat / Apartment</option>
                  <option value="Plot">Residential Plot</option>
                  <option value="Commercial">Commercial Property</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>
                  <FaCity /> Preferred City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Gujranwala">Gujranwala</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Bahawalpur">Bahawalpur</option>
                  <option value="Sargodha">Sargodha</option>
                  <option value="Sahiwal">Sahiwal</option>
                  <option value="Gwadar">Gwadar</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Preferred Area / Sector</label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g. DHA Phase 6, Bahria, Gulberg"
                  value={formData.area}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>
                  <FaTag /> Budget (PKR)
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="Under 50 Lakh">Under PKR 50 Lakh</option>
                  <option value="50 Lakh - 1.5 Crore">PKR 50 Lakh – 1.5 Crore</option>
                  <option value="1.5 - 3.0 Crore">PKR 1.5 Crore – 3.0 Crore</option>
                  <option value="3.0 - 6.0 Crore">PKR 3.0 Crore – 6.0 Crore</option>
                  <option value="6.0 Crore+">PKR 6.0 Crore+</option>
                </select>
              </FormGroup>

              <FormGroup className="full-width">
                <label>Additional Requirements / Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your specific preferences (e.g. 5 Marla, corner plot, park facing, possession ready)..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </FormGroup>

              <div className="full-width" style={{ marginTop: "0.5rem" }}>
                <ActionButton
                  type="submit"
                  primary="true"
                  big="true"
                  style={{ width: "100%" }}
                >
                  <FaPaperPlane /> Find My Property
                </ActionButton>
              </div>
            </FormGrid>
          </FormCard>
        </Fade>
      </Container>
    </Section>
  );
};

export default PropertyInquiry;
