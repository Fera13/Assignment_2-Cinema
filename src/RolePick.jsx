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
  const [selectedTicketType, setSelectedTicketType] = useState("adult");
  const [importedSelectedSeats, setImportedSelectedSeats] =
    useState(selectedSeats);

  const calculateTicketPrice = () => {
    switch (selectedTicketType) {
      case "adult":
        return { price: 85, label: "85 SEK" };
      case "child":
        return { price: 65, label: "65 SEK" };
      case "elderly":
        return { price: 75, label: "75 SEK" };
      default:
        return { price: 0, label: "Unknown" };
    }
  };

  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
    viewTotal();
  };

  const viewTotal = () => {
    const ticketPrices = document.querySelectorAll(".ticket-price");
    let total = 0;
    for (let i = 0; i < ticketPrices.length; i++) {
      const ticketPrice = parseInt(ticketPrices[i].price);
      if (!isNaN(ticketPrice)) {
        total += ticketPrice;
      }
    }
    document.querySelector(".view-total").innerHTML = total + " SEK";
  };

  return importedSelectedSeats.map((seat, index) => (
    <div key={index} className="select-role">
      <h4>Seat {seat.seatNumber}</h4>
      <Form>
        <Form.Group>
          <Form.Control
            as="select"
            value={seat.ticketType}
            onChange={(e) => {
              const newSelectedSeats = [...importedSelectedSeats];
              newSelectedSeats[index].ticketType = e.target.value;
              setImportedSelectedSeats(newSelectedSeats);
              handleTicketTypeChange(e);
            }}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="elderly">Elderly</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <h4 className="ticket-price">{calculateTicketPrice().label}</h4>
    </div>
  ));
}
