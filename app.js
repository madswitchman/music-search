//Fetch API is used to simplify HTTP calls
const fetch = require("node-fetch");
//Express adds robustness to vanilla Node.js
const express = require("express");
//BodyParser allows to parse queries with ease
const bodyParser = require("body-parser");
//Default port for Node backend
const port = 3000;

//middleware
const app = express();
//Set up backend to parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
//Set up backend to parse JSON
app.use(bodyParser.json());
app.use(function (req, res, next) {
  //Set headers to avoid CORS errors
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//end of middleware
//
//API Call for specific artist details
app.get("/artistDetails", (req, res) => {
  let searchText = req.query.q;

  let artistSearchUrl =
    "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + searchText;
  let settings = { method: "Get" };
  const encodedURI = encodeURI(artistSearchUrl);

  return fetch(encodedURI, settings)
    .then((res) => res.json())
    .then((json) => {
      console.log(encodedURI);
      return res.send(json);
    })
    .catch((err) => console.error(err));
});
//API Call for specific song details
app.get("/songDetails", (req, res) => {
  let searchText = req.query.q;
  let songTitle = req.query.t;

  let artistSearchUrl =
    "https://www.theaudiodb.com/api/v1/json/1/searchtrack.php?s=" +
    searchText +
    "&t=" +
    songTitle;
  let settings = { method: "Get" };
  const encodedURI = encodeURI(artistSearchUrl);

  return fetch(encodedURI, settings)
    .then((res) => res.json())
    .then((json) => {
      console.log(encodedURI);
      return res.send(json);
    })
    .catch((err) => console.error(err));
});
//API Call for generic artist search
app.get("/searchArtist", (req, res) => {
  let searchText = encodeURI(req.query.q);
  let limit = "10";

  let artistSearchUrl =
    "https://api.deezer.com/search/artist?q=" + searchText + "&limit=" + limit;
  let settings = { method: "Get" };
  const encodedURI = encodeURI(artistSearchUrl);

  return (
    fetch(encodedURI, settings)
      .then((res) => res.json())
      .then((json) => {
        console.log(encodedURI);
        return res.send(json);
      })
      //Try to see if we can send the error to the client
      //For Angular Modeling purposes
      .catch((err) => {
        console.error(err);
        return res.send(err);
      })
  );
});
//API Call for generic song/track search
app.get("/searchSong", (req, res) => {
  let searchText = req.query.q;
  let limit = "10";

  let artistSearchUrl =
    "https://api.deezer.com/search?q=track:'" + searchText + "'&limit=" + limit;
  let settings = { method: "Get" };
  const encodedURI = encodeURI(artistSearchUrl);

  return (
    fetch(encodedURI, settings)
      .then((res) => res.json())
      .then((json) => {
        console.log(encodedURI);
        return res.send(json);
      })
      //Try to see if we can send the error to the client
      //For Angular Modeling purposes
      .catch((err) => {
        console.error(err);
        return res.send(err);
      })
  );
});
//Log to the console when the backend is up and running
app.listen(port, (req, res) => {
  console.log(`Music Search backend listening at http://localhost:${port}`);
});
