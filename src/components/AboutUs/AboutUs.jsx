import "./aboutus.css";
import img from "./travel.jpg";
import taxiimg from "./taxii.jpg";
import worldimg from "./world.jpg";

export default function AboutUs() {
  return (
    <div>
      <Header></Header>
      <MainBody></MainBody>
      <MainContent></MainContent>

      <DetailedContent></DetailedContent>
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

function MainBody() {
  return (
    <div>
      <div className="main-body">
        <img className="image" src={img}></img>
        <div className="main-body-heading">
          <p className="middle-content-heading">
            Our Mission is to offer you hope and freedom.
          </p>
          <p className="middle-content">
            At Wander Map List, our mission is to make travel planning as
            exciting as the journey itself.
          </p>
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div style={{ display: "flex" }}>
      <img className="img1" src={taxiimg}></img>
      <div className="main-content">
        <p id="content1">About Us:</p>
        <p id="content2">
          Welcome to Wander Map List! Wander Map List is designed for explorers,
          adventurers, and dreamers who want a seamless way to organize their
          travel goals. We understand that planning a trip involves more than
          just picking a destination — it’s about curating experiences, keeping
          track of the places that inspire you, and turning ideas into action.
          Our app brings your travel plans to life by helping you save,
          organize, and map out your journey in a single, easy-to-use platform.
        </p>
        <img className="img2" src={worldimg}></img>
      </div>
    </div>
  );
}

function DetailedContent() {
  return (
    <div className="detailed-content">
      <h2 className="detailed-content-title">What Do We Offer?</h2>
      <ul className="feature-list">
        <li>
          <strong>Favorites, Wishlist, and Visited Locations:</strong> Save
          places that interest you, organize them based on priority, and check
          off locations as you visit.
        </li>
        <li>
          <strong>Custom Itineraries:</strong> Create day-by-day plans, complete
          with dates and notes, so you can easily visualize your route.
        </li>
        <li>
          <strong>Personalized Notifications:</strong> Get reminders and
          notifications for updates in your travel plans, so you’re always
          prepared.
        </li>
        <li>
          <strong>Route Planner:</strong> Plan the best routes between
          destinations, optimizing your travel path for convenience and
          enjoyment.
        </li>
        <li>
          <strong>Easy-to-Use Interface:</strong> With a clean, intuitive
          design, Wander Map List is built to simplify your travel planning
          experience.
        </li>
      </ul>
      <p className="join-us">
        Join Us on the Journey! Thank you for being a part of our community.
        We’re excited to help you explore the world, one destination at a time.
        With Wander Map List, your next adventure is only a click away!
      </p>
    </div>
  );
}
