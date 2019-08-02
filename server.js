const http = require("http");
const port = process.env.PORT || 3000;
const dsteem = require("dsteem");
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
function urlSplit(url) {
  let reqUrl = url.split("/").reverse();
  reqUrl[1] = reqUrl[1].substr(1);
  return reqUrl;
}
async function dataCheck(reqUrl) {
  let data = await queryVotes(reqUrl[0], reqUrl[1]);
  let test = -1;
  let temp = -1;
  let end = JSON.stringify({ block: false });
  for (let j = 0; j < data[0].active_votes.length; j++) {
    for (let i = 0; i < users.length; i++) {
      test = data[0].active_votes[j].voter.indexOf(users[i]);
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
  return end;
}

http
  .createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, { "Content-Type": "application/json" });

    const reqUrl = urlSplit(req.url);
    const end = await dataCheck(reqUrl);

    res.end(end);
  })
  .listen(port, "127.0.0.1");
