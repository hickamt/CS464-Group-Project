/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import crypto_image from "../../assets/crypto.svg";

// CSS Styles (using grid for Card.Text > children)
import "./styles/card.css";

// Try to use a max of 6 cards for view
// and add <- to -> arrow scroll for view

export default function ComponentOne() {
  return (
    <>
      <h1 className="card-title d-none">Crypto Assets</h1>
      {/* <Row s={1} md={3} lg={4} xl={6} className="media-card mt-2"> */}
      <Row className="media-scroll snaps-inline mt-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <Col key={index}>
            <Card className="media-element" bg="dark">
              <Card.Img
                className="card-img"
                alt="cryptocurrency"
                variant="top"
                src={crypto_image}
              />
              <Card.Body>
                {/* <Card.Title className="text-center">Asset Name</Card.Title> */}
                <Card.Text>
                  <div className="card-grid">
                    <div className="value-type">
                      <div>Asset</div>
                      <div>Qty</div>
                      <div>Spot</div>
                      <div>Value</div>
                      <div>Day</div>
                      <div>Week</div>
                      <div>Month</div>
                    </div>
                    <div className="value">
                      <div>BTC</div>
                      <div>1.0000</div>
                      <div>$ 1.12</div>
                      <div>$ 2.24</div>
                      <div>1.32%</div>
                      <div>0.32%</div>
                      <div>0.01%</div>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
