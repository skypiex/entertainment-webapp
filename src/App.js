import React, { useState } from "react";
import RouteSwitch from "./RouteSwitch";
import { BookmarkedContext } from "./BookmarkedContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [bookmarksTemp, setBookmarksTemp] = useState([]);

  return (
    <div className="bg-slate-900 text-white">
      <BookmarkedContext.Provider value={{ bookmarksTemp, setBookmarksTemp }}>
        <RouteSwitch />
      </BookmarkedContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
    </div>
  );
};

export default App;
