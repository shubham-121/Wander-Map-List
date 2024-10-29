import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMapEvent,
  useMap,
} from "react-leaflet";

import {
  useEffect,
  useState,
  useRef,
  createContext,
  useReducer,
  useCallback,
  useContext,
} from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { featureGroup } from "leaflet";

const API_KEY = " ca5563e6679e4af0afa074f4b379e8ee";

//For App Features
const app_features = {
  isFav: false, // Boolean to toggle the favorites component
  favourites: [], // Array to store favorite locations
  isWish: false, // Boolean to toggle the wishlist component
  wishlist: [], // Array to store wishlist locations
  isVisited: false, // Boolean to toggle the visited component
  visited: [], // Array to store visited locations
  isItinerary: false,
  itinerary: [],
  date: false,
  setDate: "",
  event: false,
  setEvent: "", //set the event type
  note: false,
  noteArray: [], //push notes to this array
  setNote: "", //note variable for storing a note
  filesArray: [],
  notification: null,
  setNotification: null,
};

const side_menu = {
  isMenuOpen: false, //to toggle  the side menu on and off
};

//prettier-ignore
const FeatureContext = createContext();
const Side_Menu = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "Features/Favourites":
      // Only proceed if the payload is valid (not undefined)
      if (action.payload) {
        const updatedFavs = [...state.favourites, action.payload];
        console.log("Updated Favourites:", updatedFavs);

        //add to favourites array  without toggling the favourite box
        return {
          ...state,
          favourites: updatedFavs,
        };
      } else {
        // Toggle the favourites box if payload is not provided
        return {
          ...state,
          isFav: !state.isFav,
        };
      }

    case "Features/WishList":
      if (action.payload) {
        const updatedWishList = [...state.wishlist, action.payload];
        console.log("Updated Wishlist:", updatedWishList);

        //add to wishlist array without toggling the wishlist box
        return {
          ...state,
          wishlist: updatedWishList,
        };
      } else {
        // Toggle the wishlist box if payload is not provided
        return {
          ...state,
          isWish: !state.isWish,
        };
      }

    case "Features/Visited":
      if (action.payload) {
        const updatedVisited = [...state.visited, action.payload];
        console.log("Updated Visited:", updatedVisited);

        //add data to visited array list without toggling the visited box
        return {
          ...state,
          visited: updatedVisited,
        };
      } else {
        // Toggle the visited box even if payload is not provided
        return {
          ...state,
          isVisited: !state.isVisited,
        };
      }

    case "Features/Itinerary":
      return {
        ...state,
        isItinerary: !state.isItinerary,
      };

    case "Features/Itinerary/AddToItinerary":
      if (action.payload) {
        //updated itinerary array if data is there
        const updatedItinerary = [...state.itinerary, action.payload];
        console.log("Updated itinerary:", updatedItinerary);

        return {
          ...state,
          itinerary: updatedItinerary,
        };
      } else {
        console.log("No data in itinerary  array");
        return {
          //toggle itinerary box only
          ...state,
          isItinerary: !state.isItinerary,
        };
      }

    //element which deosnt satisy condition, is removed

    case "Features/Favourites/Remove":
      return {
        ...state,
        favourites: state.favourites.filter((_, i) => i !== action.payload), //2!==2 ->false, remove index 2
      };

    case "Features/WishList/Remove":
      return {
        ...state,
        wishlist: state.wishlist.filter((_, i) => i !== action.payload),
      };

    case "Features/Visited/Remove":
      return {
        ...state,
        visited: state.visited.filter((_, i) => i !== action.payload),
      };

    case "Features/Itinerary/RemoveFromItinerary": //remove location from itinerary
      return {
        ...state,
        itinerary: state.itinerary.filter((_, i) => i !== action.payload),
      };

    case "Features/Itinerary/ToggleDateBox":
      return {
        ...state,
        date: !state.date,
      };

    case "Features/Itinerary/SetDate": //store the date entered by user using calendar
      return {
        ...state,
        setDate: action.payload,
      };

    case "Features/Itinerary/AddEvent":
      console.log("event updated");
      return {
        ...state,
        event: !state.event,
        setEvent: action.payload,
      };

    case "Features/Itinerary/SetNote":
      console.log("note received");
      return {
        ...state,
        setNote: action.payload,
      };

    case "Features/Itinerary/AddNoteToArray":
      console.log("Note array before update:", state.noteArray);
      const updatedNote = [...state.noteArray, action.payload];
      console.log("Note array after update:", updatedNote);
      return {
        ...state,
        noteArray: [...state.noteArray, action.payload],
      };

    case "Features/Itinerary/ClearNoteField":
      return {
        ...state,
        setNote: action.payload,
      };

    case "Features/Itinerary/UploadFiles":
      const updatedFiles = [...state.filesArray, action.payload];
      console.log("Files array:", updatedFiles);
      return {
        ...state,
        files: updatedFiles,
      };

    default:
      return state;
  }
}

