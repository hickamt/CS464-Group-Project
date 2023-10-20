/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */

// import Card from "react-bootstrap/Card";
// import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import lcwRemainingCredits from "../../api/lcwRemainingCredits";

// Utilities
import { spinAnimation, sortHighLow } from "./styles/utility";

// CSS Styles
import "./styles/card.css";
import Row from "react-bootstrap/Row";
import buildCards from "./modules/buildCards";

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

export default function Cards() {
  // const [animation, setAnimation] = useState(true);
  const [userData, setUserData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [runEffect, setRunEffect] = useState(true);
  const [cryptoCardArray, setCryptoCardArray] = useState([]);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    console.log("Inside UseEffect()");
    lcwRemainingCredits();
    async function fetchData() {
      const expressData = await expressQueryAPI("remaining");
      const cryptoData = await lcwCryptoAPI();
      if (expressData && cryptoData) {
        combineData(expressData, cryptoData, setUserData);
        setCryptoCardArray(buildCards(userData));
        setIsData(true);
        // setAnimation(!animation);
      }
    }
    fetchData();
  }, [runEffect]);

  setTimeout(() => {
    // setAnimation(!animation);
    if (runEffect) setRunEffect(false);
    else setRunEffect(true);
  }, 180000); // timer set to 3 seconds

  return (
    <>
      {/* {animation
        ? spinAnimation() */}
      {isData && (
        <>
          <h1 className="card-title d-none">Crypto Assets</h1>
          {/* {<CryptoCard userData={userData} />} */}
          <Row className="media-row">{cryptoCardArray}</Row>

          {/* <BiLeftArrow className="arrow-left " onClick="" />
          <BiRightArrow className="arrow-right " onClick="" /> */}
        </>
      )}
    </>
  );
}
