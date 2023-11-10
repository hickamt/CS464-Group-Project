
// fix digits to (5) decimal places if value is less than (1)
// otherwise, fix digits to (2) decimal places
export const setValueToFixed = function setValueToFixedPrecision(value) {
  if (!value) return 0.00; // handles zero value or NaN value
  return value <= 1
    ? Number.parseFloat(value).toFixed(5)
    : Number.parseFloat(value).toFixed(2);
};

// Set percentage to (2) decimal places
export const setPercentageToFixed = function setPercentageValueFixedTwo(value) {
  return Number.parseFloat(value).toFixed(2);
};