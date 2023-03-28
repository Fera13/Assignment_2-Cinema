import React from "react";
import { Card, Button, Badge, Col } from "react-bootstrap";
import "./index.css";

export function Movie(props) {
  // Destructure props into separate variables
  let { title, description } = props;
  let { posterImage, categories } = description;

  // Add the correct domain to the image path
  posterImage = "https://cinema-rest.nodehill.se/" + posterImage;

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card
        className="Movie-card"
        style={{ width: "100%", height: "34em", marginBottom: "20px" }}
      >
        <Card.Img
          className="poster"
          variant="top"
          src={posterImage}
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title className="title-bg rounded">{title}</Card.Title>
          <Card.Text>
            {categories.map((category) => (
              <Badge key={category} pill variant="info" className="mr-1">
                {category.trim()}
              </Badge>
            ))}
          </Card.Text>
          <Button
            className="readMore-btn border p-2"
            variant="primary"
            onClick={() => {
              /* show modal with more info */
            }}
          >
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
