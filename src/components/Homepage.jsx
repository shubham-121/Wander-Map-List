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
      <input type="text" className="search-bar"></input>
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
        <p className="small-boxes-heading">Top Choices</p>
        <hr className="small-boxes-line-break"></hr>
        <p className="small-boxes-content">
          Total 600+ destinations you can work with.
        </p>
      </div>
      <div className="small-boxes">
        <p className="small-boxes-heading">Quality Guidance</p>
        <hr className="small-boxes-line-break"></hr>
        <p className="small-boxes-content">
          Our tour guide has 20+ years of experince.
        </p>
      </div>
      <div className="small-boxes">
        <p className="small-boxes-heading">Easy Bookings</p>
        <hr className="small-boxes-line-break"></hr>
        <p className="small-boxes-content">
          Best in class ticket booking system.
        </p>
      </div>
    </div>
  );
}

function Navigation() {}
