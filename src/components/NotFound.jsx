import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  // l'hook useNavigate(), una volta eseguito, produce una funzione.
  // dentro la variabile navigate ora abbiamo una funzione da poter usare per effettuare un cambio pagina PROGRAMMATICO (senza l'uso di <Link>)

  // Non possiamo mai chiamare direttamente useNavigate() sperando che ci produca un cambio pagina
  // Sarà la funzione da lui ritornata ad avere questa facoltà!
  const handlePageChange = () => {
    navigate("/prenotazioni");
    // questo ci permette di definire un cambio pagina in un punto predeterminato all'interno delle logiche del nostro componente,
    // quindi non più limitato al solo ambito del JSX
  };

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        <Col xs={12} md={8}>
          <h1 className="display-3 text-primary">404 — Risorsa non trovata!</h1>
          <p className="lead">La pagina che stavi cercando non è disponibile.</p>

          {/* METODO CANONICO */}
          <Link to="/">Torna alla pagina principale</Link>

          {/* METODO PROGRAMMATICO (il canonico sarebbe preferibile in questo caso) */}
          <Button variant="dark" className="d-block mx-auto mt-4" onClick={handlePageChange}>
            Vai a prenotazioni
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
