import { Container, Nav, Navbar } from "react-bootstrap";
import {
  // Link,
  NavLink
  // useLocation
} from "react-router-dom";
// questo componente sta operando un RETURN IMPLICITO (avendo omesso le graffe)
const TopBar = props => {
  // const location = useLocation();

  // const checkPath = path => (location.pathname === path ? "active" : "");

  console.log("TOPBAR RENDER");
  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">EpicStaurant — {props.claim}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* METODO INLINE */}
            {/* <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
              Home
            </Link> */}

            {/* METODO ESTERNO */}
            {/* <Link className={`nav-link ${checkPath("/")}`} to="/">
              Home
            </Link>
            <Link className={`nav-link ${checkPath("/prenota-tavolo")}`} to="/prenota-tavolo">
              Prenota Tavolo
            </Link>
            <Link className={`nav-link ${checkPath("/prenotazioni")}`} to="/prenotazioni">
              Prenotazioni
            </Link> */}

            {/* METODO AVANZATO */}
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/menu">
              Menu
            </NavLink>
            <NavLink className="nav-link" to="/prenota-tavolo">
              Prenota Tavolo
            </NavLink>
            <NavLink className="nav-link" to="/prenotazioni">
              Prenotazioni
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default TopBar;
