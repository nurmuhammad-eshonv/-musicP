import React from "react";
import Likes from "./pages/Likes";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import MainLoyaut from "./layout/MainLayout";

// Routes
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLoyaut>
            <Home></Home>
          </MainLoyaut>
        }
      ></Route>
      <Route
        path="/likes"
        element={
          <MainLoyaut>
            <Likes></Likes>
          </MainLoyaut>
        }
      ></Route>
      <Route
        path="/playlist/:id"
        element={
          <MainLoyaut>
            <Playlist></Playlist>
          </MainLoyaut>
        }
      ></Route>
    </Routes>
  );
}

export default App;
