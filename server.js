const express = require("express");
const cors = require("cors");
const app = express();
const dsteem = require("dsteem");
const blockerRoutes = require("./routes/blocker.js");

app.use(cors());
app.listen(3000, "0.0.0.0", () => {
  console.log("Server up");
});

blockerRoutes(app, dsteem);
