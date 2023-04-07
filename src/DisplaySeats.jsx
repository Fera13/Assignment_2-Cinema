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
import { useStates } from "./utilities/states";
import { useParams } from "react-router";
import { RolePick } from "./RolePick";

export function DisplaySeats() {
  const { id } = useParams();
  const s = useStates({
    screening: null,
    movie: null,
    seats: [],
    numOfPeople: 1,
    ticketTypes: [],
    selectedSeats: [],
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

  /*const handleTicketTypeChange = (index, e) => {
    const newTicketTypes = [...s.ticketTypes];
    newTicketTypes[index] = e.target.value;
    s.ticketTypes = newTicketTypes;
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(s.ticketTypes);
  };

  function toggleSeatSelection(seat) {
    // do nothing if occupied
    if (seat.occupied) {
      return;
    }
    seat.selected = !seat.selected;
    const getMyList = (prevSelectedSeats) => {
      const index = prevSelectedSeats.findIndex(
        (s) => s.seatNumber === seat.seatNumber
      );
      if (index >= 0) {
        const newSelectedSeats = [...prevSelectedSeats];
        newSelectedSeats.splice(index, 1);
        return newSelectedSeats;
      } else {
        const newSelectedSeats = [
          ...prevSelectedSeats,
          { seatNumber: seat.seatNumber, ticketType: "adult" },
        ];
        return newSelectedSeats;
      }
    };
    s.selectedSeats = getMyList(s.selectedSeats);
  }

  const renderTicketTypeSliders = () => {
    return <RolePick selectedSeats={s.selectedSeats} />;
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
              {s.seats.map((row) => (
                <>
                  <div className="row">
                    {row.map((seat) => (
                      <div
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
        <Row>
          {s.selectedSeats.length > 0 && (
            <Col xs={12} md={6}>
              {renderTicketTypeSliders()}
            </Col>
          )}
          <Col>
            <h4>
              {s.selectedSeats.length > 0 && (
                <Col xs={12} md={6}>
                  <h4 className="view-total"></h4>
                </Col>
              )}
            </h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
