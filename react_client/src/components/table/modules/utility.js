// Desc: Utility functions for table component

// Function: sumTotal
export const sumTotal = function totalGivenData(data, key) {
    let total = 0;
    data.forEach((item) => {
        total += item[key];
    });
    return total;
}