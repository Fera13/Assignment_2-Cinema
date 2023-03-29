import { useState, useEffect } from "react";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import { Movie } from "./Movie";
import { SortAndFilter } from "./FiltersAndSorters";

export function GetAllMovies() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    (async () => {
      setMovies(await (await fetch("/api/movies")).json());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (filter === "All") {
        setMovies(await (await fetch("/api/movies")).json());
        return;
      }
      console.log(filter);
      setMovies(
        movies.filter((movie) => movie.description.categories.includes(filter))
      );
    })();
  }, [filter]);

  const categories = movies.reduce((acc, curr) => {
    curr.description.categories.forEach((category) => acc.add(category));
    return acc;
  }, new Set());

  return (
    <Container style={{ maxWidth: "1200px" }}>
      <SortAndFilter categories={categories} func={setFilter} />
      <Row>
        {movies.map(({ id, title, description }) => (
          <Movie key={id} id_={id} title={title} description={description} />
        ))}
      </Row>
    </Container>
  );
}
