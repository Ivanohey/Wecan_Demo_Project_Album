const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Routes
require('./App/routes/auth.routes')(app);
require('./App/routes/albums.routes')(app);

//On écoute sur localhost port 8080
const PORT = process.env.PORT || 8080;
module.exports = app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));