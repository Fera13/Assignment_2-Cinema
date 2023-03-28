import React, { useEffect } from "react";
import { Card, Button, Badge, Col, Row, Container } from "react-bootstrap";
import "./index.css";

export function TicketBooking() {
  return (
    <>
      <Container className="role-container">
        <label>Pick the type of person</label>
        <select id="age" name="age">
          <option value="10">Adult ($10)</option>
          <option value="12">Elderly ($12)</option>
          <option value="8">Child ($8)</option>
        </select>
      </Container>
      <ul className="seat-instructions">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>

        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>

        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      <Container>
        <Card className="container">
          <Row>
            <div className="seat" id="1"></div>
            <div className="seat" id="2"></div>
            <div className="seat" id="3"></div>
            <div className="seat" id="4"></div>
            <div className="seat" id="5"></div>
            <div className="seat" id="6"></div>
            <div className="seat" id="7"></div>
            <div className="seat" id="8"></div>
          </Row>
        </Card>
      </Container>
    </>
  );
}
