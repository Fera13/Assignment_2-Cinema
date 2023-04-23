import { generateBookingNumber } from "../utilities/generate-booking-number";
import { Button, Modal } from "react-bootstrap";

export function ModalReceipt({
  screening,
  selectedSeats,
  totalPrice,
  onClose,
}) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Date and Time: {new Date(screening.screeningTime).toLocaleString()}
        </p>
        <p>Selected Seats:</p>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat.id}>{seat.id}</li>
          ))}
        </ul>
        <p>Total Price: {totalPrice} Kr</p>
        <p className="justify-content-center">
          Booking number: {generateBookingNumber()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => alert("Booking confirmed!")}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
