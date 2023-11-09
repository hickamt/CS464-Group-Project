/**
 * Bootstrap 5.0 Cards: https://react-bootstrap.netlify.app/docs/components/cards/
 * Bootstrap 5.0 Grid: https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row
 */

// React and build modules
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import buildCards from "./modules/buildCards";
import combineData from "./modules/combineData";
import Card from "react-bootstrap/Card";

// API
import expressQueryAPI from "../../api/expressQueryAPI";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import lcwRemainingCredits from "../../api/lcwRemainingCredits";

// Styles and Animation
import "./styles/card.css";
import SpinAnimation from "../animation/Animation";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const goLeft = function decrementCardIndex(cardIndex, setCardIndex) {
  if (cardIndex > 0) {
    setCardIndex(cardIndex - 1);
  }
};

const goRight = function incrementCardIndex(
  arrayLength,
  cardIndex,
  setCardIndex
) {
  if (cardIndex < arrayLength - 1) {
    setCardIndex(cardIndex + 1);
  }
};

export default function Cards() {
  const [cardIndex, setCardIndex] = useState(0);
  const [maxViews, setMaxViews] = useState(6); // still need to implement a 'setMaxViews' function
  const [userData, setUserData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [runEffect, setRunEffect] = useState(true);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    console.log("Inside UseEffect()");
    lcwRemainingCredits();
    async function fetchData() {
      const expressData = await expressQueryAPI("remaining");
      const cryptoData = await lcwCryptoAPI();
      if (expressData && cryptoData) {
        combineData(expressData, cryptoData, setUserData);
        setIsData(true);
      }
    }
    fetchData();
  }, [runEffect]);

  setTimeout(() => {
    setRunEffect(!runEffect);
  }, 180000); // timer set to 3 seconds

  if (!isData) {
    return <SpinAnimation />;
  }

  return (
    <>
      {isData && (
        <>
          <h1 className="card-title d-none">Crypto Assets</h1>

          {cardIndex > 0 && (
            <Card className="arrow-card">
              <BiLeftArrow
                className="arrow-left"
                onClick={() => goLeft(cardIndex, setCardIndex)}
              />
            </Card>
          )}

          <Row className="media-row">
            {buildCards(userData, cardIndex, maxViews)}
          </Row>

          {cardIndex !== userData.length - 1 && (
            <Card className="arrow-card">
              <BiRightArrow
                className="arrow-right"
                onClick={() =>
                  goRight(userData.length, cardIndex, setCardIndex)
                }
              />
            </Card>
          )}
        </>
      )}
    </>
  );
}