export default function App() {
  const [location, setLocation] = useState(""); //search location
  const [coords, setCoords] = useState(null); //search location coords for geocoding
  const [lastValidLocation, setLastValidLocation] = useState("");

  const [state, dispatch] = useReducer(reducer, app_features);

  const { isFav, isWish, isVisited, isItinerary } = state;
  console.log(isFav, isWish, isVisited, isItinerary);

  return (
    <FeatureContext.Provider value={{ state, dispatch }}>
      <div className="main-box">
        <Heading></Heading>
        <SearchBar
          location={location}
          setLocation={setLocation}
          coords={coords}
          setCoords={setCoords}
          setLastValidLocation={setLastValidLocation}
        ></SearchBar>
        <LoadMap
          location={location}
          setLocation={setLocation}
          coords={coords}
          setCoords={setCoords}
          lastValidLocation={lastValidLocation}
        ></LoadMap>
        {/* conditionally render the features component */}
        {/* make isFav and isVist false before rendering this */}
        {isFav && <Favourites></Favourites>}
        {isWish && <WishList></WishList>}
        {isVisited && <Visited></Visited>}
        {isItinerary && <Itinerary></Itinerary>}
      </div>
    </FeatureContext.Provider>
  );
}

function Heading() {
  return (
    <div className="header-container">
      <HamMenu></HamMenu>
      <p className="heading">Wander-Map-List</p>
    </div>
  );
}

function HamMenu() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, dispatch } = useContext(FeatureContext);
  const { isMenuOpen } = state;

  function handleMenu(e) {
    // setIsMenuOpen(!isMenuOpen);
    dispatch({ type: "Features/" });
  }
  return (
    <div>
      <button className="ham-menu" onClick={handleMenu}></button>
      {isMenuOpen && <SideMenu></SideMenu>}
    </div>
  );
}

function SideMenu() {
  return (
    <div className="side-menu">
      <button className="menu-close-btn">X</button>
      <input
        className="side-menu-search"
        type="text"
        placeholder="search here"
      ></input>
      <a className="side-menu-option">Home</a>
      <a className="side-menu-option">About Us</a>
      <a className="side-menu-option">Help</a>
      <a className="side-menu-option">Contact Us</a>
      <br />
      <p className="side-menu-para">Your Data</p>
      <button className="side-menu-option">Itinerary</button>

      <button className="side-menu-option">Favorites</button>
      <button className="side-menu-option">Wishlist</button>
      <button className="side-menu-option">Visited Locations</button>

      <div className="log-out">
        <img
          className="user-pic"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwnYnwftDUSjsQmLQvMBZ2pwDXhAJiIdfKvg&s"
        ></img>
        <button className="log-out-btn">Log Out</button>
      </div>
    </div>
  );
}

//APP Features- visited list, wishlist list, favourites list

