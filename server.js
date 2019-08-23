const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const dsteem = require("dsteem");
const blacklist = ["theycallmedan"];
const client = new dsteem.Client("https://api.steemit.com");
async function queryVotes(permlink, author) {
  const query = {
    tag: "",
    limit: 1,
    start_author: author,
    start_permlink: permlink,
    truncate_body: 1
  };
  return await client.database
    .getDiscussions("trending", query)
    .then(data => data[0].active_votes.map(list => list.voter))
    .catch(err => err);
}
function urlSplit(url) {
  let reqUrl = url.split("/").reverse();
  reqUrl[1] = reqUrl[1].substr(1); //substr @
  return reqUrl;
}
async function dataCheck(reqUrl) {
  let data = await queryVotes(reqUrl[0], reqUrl[1]);
  let block =
    Array.isArray(data) && data.some(voter => blacklist.includes(voter));
  return JSON.stringify({ block });
}

// http
//   .createServer(async (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.writeHead(200, { "Content-Type": "application/json" });

//     const reqUrl = urlSplit(req.url);
//     const end = await dataCheck(reqUrl);

//     res.end(end);
//   })
//   .listen(process.env.PORT || 3000, "0.0.0.0");
app.use(cors());
app.listen(3000, "0.0.0.0", () => {
  console.log("Server up");
});

app.get("/*", async (req, res) => {
  res.set("Content-Type", "application/json");
  //const { link } = req.params;
  //const link = "https://steemit.com/threespeak/@nicholasmerten/zyzaqibt";

  const link = req.params;

  const reqUrl = urlSplit(link[0]);
  const end = await dataCheck(reqUrl);

  res.send(end);
});
