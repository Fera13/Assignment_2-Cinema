import { useState, useEffect } from "react";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router";

export function ViewMoreInfo() {
  const { id } = useParams();
  const [movies, setMovies] = useState({});
  useEffect(() => {
    (async () => {
      const movie = await (await fetch(`/api/movies?id=${id}`)).json();
      const screenTimes = await (
        await fetch(`/api/screenings?movieId=${id}`)
      ).json();
      movie[0].screenTimes = screenTimes;
      setMovies(movie[0]);
    })();
  }, []);

  return (
    <Container
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog custom-modal d-flex align-items-center justify-content-center">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Movie Description
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="container">
            <div className="row description-row">
              <div className="col col-md-3 col-sm-12">
                <img
                  className="dec-image object-fit-cover photo mb-4 border rounded-4 border-dark-subtle"
                  src=""
                />
                <section id="movie-info">
                  <Container>
                    <Row>
                      <Col>
                        <p>Hi</p>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </div>
              <div className="col col-md-9 col-sm-12">
                <p className="rounded" id="description"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
