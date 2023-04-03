import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Badge,
  Modal,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export function ViewMoreInfo() {
  const { id } = useParams();
  const [pickedMovie, setPickedMovie] = useState([]);

  useEffect(() => {
    (async () => {
      const movie = await (await fetch(`/api/movies?id=${id}`)).json();
      const screenTimes = await (
        await fetch(`/api/screenings?movieId=${id}`)
      ).json();
      movie[0].screenTimes = screenTimes;
      setPickedMovie(movie[0]);
    })();
  }, []);

  if (pickedMovie.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="info-cont rounded-5">
      <Row>
        <Col>
          <h1>{pickedMovie.title} description</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} className="info fs-3 fw-bold">
          <p> Movie duration: {pickedMovie.description.length} minutes</p>
          Screen times:
          {pickedMovie.screenTimes.map((screenTime) => (
            <div className="screaning-option border border-warning border-2 bg-opacity-20 rounded">
              <p className="screen-time" key={screenTime.id}>
                {new Intl.DateTimeFormat("en-UK", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(screenTime.time))}
              </p>
              <Link to={`/viewSeats/${screenTime.id}`}>
                <button
                  className="book-btn border border-warning btn-primary p-2 rounded ms-auto d-flex justify-content-end"
                  variant="primary"
                >
                  Buy tickets
                </button>
              </Link>
            </div>
          ))}
        </Col>
        <Col xs={12} md={4}>
          <Card.Img
            className="poster"
            variant="top"
            src={
              "https://cinema-rest.nodehill.se/" +
              pickedMovie.description.posterImage
            }
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
          <Card.Body>
            <Card.Title className="title-bg rounded">
              {pickedMovie.title}
            </Card.Title>
            <Card.Text>
              {pickedMovie.description.categories.map((category) => (
                <Badge key={category} pill variant="info" className="mr-1">
                  {category.trim()}
                </Badge>
              ))}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
}
