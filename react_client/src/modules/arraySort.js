// Sort array from greatest to least based on object.value
export const sortNumHL = function sortArrayByNumberValueHighToLow(
  array,
  key,
) {
  console.log("Inside sortValueHL (key)", key);
  return array.sort((a, b) => {
    return b[key] - a[key];
  });
};

// Sort array from least to greatest based on object.value
export const sortNumLH = function sortArrayByNumberValueLowToHigh(array, key) {
  console.log("Inside sortValueLH (key)", key);
  return array.sort((a, b) => {
    return a[key] - b[key];
  });
};
