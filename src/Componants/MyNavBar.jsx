import { Card, Navbar, Button } from "react-bootstrap";

export function MyNavBar() {
  return (
    <>
      <Navbar className="navbar navbar-expand-lg bg-gradient navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span className="logo">Farah's Cinema</span>
          </a>
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" id="cenima-load" href="/">
                  Movies
                </a>
              </li>
            </ul>
            <Button
              className="cartBtn float-end bg-gradient btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <img
                id="shoppingCart"
                src="/movie-tickets.png"
                alt="shopping cart icon"
              />
            </Button>
          </div>
        </div>
      </Navbar>
      <Card
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <Card className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Cart
          </h5>
          <Button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></Button>
        </Card>
        <Card className="offcanvas-body"></Card>
      </Card>
    </>
  );
}