function Favourites() {
  const { state, dispatch } = useContext(FeatureContext);
  const { isFav, favourites } = state;

  console.log(favourites);

  function closeFeatureBtn() {
    if (isFav) dispatch({ type: "Features/Favourites" });
  }

  //Add some classes to the favourites box and render wishlist and visited box
  function renderFavouritesList() {
    if (favourites.length === 0)
      return <p>No favourites added yet. Add some !!</p>;

    return (
      <ol>
        {favourites.map((fav, index) => (
          <RenderFavourite
            fav={fav}
            key={index}
            index={index}
            dispatch={dispatch}
          ></RenderFavourite>
        ))}
      </ol>
    );
  }

  return (
    <div className="features features-text">
      <p>Favourites</p>
      <button className="features-Xbtn" onClick={closeFeatureBtn}>
        X
      </button>
      <div>{renderFavouritesList()}</div>
    </div>
  );
}

function RenderFavourite({ fav, index, dispatch }) {
  console.log(fav, index);

  function removeFavourite() {
    dispatch({ type: "Features/Favourites/Remove", payload: index });
  }

  //add to itinerary from the favourites box
  function addToItinerary(itineraryObj) {
    console.log(itineraryObj);
    if (itineraryObj)
      dispatch({
        type: "Features/Itinerary/AddToItinerary",
        payload: itineraryObj,
      });
    else console.log("Add items to favourites first");
  }

  return (
    <div className="favourite-item">
      <li className="list_number">
        <div className="favourite-actions">
          <p style={{ textDecoration: "none" }} className="favs">
            {fav}
          </p>
          <button
            className="additional-feature"
            onClick={() =>
              fav ? addToItinerary(fav) : alert("Add items to favourites first")
            }
          >
            + Itinerary
          </button>
          <button
            className="additional-feature remove-btn"
            onClick={removeFavourite}
          >
            - Remove
          </button>
        </div>
      </li>
    </div>
  );
}

function WishList() {
  const { state, dispatch } = useContext(FeatureContext);
  const { isWish, wishlist } = state;
  function closeFeatureBtn() {
    if (isWish) dispatch({ type: "Features/WishList" });
  }

  //Add some classes to the favourites box and render wishlist and visited box
  function renderWishListList() {
    if (wishlist.length === 0) return <p>WishList is empty. Add some !!</p>;

    return (
      <ol>
        {wishlist.map((wish, index) => (
          <RenderWishList
            wish={wish}
            key={index}
            index={index}
            dispatch={dispatch}
          ></RenderWishList>
        ))}
      </ol>
    );
  }

  return (
    <div className="features features-text">
      <p>Wishlist</p>
      <button className="features-Xbtn" onClick={closeFeatureBtn}>
        X
      </button>
      <div>{renderWishListList()}</div>
    </div>
  );
}

function RenderWishList({ wish, index, dispatch }) {
  console.log(wish);

  function removeWishList() {
    dispatch({ type: "Features/WishList/Remove", payload: index });
  }

  function addToItinerary(itineraryObj) {
    console.log(itineraryObj);
    if (itineraryObj)
      dispatch({
        type: "Features/Itinerary/AddToItinerary",
        payload: itineraryObj,
      });
    else console.log("Add items to favourites first");
  }

  return (
    <div className="favourite-item">
      <li className="list_number">
        <div className="favourite-actions">
          <p style={{ textDecoration: "none" }} className="favs">
            {wish}
          </p>
          <button
            className="additional-feature"
            onClick={() =>
              wish
                ? addToItinerary(wish)
                : alert("Add items to favourites first")
            }
          >
            + Itenary
          </button>
          <button
            className="additional-feature remove-btn"
            onClick={removeWishList}
          >
            - Remove
          </button>
        </div>
      </li>
    </div>
  );
}

function Visited() {
  const { state, dispatch } = useContext(FeatureContext);
  const { isVisited, visited } = state;

  function closeFeatureBtn() {
    if (isVisited) dispatch({ type: "Features/Visited" });
  }

  function renderVisited() {
    if (visited.length === 0)
      return <p>No Visited places added yet. Add some !!</p>;

    return (
      <ol>
        {visited.map((visit, index) => (
          <RenderVisited
            visit={visit}
            key={index}
            index={index}
            dispatch={dispatch}
          ></RenderVisited>
        ))}
      </ol>
    );
  }

  return (
    <div className="features features-text">
      <p>Visited</p>
      <button className="features-Xbtn" onClick={closeFeatureBtn}>
        X
      </button>
      <div>{renderVisited()}</div>
    </div>
  );
}

