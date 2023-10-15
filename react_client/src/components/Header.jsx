/* eslint-disable react/no-unknown-property */
/**
 * LiveCoinWatch Widget for Coin/Token Ticker
 * Source: https://www.livecoinwatch.com/widgets
 */
import Helmet from 'react-helmet'

export default function Header() {
  return (
    <>
    {/* Helmet library is required to run widget script */}
    <Helmet >
        <script
          defer
          src="https://www.livecoinwatch.com/static/lcw-widget.js"></script>
    </Helmet>
    <div
      className="livecoinwatch-widget-5 mx-auto"
      lcw-base="USD"
      lcw-color-tx="#ffffff"
      lcw-marquee-1="coins"
      lcw-marquee-2="none"
      lcw-marquee-items="30"
      lcw-platform="MATIC"></div>
    
    </>
  );
}
