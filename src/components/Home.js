import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Use public/Assets/me.jpg and public/Assets/obiwan.png for image sources
import Buzzwords from "./Buzzwords";
import BlurText from "./BlurText";
import CowSayBubble from "./CowSayBubble";
//import { FadeIn, HighlightText } from "reactbits"; // adjust imports to match your setup

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row className="justify-content-center">
            <Col style={{ textAlign: "center", margin: "0 auto" }}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "fit-content", margin: "0 auto 1.5rem auto", gap: 0, position: 'relative' }}>
                <CowSayBubble
                  message="Hello!"
                />
                <img
                  src={process.env.PUBLIC_URL + "/Assets/me.jpg"}
                  alt="bryson"
                  className="img-fluid"
                  style={{
                    maxHeight: "180px",
                    width: "auto",
                    display: "block",
                    borderRadius: "16px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.10)"
                  }}
                />
              </div>
              <h1 className="heading-name" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', marginBottom: 0 }}>
                <span style={{ fontWeight: 400 }}>I'm</span>
                <strong className="main-name" style={{ fontWeight: 500, marginLeft: 8 }}>Dr. Bryson Cale</strong>
              </h1>
              <div style={{ fontSize: "1.2em", fontWeight: 400, margin: "18px 0 0 0", lineHeight: 1.5, fontFamily: 'inherit' }}>
                I am a <span style={{ fontWeight: 600 }}>Research Data Analyst</span><br />
                at the <span style={{ fontWeight: 600 }}>University of California San Diego</span><br />
                in the <span style={{ fontWeight: 600 }}>
                  <a
                    href="https://oirlab.ucsd.edu/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="MyEmphasisLink"
                    style={{ textDecoration: "none", color: "#cd5ff8" }}
                  >
                    Optical Infrared Laboratory
                  </a>
                </span>
              </div>
              <div style={{ padding: 32, textAlign: "center", width: "100%", maxWidth: 600, margin: "0 auto", fontFamily: 'inherit' }}>
                <span style={{ fontFamily: 'unset' }}><Buzzwords /></span>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
