import { createContext } from "react";
import "./contactus.css";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function ContactUs() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <Header></Header>
      <MiddleBody isActive={isActive} setIsActive={setIsActive}></MiddleBody>
      <ContactForm isActive={isActive} setIsActive={setIsActive}></ContactForm>
      <Footer></Footer>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <button className="logo-btn"></button>
      <p className="app-name">Wander Map List</p>
      <div className="links">
        <a className="nav-links">Home</a>
        <a className="nav-links">AboutUs</a>
        <a className="nav-links">Pricing</a>
        <a className="nav-links">Contact Us</a>
      </div>
      <input placeholder="search..." type="text" className="search-bar"></input>
      <button className="search-btn">🔍</button>
      <button className="user-btn"></button>
    </div>
  );
}

function MiddleBody({ isActive, setIsActive }) {
  function handleForm() {
    setIsActive((prev) => !prev);
  }

  return (
    <div className="middlebody">
      <p>Wanna connect or have any queries? Straight away contact us!</p>{" "}
      <button onClick={handleForm} className="middlebody-btn">
        ContactUs
      </button>
    </div>
  );
}

function ContactForm({ isActive, setIsActive }) {
  return (
    <form className="contact-form">
      <div className="bg-text">Turn Dreams into Destinations.</div>

      {/* toggle contact form on and off */}
      {isActive && <DisplayForm></DisplayForm>}
    </form>
  );
}

function DisplayForm({ isActive, setIsActive }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonerNum, setPhoneNum] = useState(0);

  function handleForm() {
    setIsActive((prev) => !prev);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePhoneNumber(e) {
    setPhoneNum(e.target.value);
  }

  return (
    <div className="form-container">
      <div className="form-group">
        <button onClick={handleForm} className="close-btn">
          X
        </button>
        <span className="label"> Full Name:</span>
        <input
          value={name}
          onChange={handleName}
          className="inputs"
          type="text"
          placeholder="Enter The Full Name"
        ></input>
      </div>

      <div className="form-group">
        <span className="label" value={name} onChange={handleName}>
          Email:
        </span>

        <input
          className="inputs"
          type="text"
          placeholder="Enter The Email"
        ></input>
      </div>
      <div className="form-group">
        <span className="label" value={name} onChange={handleName}>
          Contact Number:
        </span>

        <input
          className="inputs"
          type="text="
          placeholder="Enter The Contact Number"
        ></input>
      </div>
      <div className="btn-container">
        <button className="form-btn">Submit</button>
        <button className="form-btn">Clear</button>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <p>
            "Wander Map List helps you plan and organize your travel dreams in
            one easy-to-use platform. Save destinations, plan routes, and make
            your next journey unforgettable!"
          </p>
        </div>
        <div className="footer-links">
          {/* <a href="/home">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a> */}
          <a>Home</a>
          <a>About Us</a>
          <a>Contact Us</a>
          <a>Privacy Policy</a>
        </div>
        <div>
          <p
            style={{
              fontFamily: "system-ui",
              fontWeight: 700,
              textShadow: "text-shadow: 24px 10px 10px black",
            }}
          >
            Contact us: support@wandermaplist.com".
          </p>
        </div>

        <div className="footer-socials">
          <a href="https://facebook.com">
            <img src="facebook-icon.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com">
            <img src="twitter-icon.png" alt="Twitter" />
          </a>
        </div>
        <div className="footer-copyright">
          <p>© 2024 Wander Map List. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
