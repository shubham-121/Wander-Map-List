import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Homepage></Homepage> */}
    {/* <AboutUs></AboutUs> */}
    <ContactUs></ContactUs>
  </StrictMode>
);
