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

export function ViewMoreInfo() {
  const { id } = useParams();
  const [pickedMovie, setPickedMovie] = useState([]);
  let posterImage = "";
  let categories = [];

  useEffect(() => {
    (async () => {
      const movie = await (await fetch(`/api/movies?id=${id}`)).json();
      const screenTimes = await (
        await fetch(`/api/screenings?movieId=${id}`)
      ).json();
      posterImage =
        "https://cinema-rest.nodehill.se/" + movie[0].description.posterImage;
      movie[0].screenTimes = screenTimes;
      console.log(movie[0].screenTimes);
      setPickedMovie(movie[0]);
    })();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>{pickedMovie.title} description</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={9}>
          <p> Movie duration: {pickedMovie.description.length} minutes</p>
          Screen times:
          {pickedMovie.screenTimes.map((screenTime) => (
            <p className="screen-time" key={screenTime.id}>
              {screenTime.time}
            </p>
          ))}
        </Col>
        <Col xs={12} md={3}>
          <Card.Img
            className="poster"
            variant="top"
            src={posterImage}
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
            <Button className="readMore-btn border p-2" variant="primary">
              Buy tickets
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
}
