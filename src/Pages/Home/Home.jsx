import React from "react";
import Hero from "./Components/Hero/Hero";
import OurBenefit from "./Components/OurBenefit/OurBenefit";
import OurSolution from "./Components/OurSolution/OurSolution";
import Testimonial from "./Components/Testimonials/Testimonial";
import TopDoctors from "./Components/TopDoctors/TopDoctors";

const Home = () => {
  return (
    <>
      <Hero />
      <OurBenefit />
      <OurSolution />
      <TopDoctors />
      <Testimonial />
    </>
  );
};

export default Home;
