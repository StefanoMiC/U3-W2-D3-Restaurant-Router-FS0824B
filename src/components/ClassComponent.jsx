import { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import withRouter from "../helpers/withRouter";
import { Link } from "react-router-dom";

class ClassComponent extends Component {
  handlePageChange = () => {
    this.props.navigate("/menu");
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={8} xl={6}>
            <h1>
              {this.props.title} Class Component, renderizzato con id dinamico: {this.props.params.dynamicId}, path:{this.props.location.pathname}
            </h1>
            <Link to="/">Val alla Homepage</Link>

            <Button variant="primary" className="d-block my-5" onClick={this.handlePageChange}>
              Vai al menu
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(ClassComponent);
