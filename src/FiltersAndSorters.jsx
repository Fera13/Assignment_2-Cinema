import React, { useEffect } from "react";
import { Card, Button, Badge, Col, Row } from "react-bootstrap";
import "./index.css";

export function SortAndFilter(props) {
  /*const [filters, setFilters] = useState([]);
  let { categories } = description;
  let mySet = Set();
  useEffect(() => {
    categories.map((category) => (
      <Badge key={category} pill variant="info" className="mr-1">
        {category.trim()}
      </Badge>
    ));
  }, []);*/
  return (
    <Card className="fil-sort">
      <Col className="col position-relative">
        <div className="filters">
          <label className="fw-semibold" htmlFor="category-filter">
            Filter by Category:
          </label>
          <select id="category-filter"></select>

          <label className="fw-semibold" htmlFor="price-filter">
            Price:
          </label>
          <select id="price-filter"></select>

          <label className="fw-semibold" htmlFor="author-filter">
            Author:
          </label>
          <select id="author-filter"></select>
        </div>

        <div className="sorters">
          <label className="fw-semibold" htmlFor="all-sorts">
            Sort by:
          </label>
          <select id="all-sorts"></select>
        </div>
      </Col>
    </Card>
  );
}
