import "./itineraryrender.css";
import { useContext, useState, useEffect } from "react";
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

// const unsplash_accessKey = "sdmRNH8DPYI5RSmsPhYsry-KpTkwv7QDTIS2k3z8lj8";
// const unsplash_secretKey = "y3bCPQhOFgmFrw1coB5sdI_1tNJEBRWsn6kKAKF-C6o";
// const api = `https://api.unsplash.com/photos/?client_id=${unsplash_accessKey}`;
// const api2 = `https://api.unsplash.com/photos?query=NewYork&client_id=${unsplash_accessKey}`;

//   useEffect(() => {
//     async function getLocImage() {
//       const res = await fetch(
//         `https://api.unsplash.com/search/photos?query=Dehradun&client_id=${unsplash_accessKey}`
//       );
//       const data = await res.json();
//       const img = data.results[0].urls.full;
//       console.log(img);
//     }
//     getLocImage();
//   }, []);

const itineraryItems = [
  "Kaulagarh Road, Dehradun, Dehradun - 248001, Uttarakhand, India",
  "Shaheed Kashmirasingh Road, Dehradun, Dehradun - 248001, Uttarakhand, India",
  "Professor Ram Nath Vij Marg, New Rajendra Nagar, New Delhi - 110060, Delhi, India",
  "Satguru Ram Singh Marg, Delhi Cantonment, New Delhi - 110064, Delhi, India",
  "Guru Virjanand Marg, Vikaspuri, - 110018, Delhi, India",
  "Satguru Ram Singh Marg, Delhi Cantonment, New Delhi - 110064, Delhi, India",
  "Guru Virjanand Marg, Vikaspuri, - 110018, Delhi, India",
];

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

  return (
    <div className="middlecontent">
      <p className="title">Explore the world with a smile</p>
      <p className="title">Your Itinerary Below</p>

      <div className="itinerary-container">
        <ol>
          {itineraryItems.map((location, idx) => (
            <ItineraryRenderer
              location={location}
              key={idx}
            ></ItineraryRenderer>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ItineraryRenderer({ location }) {
  const [notes, setNotes] = useState(false);

  function openNote() {
    setNotes(!notes);
  }

  return (
    <div className="render-component">
      <li className="list-items">
        {location}
        <div className="date-container">
          <p className="date"> Date: 30-06-2003</p>
          <button className="btn-remove">Remove</button>
          <button className="btn-remove" onClick={openNote}>
            Note
          </button>
        </div>
      </li>
      {notes && <DisplayNote notes={notes} setNotes={setNotes}></DisplayNote>}
    </div>
  );
}

function DisplayNote({ notes, setNotes }) {
  function closeNote() {
    setNotes(!notes);
  }
  return (
    <div className="note-modal">
      <button className="close-note" onClick={closeNote}>
        X
      </button>
      <p>This is the note modal</p>
    </div>
  );
}
