import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Carousel,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";

export function RolePick({ selectedSeats }) {
  const [importedSelectedSeats, setImportedSelectedSeats] =
    useState(selectedSeats);

  const calculateTicketPrice = (ticketType) => {
    switch (ticketType) {
      case "adult":
        return 85;
      case "child":
        return 65;
      case "elderly":
        return 75;
      default:
        return 0;
    }
  };

  useEffect(() => {
    viewTotal();
  }, [importedSelectedSeats]);

  const handleTicketTypeChange = (e, index) => {
    const newSelectedSeats = [...importedSelectedSeats];
    newSelectedSeats[index].ticketType = e.target.value;
    setImportedSelectedSeats(newSelectedSeats);
  };

  const viewTotal = () => {
    const ticketPrices = document.querySelectorAll(".ticket-price");
    let total = 0;
    for (let i = 0; i < ticketPrices.length; i++) {
      const ticketPrice = calculateTicketPrice(
        importedSelectedSeats[i].ticketType
      );
      if (!isNaN(ticketPrice)) {
        total += ticketPrice;
      }
    }
    document.querySelector(".total-price").innerHTML = total + " SEK";
  };

  return (
    <>
      {importedSelectedSeats.map((seat, index) => (
        <div key={index} className="select-role">
          <h4>Seat {seat.seatNumber}</h4>
          <Form>
            <Form.Group>
              <Form.Control
                as="select"
                value={seat.ticketType}
                onChange={(e) => handleTicketTypeChange(e, index)}
              >
                <option value="adult">Adult</option>
                <option value="child">Child</option>
                <option value="elderly">Elderly</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <h4 className="ticket-price">
            {calculateTicketPrice(seat.ticketType)} SEK
          </h4>
        </div>
      ))}
      <h4 className="total-price"></h4>
    </>
  );
}
