/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import crypto_image from "../../assets/crypto.svg"

// Try to use a max of 6 cards for view
// and add <- to -> arrow scroll for view

export default function ComponentOne() {
  return (
    <>
      <h1 className="card-title d-none">Crypto Assets</h1>
      <Row xs={1} md={4} lg={6} className="g-6 mt-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Col key={index}>
            <Card bg="dark">
              <Card.Img
                className="text-center"
                alt="cryptocurrency"
                variant="top"
                src={crypto_image}
              />
              <Card.Body>
                <Card.Title>Asset Name</Card.Title>
                <Card.Text>
                  <p>Asset: BTC</p>
                  <p>Remaining: 1.00</p>
                  <p>Spot Price: $ 1.12</p>
                  <p>Value: $ 2.24</p>
                  <p>24HR: 1.32%</p>
                  <p>WK: 0.32%</p>
                  <p>MTH: 0.01%</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
