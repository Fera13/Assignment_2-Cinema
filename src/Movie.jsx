import React from "react";
import { Card, Button, Badge, Col, Container } from "react-bootstrap";
import "./index.css";

export function Movie(props) {
  // Destructure props into separate variables
  let { title, description, id_ } = props;
  let { posterImage, categories } = description;

  // Add the correct domain to the image path
  posterImage = "https://cinema-rest.nodehill.se/" + posterImage;

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card
        className="Movie-card"
        style={{ width: "100%", height: "38em", marginBottom: "20px" }}
      >
        <Card.Img
          className="poster"
          variant="top"
          src={posterImage}
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
        <Container className="card-b rounded">
          <Card.Title className="title-bg rounded fw-bold fs-4">
            {title}
          </Card.Title>
          <Card.Text>
            {categories.map((category) => (
              <Badge key={category} pill variant="info" className="mr-1">
                {category.trim()}
              </Badge>
            ))}
          </Card.Text>
          <Button
            className="readMore fw-semibold border border-warning p-2 mb-2 rounded-2 btn-primary"
            href={`viewMore/${id_}`}
          >
            Learn More
          </Button>
        </Container>
      </Card>
    </Col>
  );
}
