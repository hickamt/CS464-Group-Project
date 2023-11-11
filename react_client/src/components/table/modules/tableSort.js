// Sort array from greatest to least based on object number value
const sortNumHL = function sortArrayByNumberValueHighToLow(array, setTableData, key) {
  console.log("Inside sortValueHL (key)", key);
  let temp = array.sort((a, b) => {
    return b[key] - a[key];
  });
  setTableData(temp);
};

// Sort array from least to greatest based on object number value
const sortNumLH = function sortArrayByNumberValueLowToHigh(array, setTableData, key) {
  console.log("Inside sortValueLH (key)", key);
  let temp = array.sort((a, b) => {
    return a[key] - b[key];
  });
  setTableData(temp)
};

// Sort array from greatest to least based on object asset name
const sortCharHL = function sortArrayByCharacterValueHighToLow(array, setTableData, key) {
  console.log("Inside sortCharHL (key)", key);
  let temp = array.sort((a, b) => {
    return b[key].localeCompare(a[key]);
  });
  setTableData(temp);
};

// Sort array from least to greatest based on object asset name
const sortCharLH = function sortArrayByCharacterValueLowToHigh(array, setTableData, key) {
  console.log("Inside sortCharLH (key)", key);
  let temp = array.sort((a, b) => {
    return a[key].localeCompare(b[key]);
  });
  setTableData(temp);
};

export const filterArray = function filterArrayByValue(
  sortHighLow,
  setSortHighLow,
  tableData,
  setTableData,
  headerName
) {
  switch (headerName) {
    case "asset":
      if (sortHighLow) {
        sortCharLH(tableData, setTableData, headerName);
      } else {
        sortCharHL(tableData, setTableData, headerName);
      }
      break;
    default:
      if (sortHighLow) {
        sortNumLH(tableData, setTableData, headerName);
      } else {
        sortNumHL(tableData, setTableData, headerName);
      }
      break;
  }
  setSortHighLow(!sortHighLow);
};
