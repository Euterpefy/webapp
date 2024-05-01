import React from "react";
import HeroSection from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import HomePageAlert from "@/components/home/alert";
import FAQSection from "@/components/home/faq";

/**
 * Home component that represents the main content of the homepage.
 * @returns {JSX.Element} The Home component.
 */
export default function Home(): JSX.Element {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <HeroSection />
      <HomePageAlert />
      <HowItWorks />
      <FAQSection />
    </div>
  );
}
