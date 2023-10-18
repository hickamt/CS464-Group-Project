/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useEffect, useState, useRef } from "react";
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
// import lcwRemainingCredits from "../../api/lcwRemainingCredits";

// Utilities
import {
  spinAnimation,
  getCryptoIcon,
  textColor,
  setValueToFixed,
  setPercentageToFixed,
  sortHighLow,
} from "./styles/utility";

// CSS Styles
import "./styles/card.css";

// Combine userData and cryptoData into one array (GH)
const combineData = function combineDataWithCryptoData(
  userData,
  cryptoData,
  setData,
  setAnimation
) {
  setAnimation(true);
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
  setAnimation(false);
};

export default function Cards() {
  const [userData, setUserData] = useState([]);
  const [expressData, setExpressData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [animation, setAnimation] = useState(true);
  const cardRef = useRef(null); // reference to the card carousel left/right btns

  const [cardCarousel, setCardCarousel] = useState([]);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    console.log("Inside UseEffect()")
    async function fetchData() {
      const userData = await expressQueryAPI("remaining");
      const cryptoData = await lcwCryptoAPI();
      if (userData && cryptoData) {
        setExpressData(userData);
        combineData(userData, cryptoData, setUserData, setAnimation);
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
      combineData(expressData, cryptoData, setUserData, setAnimation);
    }
  }, 180000); // timer set to 3 minutes

  const scrollCardLeft = () => {
    const sLeft = (cardRef.current.scrollLeft -= 175); // adjust the scroll value as needed
    scrollTo({
      left: sLeft,
      behavior: "smooth",
    });
  };

  const scrollCardRight = () => {
    const sRight = (cardRef.current.scrollLeft += 175); // adjust the scroll value as needed
    scrollTo({
      left: sRight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {animation
        ? spinAnimation()
        : isData && (
            <>
              <h1 className="card-title d-none">Crypto Assets</h1>
              <Row className="media-row d-flex flex-nowrap" ref={cardRef}>
                {userData.map((data, index) => (
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
              <BiLeftArrow className="arrow-left " onClick={scrollCardLeft} />
              <BiRightArrow
                className="arrow-right "
                onClick={scrollCardRight}
              />
            </>
          )}
    </>
  );
}
