const express = require("express");
const dotenv = require("dotenv").config('./.env');
const cors = require("cors");
const app = express();
const port = 5000;
const db = require("./config/db_config");
const transaction = require("./routes/transaction");
app.use(express.json());
app.use(cors());
app.use("/api/transaction", transaction);

db();
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
