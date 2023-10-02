

/**
 * General function to console response errors
 * @param error that the function recieved
 * @param file_path const file_path = require("path").resolve(__dirname);
 * @param statement is a string literal for the specific error 
 */
function consoleError(error, file_path, statement) {
  console.error("\nERROR FILE PATH: ", file_path, statement, error);
}

module.exports = {
  consoleError,
}