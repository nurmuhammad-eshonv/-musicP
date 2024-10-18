import React from "react";
import Likes from "./pages/Likes";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import MainLayout from "./layout/MainLayout";

// Import BrowserRouter
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/likes"
          element={
            <MainLayout>
              <Likes />
            </MainLayout>
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <MainLayout>
              <Playlist />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
