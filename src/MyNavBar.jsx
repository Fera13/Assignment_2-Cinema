import { Card, Row, Col, Navbar, Container, Button } from "react-bootstrap";

export function MyNavBar() {
  console.log("Hello");
  return (
    <Navbar className="navbar navbar-expand-lg bg-primary bg-gradient navbar-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span class="logo">Farah's BookShop</span>
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
              <a className="nav-link" aria-current="page" href="/">
                Start Page
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="bookshopload" href="/shop">
                Buy books
              </a>
            </li>
          </ul>
          <Button
            className="cartBtn rounded float-end bg-primary bg-gradient"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <img
              id="shoppingCart"
              src="/shopping-cart.png"
              alt="shopping cart icon"
            />
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
