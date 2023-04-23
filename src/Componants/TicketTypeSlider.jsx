import { Form } from "react-bootstrap";

export function TicketTypeSlider({ selectedSeats, calculateTotalPrice }) {
  return (
    <>
      {selectedSeats.map((seat, index) => (
        <div key={index} className="select-role">
          <h4>Seat {seat.seatNumber}</h4>
          <Form>
            <Form.Group>
              <Form.Control
                as="select"
                value={seat.ticketType}
                onChange={(e) => {
                  const newSelectedSeats = [...selectedSeats];
                  newSelectedSeats[index].ticketType = e.target.value;
                  selectedSeats = newSelectedSeats;
                  calculateTotalPrice();
                }}
              >
                <option data-price="85" value="adult">
                  Adult
                </option>
                <option data-price="65" value="child">
                  Child
                </option>
                <option data-price="75" value="elderly">
                  Elderly
                </option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
      ))}
    </>
  );
}
