
// Sort array from greatest to least based on object.value
export const sortValueHL = function sortArrayFromHighToLowByValue(array) {
  return array.sort((a, b) => {
    return b.value - a.value;
  });
};

// Sort array from least to greatest based on object.value
export const sortValueLH = function sortArrayFromLowtoHighByValue(array) {
  return array.sort((a, b) => {
    return a.value - b.value;
  });
};
