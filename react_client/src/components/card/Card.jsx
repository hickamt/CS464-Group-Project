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
  const [queryTime, setQueryTime] = useState(60000); // 60000 = 1 minute

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
      // setIsData(true);
      // setAnimation(false);
    }
  }, queryTime);

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
                      <p className="card-text text-center fs-4">
                        {data.asset.toUpperCase()}
                      </p>
                      <div className="card-grid">
                        <div className="value-type mx-auto">
                          <p className="card-text">Qty</p>
                          <p className="card-text">Spot</p>
                          <p className="card-text">Value</p>
                          <p className="card-text">Hour</p>
                          <p className="card-text">Day</p>
                          <p className="card-text">Week</p>
                          <p className="card-text">Month</p>
                        </div>
                        <div className="value mx-auto">
                          <p className="card-text">
                            {Number.parseFloat(data.remaining).toFixed(3)}
                          </p>
                          <p className="card-text">
                            $ {Number.parseFloat(data.spot).toFixed(3)}
                          </p>
                          <p className="card-text">
                            $ {Number.parseFloat(data.value).toFixed(3)}
                          </p>
                          <p className={`card-text ${textColor(data.hour)}`}>
                            {Number.parseFloat(data.hour).toFixed(3)}%
                          </p>
                          <p className={`card-text ${textColor(data.day)}`}>
                            {Number.parseFloat(data.day).toFixed(3)}%
                          </p>
                          <p className={`card-text ${textColor(data.week)}`}>
                            {Number.parseFloat(data.week).toFixed(3)}%
                          </p>
                          <p className={`card-text ${textColor(data.month)}`}>
                            {Number.parseFloat(data.month).toFixed(3)}%
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