function RenderVisited({ visit, index, dispatch }) {
  console.log(visit);

  function removeVisited() {
    dispatch({ type: "Features/Visited/Remove", payload: index });
  }

  function addToItinerary(itineraryObj) {
    console.log(itineraryObj);
    if (itineraryObj)
      dispatch({
        type: "Features/Itinerary/AddToItinerary",
        payload: itineraryObj,
      });
    else console.log("Add items to favourites first");
  }

  return (
    <div className="favourite-item">
      <li className="list_number">
        <div className="favourite-actions">
          <p style={{ textDecoration: "none" }} className="favs">
            {visit}
          </p>
          <button
            className="additional-feature"
            onClick={() =>
              visit
                ? addToItinerary(visit)
                : alert("Add items to favourites first")
            }
          >
            + Itenary
          </button>
          <button
            className="additional-feature remove-btn"
            onClick={removeVisited}
          >
            - Remove
          </button>
        </div>
      </li>
    </div>
  );
}

function Itinerary() {
  const { state, dispatch } = useContext(FeatureContext);
  const { isItinerary, itinerary } = state;

  function closeItinerary() {
    if (isItinerary) dispatch({ type: "Features/Itinerary" });
  }

  function itineraryList() {
    if (itinerary.length === 0)
      return <p>No itinerary added yet. Add some !!</p>;

    return (
      <ol>
        {itinerary.map((place, index) => (
          <RenderItinerary
            place={place}
            key={index}
            index={index}
            dispatch={dispatch}
          ></RenderItinerary>
        ))}
      </ol>
    );
  }

  return (
    <div className="features features-text">
      <p>Create your Itinerary</p>
      <button className="features-Xbtn" onClick={closeItinerary}>
        X
      </button>
      <div>{itineraryList()}</div>
    </div>
  );
}

function RenderItinerary({ place, index, dispatch }) {
  const { state } = useContext(FeatureContext);
  const { date, setDate } = state;

  function removeFromItinerary(index) {
    dispatch({
      type: "Features/Itinerary/RemoveFromItinerary",
      payload: index,
    });
  }
  // return <p>Itinerary places : {place}</p>;

  function toggleDateInput() {
    dispatch({ type: "Features/Itinerary/ToggleDateBox" });
  }

  return (
    <div className="favourite-item">
      <li className="list_number">
        <div className="favourite-actions">
          <p>{place}</p>

          <button
            className="additional-feature"
            onClick={() => removeFromItinerary(index)}
          >
            Remove from Itinerary
          </button>
          <button
            className="additional-feature"
            onClick={() => toggleDateInput()}
          >
            Add date
          </button>
        </div>
      </li>
      {date && <AddDate></AddDate>}
    </div>
  );
}

