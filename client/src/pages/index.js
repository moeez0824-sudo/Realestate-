import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import TrustStats from "../components/TrustStats";
import FeaturedProperties from "../components/FeaturedProperties";
import PopularLocations from "../components/PopularLocations";
import InfoSection from "../components/InfoSection";
import PropertyInquiry from "../components/PropertyInquiry";
import { SliderData } from "../data/SliderData";
import { InfoData } from "../data/InfoData";
import { homes } from "../data/homesData";

function Index() {
  return (
    <Layout atHome>
      <Hero slides={SliderData} />
      <TrustStats />
      <FeaturedProperties homes={homes} />
      <PopularLocations />
      <InfoSection {...InfoData} />
      <PropertyInquiry />
    </Layout>
  );
}

export default Index;
