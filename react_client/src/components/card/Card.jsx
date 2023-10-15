/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import expressQueryAPI from "../../api/expressQueryAPI";
// import react animation bars

// CSS Styles
import "./styles/card.css";

// Fetch crypto icon using 'asset' as the asset name
const getCryptoIcon = function fetchCryptoImagePngIcon(asset) {
  return `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${asset}.png`;
};

export default function ComponentOne() {
  const [assetData, setAssetData] = useState([]);
  const [isData, setIsData] = useState(false); // [false, true]
  const [animation, setAnimation] = useState(false);

  // call expressQueryAPI() to fetch data from server once
  useEffect(() => {
    setAnimation(true);
    expressQueryAPI("remaining", setAssetData, setIsData, setAnimation);
  }, []);

  return (
    <>
      {isData && (
        <>
          <h1 className="card-title d-none">Crypto Assets</h1>
          <Row className="media-row d-flex flex-nowrap overflow-scroll">
            {assetData.map((data, index) => (
              <Card key={index} className="media-card ">
                <Card.Img
                  className="card-img mx-auto"
                  alt="cryptocurrency"
                  variant="top"
                  src={getCryptoIcon(data.asset)}
                />
                <Card.Body className="">
                  <div className="card-grid">
                    <div className="value-type mx-auto">
                      <p className="card-text">Asset</p>
                      <p className="card-text">Qty</p>
                      <p className="card-text">Spot</p>
                      <p className="card-text">Value</p>
                      <p className="card-text">Day</p>
                      <p className="card-text">Week</p>
                      <p className="card-text">Month</p>
                    </div>
                    <div className="value mx-auto">
                      <p className="card-text">{data.asset.toUpperCase()}</p>
                      <p className="card-text">{Number.parseFloat(data.remaining).toFixed(3)}</p>
                      <p className="card-text">$ 1.12</p>
                      <p className="card-text">$ 2.24</p>
                      <p className="card-text">1.32%</p>
                      <p className="card-text">0.32%</p>
                      <p className="card-text">0.01%</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </>
      )}
    </>
  );
}
