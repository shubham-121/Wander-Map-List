import { createContext, useContext } from "react";
import "./contactus.css";
import facebook from "./facebook.png";
import twitter from "./twitter.png";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";

const contact_state = {
  isActive: false,
  name: "",
  nameArray: [],
  phoneNum: "",
  numberArray: [],
  email: "",
  emailArray: [],
  users: [],
  id: 0,
};
const ContactContext = createContext();

// function handleName(e) {
//   dispatch({ type: "Contact/Name", payload: e.target.value });
// }
// function handlePhoneNumber(e) {
//   dispatch({ type: "Contact/PhoneNumber", payload: e.target.value });
// }
// function handleEmail(e) {
//   dispatch({ type: "Contact/Email", payload: e.target.value });
// }
// function handleFormSubmit() {
//   dispatch({ type: "Contact/FormSubmit" });
// }
// function handleClearForm() {
//   dispatch({ type: "Contact/ClearForm" });
// }

function reducer(state, action) {
  switch (action.type) {
    case "Contact/ToggleContactForm":
      return {
        ...state,
        isActive: !state.isActive,
      };
    case "Contact/Name":
      return {
        ...state,
        name: action.payload,
      };
    case "Contact/Email":
      return {
        ...state,
        email: action.payload,
      };
    case "Contact/PhoneNumber":
      return {
        ...state,
        phoneNum: action.payload,
      };
    case "Contact/FormSubmit":
      if (!state.name) {
        //form validation
        alert("Please enter valid name");
        return state;
      } else if (!state.email) {
        alert("Please enter valid email");
        return state;
      } else if (!state.phoneNum) {
        alert("Please enter valid phone number");
        return state;
      }
      const newUser = {
        name: state.name,
        phoneNum: state.phoneNum,
        email: state.email,
        id: Date.now(), //uniquely identify each user
      };

      console.log("Form data", newUser);
      console.log("Exsisting user", state.users);
      return {
        ...state,
        users: [...state.users, newUser],
        nameArray: [...state.nameArray, state.name],
        numberArray: [...state.numberArray, state.phoneNum],
        emailArray: [...state.emailArray, state.email],
        name: "",
        email: "",
        phoneNum: "",
      };
    case "Contact/ClearForm":
      console.log("Form cleared");
      return {
        ...state,
        name: "",
        phoneNum: "",
        email: "",
      };

    default:
      return state;
  }
}

export default function ContactUs() {
  const [state, dispatch] = useReducer(reducer, contact_state);
  const { isActive, name } = state;

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      <div>
        <Header></Header>
        <MiddleBody></MiddleBody>
        <ContactForm></ContactForm>
        <Footer></Footer>
      </div>
    </ContactContext.Provider>
  );
}

function Header() {
  const { state, dispatch } = useContext(ContactContext);
  const { isActive, name } = state;

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

function MiddleBody() {
  const { state, dispatch } = useContext(ContactContext);
  const { isActive, name } = state;

  function toggleContactForm() {
    dispatch({ type: "Contact/ToggleContactForm" });
  }
  return (
    <div className="middlebody">
      <p>Wanna connect or have any queries? Straight away contact us!</p>{" "}
      <button className="middlebody-btn" onClick={toggleContactForm}>
        ContactUs
      </button>
    </div>
  );
}

function ContactForm() {
  const { state, dispatch } = useContext(ContactContext);
  const { isActive, name } = state;
  return (
    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <div className="bg-text">Turn Dreams into Destinations.</div>

      {/* toggle contact form on and off */}
      {isActive && <DisplayForm></DisplayForm>}
    </form>
  );
}

function DisplayForm() {
  const { state, dispatch } = useContext(ContactContext);
  const { isActive, name, phoneNum, email } = state;

  function toggleContactForm() {
    dispatch({ type: "Contact/ToggleContactForm" });
  }

  function handleName(e) {
    if (!e.target.value) alert("Please enter a valid name");
    dispatch({ type: "Contact/Name", payload: e.target.value });
  }
  function handlePhoneNumber(e) {
    if (!e.target.value) alert("Please enter a valid phone number");

    dispatch({ type: "Contact/PhoneNumber", payload: e.target.value });
  }
  function handleEmail(e) {
    if (!e.target.value) alert("Please enter a valid email");

    dispatch({ type: "Contact/Email", payload: e.target.value });
  }
  function handleFormSubmit() {
    dispatch({ type: "Contact/FormSubmit" });
  }
  function handleClearForm() {
    dispatch({ type: "Contact/ClearForm" });
  }

  return (
    <div className="form-container">
      <div className="form-group">
        <button className="close-btn" onClick={toggleContactForm}>
          X
        </button>
        <span className="label"> Full Name:</span>
        <input
          id="nameinput"
          className="inputs"
          type="text"
          placeholder="Enter The Full Name"
          value={name}
          onChange={handleName}
        ></input>
      </div>

      <div className="form-group">
        <span className="label">Email:</span>

        <input
          className="inputs"
          type="text"
          placeholder="Enter The Email"
          value={email}
          onChange={handleEmail}
        ></input>
      </div>
      <div className="form-group">
        <span className="label">Contact Number:</span>

        <input
          className="inputs"
          type="text"
          value={phoneNum}
          placeholder="Enter The Contact Number"
          onChange={handlePhoneNumber}
        ></input>
      </div>
      <div className="btn-container">
        <button className="form-btn" onClick={handleFormSubmit}>
          Submit
        </button>
        <button className="form-btn" onClick={handleClearForm}>
          Clear
        </button>
      </div>
    </div>
  );
}
function Footer() {
  const { state, dispatch } = useContext(ContactContext);
  const { isActive, name } = state;
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

        <div>Follow us at:</div>
        <div className="footer-socials">
          <a href="https://facebook.com">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://twitter.com">
            <img src={twitter} alt="Twitter" />
          </a>
        </div>
        <div className="footer-copyright">
          <p>© 2024 Wander Map List. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
