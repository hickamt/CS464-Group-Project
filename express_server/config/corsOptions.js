const allowedOrigins = require("./allowedOrigins");

// corsOptions function used in the /server.js file
const corsOptions = {
  origin: (origin, callback) => {
    // origin: is our object
    // : (origin, ...) this is the browser origin of the request
    // the first arg searches our whitelist
    // the || !origin, allows cors localhost access to requests NOTE: remove (!origin) before deployment
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
