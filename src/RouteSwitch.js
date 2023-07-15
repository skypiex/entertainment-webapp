import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Bookmarked from "./pages/Bookmarked";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/entertainment-webapp"
          element={<Navigate to="/entertainment-webapp/home" />}
        />
        <Route path="/entertainment-webapp/home" element={<Home />} />
        <Route path="/entertainment-webapp/movies" element={<Movies />} />
        <Route path="/entertainment-webapp/shows" element={<Shows />} />
        <Route
          path="/entertainment-webapp/bookmarked"
          element={<Bookmarked />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
