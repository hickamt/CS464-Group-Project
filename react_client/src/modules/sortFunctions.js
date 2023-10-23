
// Sort array from greatest to least (GH)
export const sortValueHL = function sortArrayFromHighToLowByValue(array) {
  return array.sort((a, b) => {
    return b.value - a.value;
  });
};

// Sort array from least to greatest (GH)
export const sortValueLH = function sortArrayFromLowtoHighByValue(array) {
  return array.sort((a, b) => {
    return a.value - b.value;
  });
};
