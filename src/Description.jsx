import React from "react";
import { Card, Button, Badge, Col, Row } from "react-bootstrap";
import { TicketBooking } from "./DisplayChairs";
import "./index.css";

export function DescriptionModal(props) {
  return (
    <Card
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Booked Tickets
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body"></div>
    </Card>
  );
}
