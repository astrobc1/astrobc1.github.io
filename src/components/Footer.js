import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row className="justify-content-center text-center">
        <Col md="auto">
          <h3>Designed and Developed by Bryson Cale</h3>
        </Col>
        <Col md="auto">
          <h3>Copyright © {year} BLC</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
