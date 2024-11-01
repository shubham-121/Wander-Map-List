import "./homepage.css";

export default function Homepage() {
  return (
    <div className="outer-box">
      <Header></Header>
      <BodyContent></BodyContent>
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

function BodyContent() {
  return (
    <div className="body-content">
      <div className="body-content-heading">
        <p className="body-content-para">
          It's A Big World Out There, Go And Explore Now s!
        </p>
      </div>
      <p id="follow-up">
        Discover new sttractions and experinces to match your interstst and
        travel styles.
      </p>
      <button className="body-content-btn">Book Now</button>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="small-boxes">
        <p className="small-boxes-heading">Discover New Destinations</p>
        <hr className="small-boxes-line-break"></hr>
        <p className="small-boxes-content">
          Explore a world of over 600+ curated destinations. From hidden gems to
          popular spots, find places that match your travel style.
        </p>
      </div>
      <div className="small-boxes">
        <p className="small-boxes-heading">Personalized Travel Insights</p>
        <hr className="small-boxes-line-break"></hr>
        <p className="small-boxes-content">
          Save locations, mark favorites, and get tailored recommendations based
          on your travel preferences. Wander Map List makes it easy to organize.
        </p>
      </div>
      <div className="small-boxes">
        <p className="small-boxes-heading">Seamless Trip Planning</p>
        <hr className="small-boxes-line-break"></hr>
        <p className="small-boxes-content">
          Easily add destinations to your itinerary, wishlist, or favorites.
          With one-click additions,you're always ready for adventure.
        </p>
      </div>
    </div>
  );
}

function Navigation() {}
