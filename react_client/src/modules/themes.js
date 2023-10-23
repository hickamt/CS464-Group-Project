// Fetch crypto icon using the asset name
export const getCryptoIcon = function fetchCryptoImagePngIcon(asset) {
  return `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/${asset}.png`;
};

// Changes the text color base on the given value
// returning the class name for the text color
export const textColor = function bootstrapTextColor(value) {
  if (value > 0) {
    return "text-success";
  } else if (value < 0) {
    return "text-danger";
  } else {
    return "text-light";
  }
};