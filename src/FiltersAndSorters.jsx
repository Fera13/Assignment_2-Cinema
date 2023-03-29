import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Col, Row } from "react-bootstrap";
import "./index.css";

export function SortAndFilter({ categories, func }) {
  const handleCategoryChange = (event) => {
    func(event.target.value);
  };

  return (
    <Card className="fil-sort justify-content-center">
      <Row className="row ">
        <Col className="filters position-relative">
          <label className="fw-semibold" htmlFor="category-filter">
            Filter By Category:
          </label>
          <select id="category-filter" onChange={handleCategoryChange}>
            <option value="All">All</option>
            {[...categories].map((category) => (
              <option key={`${category}`}>{category}</option>
            ))}
          </select>
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
