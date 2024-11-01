import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Homepage></Homepage> */}
    <AboutUs></AboutUs>
  </StrictMode>
);
