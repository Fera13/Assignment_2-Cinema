import { useState, useEffect } from "react";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import { MyNavBar } from "./MyNavBar";
import { GetAllMovies } from "./AllMovies";
import { ViewMoreInfo } from "./ViewMoreInfo";
import "./index.css";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <MyNavBar />
      <main>
        <Routes>
          <Route path="/" element={<GetAllMovies />} />
          <Route path="viewMore/:id" element={<ViewMoreInfo />} />
        </Routes>
      </main>
    </div>
  );
}
