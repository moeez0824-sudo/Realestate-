import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { StateContext, DispatchContext } from "../context/GlobalContext";
import Layout from "../components/Layout";
import styled from "styled-components";
import GoogleApiWrapper from "../components/Map";
import ListCard from "../components/ListCard";
import Footer from "../components/Footer";
import HomeDetails from "../components/HomeDetails";
import Loading from "../components/Loading";
import { homes as defaultPakHomes } from "../data/homesData";

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  padding: 0 calc((100vw - 1400px) / 2);
  color: ${({ theme }) => theme.primaryText};
`;

const ContainerInner = styled.div`
  margin-top: 80px;
  width: 100%;
  color: ${({ theme }) => theme.primaryText};
  display: ${({ display }) => display};
  flex-wrap: wrap;
  justify-content: center;
`;

const MapWrapper = styled.div`
  flex: 1;
  max-width: 1920px;
  height: calc(100vh - 80px);
  min-height: 400px;
  position: relative;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 350px;
  }
`;

const ListWrapper = styled.div`
  width: 36%;
  min-width: 420px;
  padding: 1.5rem;
  overflow-y: scroll;
  height: calc(100vh - 80px);
  background: ${({ theme }) => theme.background};

  @media screen and (max-width: 900px) {
    width: 100%;
    min-width: unset;
    height: auto;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumb};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
`;

const FilterHeader = styled.div`
  padding: 0.5rem 0 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 1rem;

  h2 {
    font-size: 1.35rem;
    font-weight: 800;
    color: ${({ theme }) => theme.headingColor};
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondaryText};
  }
`;

const HomesPage = ({ match, history }) => {
  const state = useContext(StateContext);
  const { homes: stateHomes, loading } = state.homesList;
  const dispatch = useContext(DispatchContext);
  const location = useLocation();

  const [homesList, setHomesList] = useState(
    stateHomes && stateHomes.length > 0 ? stateHomes : defaultPakHomes
  );
  const [openHomeDetails, setOpenHomeDetails] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);

  useEffect(() => {
    async function getHomes() {
      if (!stateHomes || stateHomes.length === 0) {
        dispatch({ type: "HOME_LIST_REQUEST" });
        try {
          const { data } = await axios.get("/api/homes");
          if (Array.isArray(data) && data.length > 0) {
            setHomesList(data);
            dispatch({ type: "HOME_LIST_SUCCESS", payload: data });
          } else {
            setHomesList(defaultPakHomes);
            dispatch({ type: "HOME_LIST_SUCCESS", payload: defaultPakHomes });
          }
        } catch (e) {
          setHomesList(defaultPakHomes);
          dispatch({ type: "HOME_LIST_SUCCESS", payload: defaultPakHomes });
        }
      }
    }
    getHomes();
  }, [dispatch, stateHomes]);

  // Handle URL query parameters filtering
  const searchParams = new URLSearchParams(location.search);
  const cityParam = searchParams.get("city");
  const purposeParam = searchParams.get("purpose");
  const typeParam = searchParams.get("type");

  let displayHomes = homesList;
  if (cityParam && cityParam !== "all") {
    displayHomes = displayHomes.filter(
      (h) => h.city && h.city.toLowerCase().includes(cityParam.toLowerCase())
    );
  }
  if (purposeParam && purposeParam !== "all") {
    displayHomes = displayHomes.filter(
      (h) => h.purpose && h.purpose.toLowerCase() === purposeParam.toLowerCase()
    );
  }
  if (typeParam && typeParam !== "all") {
    displayHomes = displayHomes.filter(
      (h) =>
        (h.type && h.type.toLowerCase().includes(typeParam.toLowerCase())) ||
        (h.category && h.category.toLowerCase().includes(typeParam.toLowerCase()))
    );
  }

  useEffect(() => {
    if (match.params.id) {
      const found = homesList.find((home) => String(home._id) === String(match.params.id));
      if (found) {
        setSelectedHome(found);
        setOpenHomeDetails(true);
      }
    } else {
      setOpenHomeDetails(false);
      setSelectedHome(null);
    }
  }, [match.params.id, homesList]);

  return (
    <Layout hideFooter={true}>
      {loading && homesList.length === 0 ? (
        <Container>
          <Loading />
        </Container>
      ) : (
        <ContainerInner display={openHomeDetails ? "none" : "flex"}>
          <MapWrapper>
            <GoogleApiWrapper />
          </MapWrapper>

          <ListWrapper>
            <FilterHeader>
              <h2>
                {purposeParam
                  ? `Properties for ${purposeParam.charAt(0).toUpperCase() + purposeParam.slice(1)}`
                  : cityParam
                  ? `Properties in ${cityParam}`
                  : typeParam
                  ? `${typeParam} Properties`
                  : "Properties in Pakistan"}
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p>Showing {displayHomes.length} verified listings</p>
                {(cityParam || purposeParam || typeParam) && (
                  <button
                    onClick={() => history.push("/homes")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#10b981",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                    }}
                  >
                    Clear Filters ✕
                  </button>
                )}
              </div>
            </FilterHeader>

            {state.map.selectedItem !== null && (
              <ListCard {...state.map.selectedItem} />
            )}

            <div
              style={{
                display: state.map.selectedItem === null ? "block" : "none",
              }}
            >
              {displayHomes.map((home, i) => (
                <ListCard key={home._id || i} {...home} />
              ))}
            </div>

            <Footer />
          </ListWrapper>
        </ContainerInner>
      )}

      {openHomeDetails && selectedHome && (
        <HomeDetails
          home={selectedHome}
          back={() => {
            setOpenHomeDetails(false);
            setSelectedHome(null);
            history.push("/homes");
          }}
        />
      )}
    </Layout>
  );
};

export default HomesPage;
