import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Col, Row } from "react-bootstrap";
import "./index.css";

export function SortAndFilter({ categories }) {
  const [filters, setFilters] = useState(new Set());
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    // Create options for category filter
    const categoryOptions = Array.from(categories).map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));
    setCategoryOptions(categoryOptions);
  }, [categories]);

  return (
    <Card className="fil-sort">
      <Row className="row ">
        <Col className="filters position-relative">
          <label className="fw-semibold" htmlFor="category-filter">
            Filter By Category:
          </label>
          <select id="category-filter">
            <option value="All">All</option>
            {categoryOptions}
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
