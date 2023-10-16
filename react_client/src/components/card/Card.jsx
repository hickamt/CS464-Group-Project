/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import ReactLoading from "react-loading";
// CSS Styles
import "./styles/card.css";

// Remember to abstract spin animation to module file
const spinAnimation = function reactSpinLoadingAnimation() {
  return (
    <ReactLoading
      className="mx-auto"
      type="spin"
      color="#1E762E"
      height={100}
      width={100}
    />
  );
};

// Fetch crypto icon using 'asset' as the asset name (abstract this function)
const getCryptoIcon = function fetchCryptoImagePngIcon(asset) {
  return `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${asset}.png`;
};

function p_className(value) {
  console.log("Percentage: ", value);

  if (value > 0) {
    return "card-text text-success";
  } else if (value < 0) {
    return "card-text text-danger";
  } else {
    return "card-text text-light";
  }
}

const sortArray = (array) => {
  return array.sort((a, b) => {
    return b.value - a.value;
  })
}

const combineData = function combineDataWithCryptoData(
  userData,
  cryptoData,
  setData
) {
  const temp = [];
  userData.map((data) => {
    const { asset, remaining } = data;
    const { rate, volume, delta } = cryptoData.find(
      (data) => data.code.toUpperCase() === asset.toUpperCase()
    );
    temp.push({
      asset: asset,
      remaining: remaining,
      spot: rate,
      value: rate * remaining,
      volume: volume,
      day: (delta.day - 1) * 100,
      hour: (delta.hour - 1) * 100,
      week: (delta.week - 1) * 100,
      month: (delta.month - 1) * 100,
    });
  });
  setData(sortArray(temp));
};

export default function ComponentOne() {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false); // [false, true]
  const [animation, setAnimation] = useState(true); // [false, true

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const userData = await expressQueryAPI("remaining");
      const cryptoData = await lcwCryptoAPI();
      if (userData && cryptoData) {
        combineData(userData, cryptoData, setData);
        setIsData(true);
        setAnimation(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {animation
        ? spinAnimation()
        : isData && (
            <>
              <h1 className="card-title d-none">Crypto Assets</h1>
              <Row className="media-row d-flex flex-nowrap overflow-scroll">
                {data.map((data, index) => (
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
                          <p className="card-text">
                            {data.asset.toUpperCase()}
                          </p>
                          <p className="card-text">
                            {Number.parseFloat(data.remaining).toFixed(3)}
                          </p>
                          <p className="card-text">
                            $ {Number.parseFloat(data.spot).toFixed(3)}
                          </p>
                          <p className="card-text">
                            $ {Number.parseFloat(data.value).toFixed(3)}
                          </p>
                          <p className={p_className(data.day)}>{Number.parseFloat(data.day).toFixed(3)}%</p>
                          <p className={p_className(data.week)}>{Number.parseFloat(data.week).toFixed(3)}%</p>
                          <p className={p_className(data.month)}>{Number.parseFloat(data.month).toFixed(3)}%</p>
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
