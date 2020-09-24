const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware
// app.use(express.static(__dirname, "/dist/music-search"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/music-search/index.html"));
// });

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.get("/test", (req, res) => {
  res.send({ hello: "world..again" });
});

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
  //return res.send({ hello: artistSearchUrl });
});

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

app.get("/searchArtist", (req, res) => {
  let searchText = encodeURI(req.query.q);
  let limit = "10";

  let artistSearchUrl =
    "https://api.deezer.com/search/artist?q=" + searchText + "&limit=" + limit;
  //let artistSearchUrl = "https://api.deezer.com/search?q=eminem&limit=5";
  let settings = { method: "Get" };
  const encodedURI = encodeURI(artistSearchUrl);

  //let newSearchUrl = artistSearchURL + ""; //parsed query
  return fetch(encodedURI, settings)
    .then((res) => res.json())
    .then((json) => {
      console.log(encodedURI);
      return res.send(json);
    })
    .catch((err) => console.error(err));
});

app.get("/searchSong", (req, res) => {
  let searchText = req.query.q;
  let limit = "10";

  let artistSearchUrl =
    "https://api.deezer.com/search?q=track:'" + searchText + "'&limit=" + limit;
  //let artistSearchUrl = "https://api.deezer.com/search?q=eminem&limit=5";
  let settings = { method: "Get" };
  const encodedURI = encodeURI(artistSearchUrl);

  //let newSearchUrl = artistSearchURL + ""; //parsed query
  return fetch(encodedURI, settings)
    .then((res) => res.json())
    .then((json) => {
      console.log(encodedURI);
      return res.send(json);
    })
    .catch((err) => console.error(err));
});

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
