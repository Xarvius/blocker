const http = require("http");
const port = process.env.PORT || 3000;
const dsteem = require("dsteem");
let opts = {};

//connect to production server
opts.addressPrefix = "STM";
opts.chainId =
  "0000000000000000000000000000000000000000000000000000000000000000";
//connect to server which is connected to the network/production
const client = new dsteem.Client("https://api.steemit.com");
async function queryVotes(permlink, author) {
  const query = {
    tag: "",
    limit: 1,
    start_author: author,
    start_permlink: permlink,
    truncate_body: 1
  };
  return await client.database.getDiscussions("trending", query).catch(err => {
    console.log(err);
  });
}
const user = ["bue", "nate-atkins"];
http
  .createServer(async (req, res) => {
    let reqUrl;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    if (req.url != "/favicon.ico") {
      reqUrl = req.url.split("/").reverse();
      reqUrl[1] = reqUrl[1].substr(1);
    }
    let data;
    let end = JSON.stringify({ block: false });
    if (reqUrl) {
      data = await queryVotes(reqUrl[0], reqUrl[1]);
      let test = -1;
      let temp = -1;
      for (let j = 0; j < data[0].active_votes.length; j++) {
        for (let i = 0; i < user.length; i++) {
          test = data[0].active_votes[j].voter.indexOf(user[i]);
          if (test > -1) {
            temp = test;
            break;
          }
        }
        if (temp !== -1) {
          end = JSON.stringify({ block: true });
          break;
        }
      }
    }
    res.end(end);
  })
  .listen(port, "127.0.0.1");