function AddDate() {
  const { state, dispatch } = useContext(FeatureContext);
  const { date, setDate, event, setEvent } = state;

  //prettier-ignore
  const events = ["Birthday","Anniversary","Meeting","Conference","Vacation","Festival","Workshop","Appointment", "Holiday","Party","Sports","Family Gathering",];

  function handleDateInput(e) {
    dispatch({ type: "Features/Itinerary/SetDate", payload: e.target.value });
  }

  function toggleDateButton() {
    //close  date box
    dispatch({ type: "Features/Itinerary/ToggleDateBox" });
  }

  function handleSelectEvent(e) {
    console.log(e.target.value);
    dispatch({ type: "Features/Itinerary/AddEvent", payload: e.target.value });
  }

  function formatDate(dateString) {
    //show date in DD::MM::YY format
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB");
  }
  return (
    <div className="date-rendering">
      <div>
        <button
          className="features-Xbtn feature-Xbtn-itinerary"
          onClick={toggleDateButton}
        >
          X
        </button>
        <p className="date-prompt">Enter the date to travel to this place!</p>
        <div className="date-event">
          <span>Date🗓️ :</span>
          <input
            type="date"
            placeholder="Enter the date"
            value={setDate}
            onChange={handleDateInput}
            className="date-input"
          ></input>

          <span>Event type:</span>

          <select
            className="event-select"
            defaultValue="default"
            onChange={handleSelectEvent}
          >
            <option disabled value="default">
              Select option
            </option>
            {events.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p>
        {setDate ? `The entered date to travel is: ${formatDate(setDate)}` : ""}
      </p>
      <div>
        <p>Leave a note here for the {setEvent} event! 📒</p>
        <LeaveNote></LeaveNote>
      </div>
    </div>
  );
}
//add store note functionality and clear note btn functionality

function LeaveNote() {
  const { state, dispatch } = useContext(FeatureContext);
  const { note, noteArray, setNote } = state; // note:false , noteArray:[], setNote:""
  const [inputText, setInputText] = useState(""); //state for debouncing while user types
  const [files, setFiles] = useState();
  const [notification, setNotification] = useState(null);

  function handleInputChange(e) {
    setInputText(e.target.value);
  }

  function handleNoteArray() {
    //push the note to the NoteArray
    dispatch({ type: "Features/Itinerary/AddNoteToArray", payload: setNote });
    dispatch({ type: "Features/Itinerary/SetNote", payload: "" });
    setInputText("");
    console.log("Updated note array:", noteArray);
  }

  function clearNoteField() {
    setInputText("");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "Features/Itinerary/SetNote", payload: inputText });
    }, 300);

    return () => clearTimeout(timer);
  }, [inputText, dispatch]);

  function handleFileChange(e) {
    setFiles(Array.from(e.target.files));
    console.log(Array.from(e.target.files));
  }

  function handleFileUpload() {
    //upload files in file array
    if (files.length > 0) {
      dispatch({ type: "Features/Itinerary/UploadFiles", payload: files });
      showNotification(" File Upload successfull ✌️");
    } else alert("Select files first");
  }

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }

  return (
    <div className="addNote-noteBtns">
      <input
        type="text"
        placeholder="Enter a note here"
        className="addNote"
        onChange={handleInputChange}
        value={inputText}
      ></input>
      <button className="add-noteBtn" onClick={handleNoteArray}>
        Add Note
      </button>
      <button className="add-noteBtn" onClick={clearNoteField}>
        Clear
      </button>
      <span className="fileText">Enter any attachments below:</span>
      <div className="file-inputFlex">
        <input
          type="file"
          className="file-input"
          placeholder="Enter Image"
          multiple
          onChange={handleFileChange}
        ></input>
        <button className="file-input-btn" onClick={handleFileUpload}>
          Upload!
        </button>

        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}

