const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const routes = require("./routes/route");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBURL)
  .then(() => console.log("DB CONNNECTED")).catch(error => console.log(error));


app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`app is lestening on http://localhost:${port}`);
});
