import { useState, useEffect } from "react";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import { Movie } from "./Movie";
import { SortAndFilter } from "./FiltersAndSorters";

export function GetAllMovies() {
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    (async () => {
      const movieList = await (await fetch("/api/movies")).json();
      setMovies(movieList);
      setInitialMovies(movieList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (currentFilter === "All") {
        setMovies(initialMovies);
        return;
      }
      setMovies(
        initialMovies.filter((movie) =>
          movie.description.categories.includes(currentFilter)
        )
      );
    })();
  }, [currentFilter, initialMovies]);

  const categories = initialMovies.reduce((acc, curr) => {
    curr.description.categories.forEach((category) => acc.add(category));
    return acc;
  }, new Set());

  return (
    <Container style={{ maxWidth: "1200px" }}>
      <SortAndFilter categories={categories} func={setCurrentFilter} />
      <Row>
        {movies.map(({ id, title, description }) => (
          <Movie key={id} id_={id} title={title} description={description} />
        ))}
      </Row>
    </Container>
  );
}
