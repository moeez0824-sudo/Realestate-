import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import styled from "styled-components";
import { ActionButton } from "../components/Button";
import { StateContext, DispatchContext } from "../context/GlobalContext";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
} from "../context/constants/userConstants";
import axios from "axios";
import Loading from "../components/Loading";
import { FaLock, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import PakEstateLogo from "../components/Logo";

const FormContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.background};
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 24px;
  padding: 2.75rem 2.5rem;
  box-shadow: ${({ theme }) => theme.shadowLg};

  @media screen and (max-width: 480px) {
    padding: 2rem 1.5rem;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;

    .icon-box {
      width: 54px;
      height: 54px;
      border-radius: 14px;
      background: linear-gradient(135deg, #059669, #047857);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1.5rem;
      margin: 0 auto 1rem;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4);
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 800;
      color: ${({ theme }) => theme.headingColor};
      margin-bottom: 0.35rem;
    }

    p {
      font-size: 0.95rem;
      color: ${({ theme }) => theme.secondaryText};
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .footer-links {
    text-align: center;
    margin-top: 1.75rem;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.secondaryText};

    a {
      color: #10b981;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.secondaryText};
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  input {
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
`;

const Alert = styled.div`
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid #10b981;
  color: #10b981;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

function Login({ history, location }) {
  const state = useContext(StateContext);
  const { user } = state;
  const dispatch = useContext(DispatchContext);
  const fromPath = useRef(location.state?.from ? location.state.from : "/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const { data } = await axios.post("/api/users/login", {
        email: email || "agent@pakestate.pk",
        password: password || "123456",
      });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...data, auth: true } });
      localStorage.setItem("userToken", data.token);
    } catch (err) {
      dispatch({ type: USER_LOGIN_FAIL, payload: err });
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    }
  };

  useEffect(() => {
    if (user && user.auth) {
      history.push(fromPath.current);
    }
  }, [history, user]);

  return (
    <Layout hideFooter={true}>
      {user.loading ? (
        <Loading />
      ) : (
        <FormContainer>
          <FormCard>
            <div className="header">
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
                <PakEstateLogo size="large" lightModeForce={true} />
              </div>
              <h1>Sign In to PakEstate</h1>
              <p>Access your property portfolio and listings</p>
            </div>

            {location.state?.message && (
              <Message>{location.state?.message}</Message>
            )}
            {error && <Alert>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>
                  <FaLock /> Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <ActionButton primary="true" big="true" type="submit" style={{ width: "100%", marginTop: "0.5rem" }}>
                <FaSignInAlt /> Sign In
              </ActionButton>
            </form>

            <div className="footer-links">
              Don't have an account? <Link to="/register">Create Account</Link>
            </div>
          </FormCard>
        </FormContainer>
      )}
    </Layout>
  );
}

export default Login;
