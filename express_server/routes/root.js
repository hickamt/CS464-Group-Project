const express = require("express");
const router = express.Router();
const path = require("path");

// First Argument for File Path is using RegEx
// ^/$ | /index(.html)? MEANING
/*
   ^ character $ requires the character exist in the string
   | (pipe) is the OR logic operator to allow further Regular Expressions
   /index states that the forward slash and string 'index' are required
   (.html)? the characters within the () parentheses are a series of apttern elements
   and the ? question mark indicates that the characters within the () parentheses 
   are optional.
   All together it reads:
   Send the file 'index.html' if the GET request url ends in a forward slash '/'
   OR
   if the URL includes a forwardslash and 'index' string /index
   OR
   if the URL includes a forwardslash and 'index.html' string /index.html
*/
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;

// How To Redirect GET Request from 'old' to 'new' page
// router.get("/old-page(.html)?", (req, res) => {
//   res.redirect(301, "new-page.html"); // sends a 302 response code by default
// });