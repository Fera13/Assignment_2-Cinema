import { useState, useEffect } from "react";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import { MyNavBar } from "./MyNavBar";
import { Movie } from "./Movie";
import { SortAndFilter } from "./FiltersAndSorters";
import "./index.css";

export default function App() {
  // A variable that will contain a list of movies
  const [movies, setMovies] = useState([]);

  // Run this function when the component mounts
  useEffect(() => {
    // Self-executing asyncronous anonomyous function
    (async () => {
      // Fetch all the movies from the REST api
      // and store them in the state variable movies
      setMovies(await (await fetch("/api/movies")).json());
    })();
  }, []);

  const categories = movies.reduce((acc, curr) => {
    curr.description.categories.forEach((category) => acc.add(category));
    return acc;
  }, new Set());

  return (
    <div className="App">
      <MyNavBar />

      {/* Loop through all movies and display each movie */}
      <main className="container" style={{ maxWidth: "1200px" }}>
        <SortAndFilter categories={categories} />
        <Row>
          {movies.map(({ id, title, description }) => (
            <Movie key={id} title={title} description={description} />
          ))}
        </Row>
      </main>
    </div>
  );
}
