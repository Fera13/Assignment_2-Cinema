import { Card, Col, Row } from "react-bootstrap";
import "../index.css";

export function SortAndFilter({ categories, func, sortFunc }) {
  const handleCategoryChange = (event) => {
    func(event.target.value);
  };

  const handleFilterChange = (event) => {
    sortFunc(event.target.value);
  };

  return (
    <Card className="fil-sort justify-content-center">
      <Row className="row ">
        <Col className="filters position-relative">
          <p
            className="soerter-filter-title fw-semibold"
            htmlFor="category-filter"
          >
            Filter By Category:
          </p>
          <select id="category-filter" onChange={handleCategoryChange}>
            <option value="All">All</option>
            {[...categories].map((category) => (
              <option key={`${category}`}>{category}</option>
            ))}
          </select>
        </Col>
        <Col className="sorters position-relative">
          <p className="soerter-filter-title fw-semibold" htmlFor="all-sorts">
            Sort By:
          </p>
          <select id="all-sorts" onChange={handleFilterChange}>
            <option value="titleAscending">Title ascending</option>
            <option value="titleDescending">Title descending</option>
          </select>
        </Col>
      </Row>
    </Card>
  );
}
