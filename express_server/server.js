const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5523;
const cors = require("cors");
// const corsOptions = require("./config/corsOptions");

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* CURRENT ENDPOINTS 'local_state' or 'queries' */
app.use("/api/local_state", require("./routes/api/local_state"));
app.use("/api/queries", require("./routes/api/queries"));

// Catch all for page request errors
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "Peugeot404.jpg"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