function SearchBar({
  location,
  setLocation,
  coords,
  setCoords,
  setLastValidLocation,
}) {
  // const [location, setLocation] = useState(""); //search location
  // const [coords, setCoords] = useState(null); //search location coords for geocoding

  //update coords
  useEffect(() => {
    if (coords) console.log(coords);
  }, [coords]);

  //get search location
  function handleSearch(loc) {
    setLocation(loc);
  }
  console.log(location);

  //forward geocoding->get coords by name of the place
  async function getLocationCoords() {
    if (location) {
      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?key=ca5563e6679e4af0afa074f4b379e8ee&q=${location}`
        );
        const data = await res.json();
        console.log(data);

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setCoords([lat, lng]);
          setLastValidLocation(location);
          console.log(`coordinates for ${location} are: ${lat},${lng}`);
        } else {
          alert("Please enter a valid location");
        }
      } catch (err) {
        console.error("Error fetching the coordinates", err);
      }
    } else {
      console.log("enter the location first");
    }
  }

  // const app_features = {
  //  isFav: false,      // Boolean to toggle the favorites component
  // favourites: [],    // Array to store favorite locations
  // isWish: false,     // Boolean to toggle the wishlist component
  // wishlist: [],      // Array to store wishlist locations
  // isVisited: false,  // Boolean to toggle the visited component
  // visited: [],       // Array to store visited locations
  // };

  const { state, dispatch } = useContext(FeatureContext);
  const { isFav, isWish, isVisited } = state;

  function handleFavourites() {
    dispatch({ type: "Features/Favourites" });
  }
  function handleWishList() {
    dispatch({ type: "Features/WishList" });
  }
  function handleVisited() {
    dispatch({ type: "Features/Visited" });
  }

  function handleItinerary() {
    dispatch({ type: "Features/Itinerary" });
  }

  return (
    <div className="search">
      <button className="feature-btn my-location "></button>
      <button className="feature-btn" onClick={handleItinerary}>
        Itinerary
      </button>

      <input
        value={location}
        type="text"
        placeholder="Enter the location name"
        className="search-bar"
        onChange={(e) => handleSearch(e.target.value)}
      ></input>

      <button className="btn-search" onClick={getLocationCoords}>
        🔍
      </button>

      <button className="feature-btn" onClick={handleFavourites}>
        Favourites
      </button>
      <button className="feature-btn" onClick={handleWishList}>
        Wishlist
      </button>
      <button className="feature-btn" onClick={handleVisited}>
        Visited
      </button>
    </div>
  );
}

function LoadMap({ coords, location, setLocation, lastValidLocation }) {
  // const coordinates = [30.3526216, 78.0192856]; //initial coords of the user
  const [cordinates, setCordinates] = useState([30.3526216, 78.0192856]);
  const [currentLoc, setCurrentLoc] = useState();
  const [position, setPosition] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const { state, dispatch } = useContext(FeatureContext);

  //initial location of user (on load)
  useEffect(() => {
    function initial_Location() {
      const initialPosition = navigator.geolocation.getCurrentPosition(
        function success(pos) {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCordinates([lat, lng]);
        },
        function error(err) {
          console.error("Location not allowed by the user", err);
        }
      );
    }
    initial_Location();
  }, []);

  //fetch initia location name
  useEffect(
    function initial_Location_name() {
      async function get_initial_Location_name() {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${cordinates[0]}%2C${cordinates[1]}&key=ca5563e6679e4af0afa074f4b379e8ee`
        );
        const data = await res.json();
        const currentLocation = data.results[0].formatted;

        setCurrentLoc(currentLocation);
      }
      get_initial_Location_name();
    },
    [cordinates]
  );
  //

  //reverse geocoding

  useEffect(
    function reverseGeocoding() {
      async function reverseGeocode() {
        //fetch only if the position is available
        if (position) {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position[0]}%2C${position[1]}&key=ca5563e6679e4af0afa074f4b379e8ee`
          );
          const data = await res.json();
          console.log(data);

          //when user click on map, store the location for later use

          setLocationName(data.results[0].formatted);
        }
      }
      reverseGeocode();
    },
    [position]
  );

  //animate panning (move to the clicked location on the map animation)
  const animateRef = useRef(true);

  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        // animate: animateRef.current,
        animate: true,
        pan: {
          duration: 3, //controls the speed of animation
          easeLinearity: 0.2,
        },
      });
    });

    return null;
  }

  return (
    <div>
      <MapContainer
        center={cordinates}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={cordinates}>
          <Popup className="popup">
            {lastValidLocation ? (
              `Your searched location: ${lastValidLocation.toUpperCase()}`
            ) : (
              <>
                Your current location:
                <br />
                {currentLoc}
              </>
            )}

            {/* initial location buttons */}
            <div>
              <div className="btn-container">
                <button
                  className="popUp-btn"
                  onClick={() =>
                    addToFeatures("Favourites", currentLoc, state, dispatch)
                  }
                >
                  Add To Favourites
                </button>
                <button
                  className="popUp-btn"
                  onClick={() =>
                    addToFeatures("WishList", currentLoc, state, dispatch)
                  }
                >
                  Add To Wishlist
                </button>
                <button
                  className="popUp-btn"
                  onClick={() =>
                    addToFeatures("Visited", currentLoc, state, dispatch)
                  }
                >
                  Add To Visited
                </button>
              </div>
            </div>
          </Popup>
        </Marker>

        <LocationMarker
          position={position}
          setPosition={setPosition}
          setPopupVisible={setPopupVisible}
          locationName={locationName}
          setLocationName={setLocationName}
          location={location}
          setLocation={setLocation}
          coords={coords}
        />
        <FlyToLocation
          coords={coords}
          setCordinates={setCordinates}
          location={location}
          setLocation={setLocation}
        ></FlyToLocation>
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </div>
  );
}

//add the locations to the features
function addToFeatures(feature, location, state, dispatch) {
  if (!location || location === "undefined") {
    console.log("Invalid location cannot be added");
    return;
  }
  console.log(location);

  switch (feature) {
    case "Favourites":
      dispatch({ type: "Features/Favourites", payload: location });
      break;

    case "WishList":
      dispatch({ type: "Features/WishList", payload: location });
      break;

    case "Visited":
      dispatch({ type: "Features/Visited", payload: location });
      break;

    default:
      console.log("Unknown operation");
  }
}

// //set new coordinates when the location is entered from searchbar
function FlyToLocation({ coords, setCordinates, location, setLocation }) {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    if (coords) {
      setCordinates(coords); // Update coordinates state
      map.flyTo(coords, 14); // Move the map to the new location
    }
  }, [coords, map, setCordinates]);

  return null;
}

//second marker which appears when user clicks on map is not working. Add the onClick function in the bellow buttons
//whenever user clicks on the map, a popup appears
function LocationMarker({
  position,
  setPosition,
  setPopupVisible,
  locationName,
  location,
  setLocation,
  coords,
}) {
  const { state, dispatch } = useContext(FeatureContext);

  const map = useMapEvents({
    click(e) {
      console.log(e);
      const lat = e.latlng.lat;
      const long = e.latlng.lng;
      // map.locate();
      setPosition([lat, long]);
      setPopupVisible(true);
      console.log(position);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // if (location) console.log(location); //search bar location
  // if (coords) console.log(coords);
  console.log(locationName);

  return position === null ? null : (
    <Marker position={position}>
      <Popup onClose={() => setPopupVisible(false)}>
        {locationName ? `${locationName}` : "You clicked over here"}
        <div className="btn-container">
          <button
            className="popUp-btn"
            onClick={() =>
              locationName &&
              addToFeatures("Favourites", locationName, state, dispatch)
            }
          >
            Add to Favourites
          </button>
          <button
            className="popUp-btn"
            onClick={() =>
              locationName &&
              addToFeatures("WishList", locationName, state, dispatch)
            }
          >
            Add to Wishlist
          </button>
          <button
            className="popUp-btn"
            onClick={() =>
              locationName &&
              addToFeatures("Visited", locationName, state, dispatch)
            }
          >
            Add to Visited
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

// addToFeatures(feature, location, state, dispatch);

// const app_features = {
//   isFav: false, // Boolean to toggle the favorites component
//   favourites: [], // Array to store favorite locations
//   isWish: false, // Boolean to toggle the wishlist component
//   wishlist: [], // Array to store wishlist locations
//   isVisited: false, // Boolean to toggle the visited component
//   visited: [], // Array to store visited locations
// };
//Render Favourites list when user click favourites button

//Add some classes to the favourites box and render wishlist and visited box

//tomorrow task
//add the remove functionalty in the itinerary box.
//then add the input date functionality to the itinerary box (RenderItinerary)

//next task
//add state to select tags, notes, add note, clear fiel and enter attachments

function Navigation() {
  return (
    <nav>
      <option>Home</option>
      <option>About us</option>

      <option>Contact us</option>
    </nav>
  );
}
