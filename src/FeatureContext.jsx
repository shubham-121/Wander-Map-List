import React, { createContext, useReducer } from "react";

//For App Features
export const app_features = {
  isFav: false,
  favourites: [],
  isWish: false,
  wishlist: [],
  isVisited: false,
  visited: [],
  isItinerary: false,
  itinerary: [],
  date: false,
  setDate: "",
  event: false,
  setEvent: "",
  note: false,
  noteArray: [],
  setNote: "",
  filesArray: [],
  notification: null,
  setNotification: null,
};

export function reducer(state, action) {
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

// Create the context
export const FeatureContext = createContext();

// FeatureProvider component to wrap around your application
export function FeatureProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, app_features); // Initialize with app_features
  return (
    <FeatureContext.Provider value={{ state, dispatch }}>
      {children}
    </FeatureContext.Provider>
  );
}
