import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Public from "./Public";

import Home from "../Pages/Home";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Home />
            </Public>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
