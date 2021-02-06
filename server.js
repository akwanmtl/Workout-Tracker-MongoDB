// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Port number
const PORT = process.env.PORT || 8080;

// Express
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGDB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Routes
app.use(require("./routes/api-routes.js"))
app.use(require("./routes/html-routes.js"))

// Start app
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}/`);
});