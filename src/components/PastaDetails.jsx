import { useEffect, useState } from "react";
import { Badge, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DishComments from "./DishComments";

const PastaDetails = ({ menu }) => {
  // useParams quando eseguito ritorna un oggetto con tutti i parametri, specificati nelle rotte di App.jsx
  // questo oggetto contiene coppie chiave-valore all'interno
  const params = useParams();
  console.log("params", params);

  const navigate = useNavigate();

  const pastaId = params.pastaId;

  const [pasta, setPasta] = useState(null);

  useEffect(() => {
    const pastaObj = menu.find(dish => dish.id.toString() === pastaId);
    console.log("Pasta obj", pastaObj);

    if (pastaObj) {
      setTimeout(() => {
        setPasta(pastaObj);
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/menu");
      }, 1000);
    }
  }, []);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        {pasta ? (
          <Col xs={12} md={8}>
            <Image className="w-100" src={pasta.image} />
            <h1>{pasta.name}</h1>
            <p>{pasta.description}</p>
            <Badge bg="success">{pasta.price}€</Badge>
            <DishComments selectedPasta={pasta} />
          </Col>
        ) : (
          <Spinner animation="grow" variant="success" />
        )}
      </Row>
    </Container>
  );
};
export default PastaDetails;
