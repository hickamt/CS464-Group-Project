import ReactLoading from "react-loading";

// Loading animation (GH)
export const spinAnimation = function reactSpinLoadingAnimation() {
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
export const getCryptoIcon = function fetchCryptoImagePngIcon(asset) {
  return `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${asset}.png`;
};

// Change text color based on value (GH)
export const textColor = function bootstrapTextColor(value) {
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
export const setValueToFixed = function setValueToFixedPrecision(value) {
  return value <= 1
    ? Number.parseFloat(value).toFixed(5)
    : Number.parseFloat(value).toFixed(2);
};

// Set percentage to (2) decimal places
export const setPercentageToFixed = function setPercentageValueFixedTwo(value) {
  return Number.parseFloat(value).toFixed(2);
};