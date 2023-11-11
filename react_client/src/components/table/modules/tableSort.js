/**
 * Using the array table data, the following functions will sort the array
 * based on the 'key' value string. This string is the name of an array.propertyKey
 * Only array.asset is a string, all other array properties are numbers 
 * @param {dataArray} array 
 * @param {useState()} setTableData 
 * @param {string} key 
 */

// Sort array from greatest to least based on object number value
const sortNumHL = function sortArrayByNumberValueHighToLow(array, setTableData, key) {
  let temp = array.sort((a, b) => {
    return b[key] - a[key];
  });
  console.log("Inside sortNumberHL (key)", key, " (temp)", temp);
  setTableData([...temp]);
};

// Sort array from least to greatest based on object number value
const sortNumLH = function sortArrayByNumberValueLowToHigh(array, setTableData, key) {
  let temp = array.sort((a, b) => {
    return a[key] - b[key];
  });
  console.log("Inside sortNumberLH (key)", key, " (temp)", temp);
  setTableData([...temp])
};

// Sort array from greatest to least based on object asset name
const sortCharHL = function sortArrayByCharacterValueHighToLow(array, setTableData, key) {
  console.log("Inside sortCharHL (key)", key);
  let temp = array.sort((a, b) => {
    return b[key].localeCompare(a[key]);
  });
  setTableData([...temp]);
};

// Sort array from least to greatest based on object asset name
const sortCharLH = function sortArrayByCharacterValueLowToHigh(array, setTableData, key) {
  console.log("Inside sortCharLH (key)", key);
  let temp = array.sort((a, b) => {
    return a[key].localeCompare(b[key]);
  });
  setTableData([...temp]);
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
