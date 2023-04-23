import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useStates } from "./utilities/states";
import { useParams } from "react-router";
import { ModalReceipt } from "./Componants/ModalReceipt";
import { TicketTypeSlider } from "./Componants/TicketTypeSlider";

export function DisplaySeats() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const s = useStates({
    screening: null,
    movie: null,
    seats: [],
    numOfPeople: 1,
    numOfPeopleLeft: 1,
    ticketTypes: [],
    selectedSeats: [],
    totalPrice: 0,
  });

  useEffect(() => {
    (async () => {
      let screening = (
        await (await fetch(`/api/occupied_seats?screeningId=${id}`)).json()
      )[0];

      // Convert the string of occupied seats into an array of numbers
      screening.occupiedSeats = screening.occupiedSeats
        .split(", ")
        .map((x) => +x);

      // Set the state variable
      s.screening = screening;

      // Get the movie (with poster image, length of movie etc)
      s.movie = (
        await (await fetch(`/api/movies?title=${screening.movie}`)).json()
      )[0];

      // Get the aditorium id from the auditorium name
      let auditoriumId =
        ["Stora Salongen", "Lilla Salongen"].indexOf(s.screening.auditorium) +
        1;

      // Get the seats
      let seats = await (
        await fetch(`/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`)
      ).json();

      // Convert the data structure from an array of objects
      // to an array (rows) of arrays (seats in rows) of objects
      let rows = [];
      let row;
      let latestRow;

      for (let seat of seats) {
        // Add a new property: Is the seat occupied? (true/false)
        seat.occupied = screening.occupiedSeats.includes(seat.seatNumber);
        // Arrange seats into rows
        if (latestRow !== seat.rowNumber) {
          row = [];
          rows.push(row);
        }
        row.push(seat);
        latestRow = seat.rowNumber;
      }

      // Set the state variable
      s.seats = rows;
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNumPeopleChange = (e) => {
    s.numOfPeople = parseInt(e.target.value);
    s.numOfPeopleLeft = s.numOfPeople - s.selectedSeats.length;
  };

  function toggleSeatSelection(seat) {
    // do nothing if occupied
    if (seat.occupied) {
      return;
    }

    if (seat.selected) {
      diselectSeat(seat);
    } else {
      selectSeat(seat);
    }
  }

  function diselectSeat(seat) {
    seat.selected = false;
    seat.className = "";
    s.numOfPeopleLeft += 1;
    s.selectedSeats = s.selectedSeats.filter(
      (selectedSeat) => selectedSeat.id !== seat.id
    );
    renderTicketTypeSliders();
  }

  function selectSeat(seat) {
    if (s.numOfPeopleLeft <= 0) {
      return;
    } else if (s.numOfPeopleLeft === 0) {
      return;
    }

    if (s.numOfPeople > 1) {
      let leftCurrSeatInd = seat.id - 1;
      let currentRow = seat.rowNumber;
      let rightCurrSeatInd = seat.id + 1;

      seat.selected = true;
      seat.className = "selected";
      s.selectedSeats.push(seat);
      s.numOfPeopleLeft -= 1;
      const iterationAmount = s.numOfPeopleLeft;
      for (let i = 0; i < iterationAmount; i++) {
        let rightCurrSeat = s.seats[seat.rowNumber - 1].find(
          (s) => s.id === rightCurrSeatInd
        );

        if (
          !rightCurrSeat.occupied &&
          s.numOfPeopleLeft > 0 &&
          rightCurrSeat.rowNumber === currentRow
        ) {
          s.selectedSeats.push(rightCurrSeat);
          s.numOfPeopleLeft -= 1;
          rightCurrSeat.selected = true;
          rightCurrSeat.className = "selected";
          rightCurrSeatInd += 1;
        }
        let leftCurrSeat = s.seats[seat.rowNumber - 1].find(
          (s) => s.id === leftCurrSeatInd
        );
        if (
          !leftCurrSeat.occupied &&
          s.numOfPeopleLeft > 0 &&
          leftCurrSeat.rowNumber === currentRow
        ) {
          s.selectedSeats.push(leftCurrSeat);
          s.numOfPeopleLeft -= 1;
          leftCurrSeat.selected = true;
          leftCurrSeat.className = "selected";
          leftCurrSeatInd -= 1;
        }

        if (s.numOfPeopleLeft === 0) {
          break;
        }
      }
    } else {
      seat.selected = true;
      seat.className = "selected";
      s.selectedSeats.push(seat);
      s.numOfPeopleLeft -= 1;
    }
    calculateTotalPrice();
  }

  function calculateTotalPrice() {
    let newTickets = [];
    for (let seat of s.selectedSeats) {
      newTickets.push(seat.ticketType);
    }
    s.ticketTypes = newTickets;
    let total = 0;
    for (let ticket of s.ticketTypes) {
      if (ticket === "elderly") {
        total += 75;
      } else if (ticket === "child") {
        total += 65;
      } else {
        total += 85;
      }
    }
    s.totalPrice = total;
  }

  const renderTicketTypeSliders = () => {
    return (
      <TicketTypeSlider
        selectedSeats={s.selectedSeats}
        calculateTotalPrice={calculateTotalPrice}
      />
    );
  };

  const handleBookButtonClick = () => {
    if (s.selectedSeats.length === 0) {
      alert("No seats were selected!");
    } else {
      setShowModal(true);
    }
  };

  return s.seats.length === 0 ? null : (
    <div className="screening-and-seats rounded">
      <h1>{s.screening.movie}</h1>
      <h2>
        {new Intl.DateTimeFormat("en-UK", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(s.screening.screeningTime))}
      </h2>
      <Container>
        <Row>
          <Col>
            <img
              className="poster-screen"
              src={
                "https://cinema-rest.nodehill.se" +
                s.movie.description.posterImage
              }
            />
          </Col>
          <Col>
            <div className="seats">
              <h4>unseated people: {s.numOfPeopleLeft}</h4>
              {s.seats.map((row) => (
                <>
                  <div className="row">
                    {row.map((seat) => (
                      <div
                        id={seat.id}
                        className={
                          (seat.selected ? "selected" : "") +
                          (seat.occupied ? " occupied" : "")
                        }
                        onClick={() => toggleSeatSelection(seat)}
                      >
                        {seat.seatNumber}
                      </div>
                    ))}
                  </div>
                  <br />
                </>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <h3>Ticket Prices</h3>
            <p>Adults: 85 Kr</p>
            <p>Children: 65 Kr</p>
            <p>Elderly: 75 Kr</p>
          </Col>
          <Col id="num-of-ppl" md={{ span: 3 }}>
            <Form.Group controlId="numPeople">
              <h4>Number of people</h4>
              <Form.Control
                type="number"
                min="1"
                max="10"
                value={s.numOfPeople}
                onChange={handleNumPeopleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          {s.selectedSeats.length > 0 && (
            <Col xs={12} md={6}>
              {renderTicketTypeSliders()}
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <h3>Total Price: {s.totalPrice} Kr</h3>
          </Col>
          <Col>
            <Button className="show-receipt" onClick={handleBookButtonClick}>
              Book
            </Button>
          </Col>
        </Row>
        {showModal && (
          <ModalReceipt
            screening={s.screening}
            totalPrice={s.totalPrice}
            selectedSeats={s.selectedSeats}
            onClose={() => setShowModal(false)}
          />
        )}
      </Container>
    </div>
  );
}
