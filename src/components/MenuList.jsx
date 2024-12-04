import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuList = ({ menu }) => {
  return (
    <Container>
      {menu.map(dish => (
        <Row className="justify-content-center my-3" key={`dish-${dish.id}`}>
          <Col xs={12} md={8} lg={4}>
            <Card>
              <Card.Img variant="top" src={dish.image} />
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>
                  {dish.description}
                  <Badge bg="info" className="text-bg-info ms-2">
                    {dish.price}€
                  </Badge>
                </Card.Text>
                <Link to={"/menu/dettagli/" + dish.id} className="btn btn-dark d-block">
                  Vai a {dish.name}
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default MenuList;
