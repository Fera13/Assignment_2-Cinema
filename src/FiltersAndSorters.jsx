import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Col, Row } from "react-bootstrap";
import "./index.css";

export function SortAndFilter({ categories, func }) {
  return (
    <Card className="fil-sort justify-content-center">
      <Row className="row ">
        <Col className="filters position-relative">
          <label className="fw-semibold" htmlFor="category-filter">
            Filter By Category:
          </label>

          <button value="All">All</button>
          {[...categories].map((category) => (
            <button key={`${category}`} onClick={() => func(category)}>
              {category}
            </button>
          ))}
        </Col>
        <Col className="sorters position-relative">
          <label className="fw-semibold" htmlFor="all-sorts">
            Sort By:
          </label>
          <select id="all-sorts"></select>
        </Col>
      </Row>
    </Card>
  );
}
