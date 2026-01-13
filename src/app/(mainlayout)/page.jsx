import React from "react";
import Hero from "./_components/HeroSection/Hero";
import Categories from "./_components/Categories/Categories";
import TrendingTools from "./_components/TrendingTools/TrendingTools";
import StatsAndSteps from "./_components/StatsAndSteps/StatsAndSteps";
import FinalSections from "./_components/FinalSections/FinalSections";

const page = () => {
  return (
    <div>
      <Hero />
      <TrendingTools />
      <Categories />
      <StatsAndSteps />
      <FinalSections />
    </div>
  );
};

export default page;
