import "./itineraryrender.css";
import { useContext } from "react";
import { FeatureContext } from "../../FeatureContext";

// const app_features = {
//   isFav: false, // Boolean to toggle the favorites component
//   favourites: [], // Array to store favorite locations
//   isWish: false, // Boolean to toggle the wishlist component
//   wishlist: [], // Array to store wishlist locations
//   isVisited: false, // Boolean to toggle the visited component
//   visited: [], // Array to store visited locations
//   isItinerary: false,
//   itinerary: [],
//   date: false,
//   setDate: "",
//   event: false,
//   setEvent: "", //set the event type
//   note: false,
//   noteArray: [], //push notes to this array
//   setNote: "", //note variable for storing a note
//   filesArray: [],
//   notification: null,
//   setNotification: null,
// };
export default function Itinerary() {
  return (
    <div>
      <Header></Header>
      <MiddleContent></MiddleContent>
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

function MiddleContent() {
  const { state, dispatch } = useContext(FeatureContext);
  console.log(state);
  return (
    <div className="mid-body">
      <div className="mid-content">
        <p>Explore the world with a smile</p>
      </div>
    </div>
  );
}
