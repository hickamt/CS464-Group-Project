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
// import lcwRemainingCredits from "../../api/lcwRemainingCredits";

// Loading animation (GH)
const spinAnimation = function reactSpinLoadingAnimation() {
  return (
    <ReactLoading
      className="mx-auto"
      type="spin"
      color="#4a4537"
      height={100}
      width={100}
    />
  );
};

// Fetch crypto icon using 'asset' as the asset name (abstract this function)
const getCryptoIcon = function fetchCryptoImagePngIcon(asset) {
  return `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${asset}.png`;
};

// Change text color based on value (GH)
const textColor = function bootstrapTextColor(value) {
  if (value > 0) {
    return "text-success";
  } else if (value < 0) {
    return "text-danger";
  } else {
    return "text-light";
  }
};

// fix digits to (5) decimal places if value is less than (1)
// otherwise, fix digits to (2) decimal places
const setValueToFixed = function setValueToFixedPrecision(value) {
  return value <= 1
    ? Number.parseFloat(value).toFixed(5)
    : Number.parseFloat(value).toFixed(2);
};

// Set percentage to (2) decimal places
const setPercentageToFixed = function setPercentageValueFixedTwo(value) {
  return Number.parseFloat(value).toFixed(2);
};

// Sort array from greatest to least (GH)
const sortHighLow = function sortArrayGreatestToLeast(array) {
  return array.sort((a, b) => {
    return b.value - a.value;
  });
};

// Sort array from least to greatest (GH)
// const sortLowHigh = function sortArrayLeastToGreatest(array) {
//   return array.sort((a, b) => {
//     return a.value - b.value;
//   });
// };

// Combine userData and cryptoData into one array (GH)
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
  setData(sortHighLow(temp));
};

export default function ComponentOne() {
  const [data, setData] = useState([]);
  const [expressData, setExpressData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [animation, setAnimation] = useState(true);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    async function fetchData() {
      const userData = await expressQueryAPI("remaining");
      setExpressData(userData);
      const cryptoData = await lcwCryptoAPI();
      if (userData && cryptoData) {
        combineData(userData, cryptoData, setData);
        setIsData(true);
        setAnimation(false);
      }
    }
    fetchData();
  }, []);

  // fetch updated lcwCryptoAPI data every 60 seconds
  setTimeout(async () => {
    const cryptoData = await lcwCryptoAPI();
    if (expressData && cryptoData) {
      combineData(expressData, cryptoData, setData);
    }
  }, 60000);

  return (
    <>
      {animation
        ? spinAnimation()
        : isData && (
            <>
              <h1 className="card-title d-none">Crypto Assets</h1>
              <Row className="media-row d-flex flex-nowrap">
                {data.map((data, index) => (
                  <Card key={index} className="media-card ">
                    <Card.Img
                      className="card-img mx-auto"
                      alt="cryptocurrency"
                      variant="top"
                      src={getCryptoIcon(data.asset)}
                    />
                    <Card.Body className="card-body">
                      <p className="card-text text-center fs-5">
                        {data.asset.toUpperCase()}
                      </p>
                      <div className="card-text-body">
                        <div className="value-type">
                          <p className="card-text">Qty</p>
                          <p className="card-text">Spot</p>
                          <p className="card-text">Value</p>
                          <p className="card-text">Hour</p>
                          <p className="card-text">Day</p>
                          <p className="card-text">Week</p>
                          <p className="card-text">Month</p>
                        </div>
                        <div className="value">
                          <p className="card-text p">
                            {setValueToFixed(data.remaining)}
                          </p>
                          <p className="card-text p">
                            ${setValueToFixed(data.spot)}
                          </p>
                          <p className="card-text p">
                            ${setValueToFixed(data.value)}
                          </p>
                          <p className={`card-text p ${textColor(data.hour)}`}>
                            {setPercentageToFixed(data.hour)}%
                          </p>
                          <p className={`card-text p ${textColor(data.day)}`}>
                            {setPercentageToFixed(data.day)}%
                          </p>
                          <p className={`card-text p ${textColor(data.week)}`}>
                            {setPercentageToFixed(data.week)}%
                          </p>
                          <p className={`card-text p ${textColor(data.month)}`}>
                            {setPercentageToFixed(data.month)}%
                          </p>
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
