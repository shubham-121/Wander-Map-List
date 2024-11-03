import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { FeatureProvider } from "./FeatureContext.jsx";

import App from "./App.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import ItineraryRender from "./components/Itinerary/ItineraryRender.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ye render kar lena agar problem hui toh or <FeatureProvider>
      <Itinerary></Itinerary>
    </FeatureProvider> ye hata dena */}

    {/*  */}
    {/* <Homepage></Homepage> */}
    {/* <AboutUs></AboutUs> */}
    {/* <ContactUs></ContactUs> */}
    {/* <FeatureProvider>
      <Itinerary></Itinerary>
    </FeatureProvider> */}
    <FeatureProvider>
      {/* <App></App>
      <Homepage></Homepage>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs> */}
      <ItineraryRender></ItineraryRender>
    </FeatureProvider>
  </StrictMode>

  // <FeatureProvider>
  //   <App></App>
  // </FeatureProvider>
);
