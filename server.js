const express = require("express");
const cors = require("cors");

console.log("bruh");

const app = express();

app.use(cors());
/*
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors({
  origin: "http://localhost:3031"
}));

app.use(cors(corsOptions));
*/
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync( { alter: true } )
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gymbro!" });
});

require("./app/routes/record.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3031;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});