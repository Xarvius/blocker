const http = require("http");
const port = process.env.PORT || 3000;
const dsteem = require("dsteem");
const blacklist = ["bue", "nate-atkins", "therising"];
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
  let end = block
    ? JSON.stringify({ block: false })
    : JSON.stringify({ block: true });
  return end;
}

http
  .createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-Type": "application/json" });

    const reqUrl = urlSplit(req.url);
    const end = await dataCheck(reqUrl);

    res.end(end);
  })
  .listen(port, "0.0.0.0");
