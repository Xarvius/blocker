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
async function queryVotes(permalink, author) {
  const query = {
    tag: "",
    limit: 1,
    start_author: author,
    start_permlink: permalink,
    truncate_body: 1
  };
  let data = await client.database
    .getDiscussions("trending", query)
    .catch(err => {
      console.log(err);
      alert("Error occured, please reload the page");
    });
  return data;
}
const user = ["bue", "nate-atkins"];
http
  .createServer(async (req, res) => {
    let reqUrl;

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

      //console.log(data[0].active_votes[0].voter);
      console.log(end);

      res.writeHead(200, { "Content-Type": "application/json" });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
    }

    res.end(end);
  })
  .listen(port, "127.0.0.1");

// const posts = [
//   {
//     id: 1,
//     title: "First",
//     content: "Lorem Ipsum1",
//     UserVoted: [{ id: 1, name: "Steve" }]
//   },
//   {
//     id: 2,
//     title: "Snd",
//     content: "Lorem Ipsum2",
//     UserVoted: [{ id: 1, name: "Anna" }]
//   },
//   {
//     id: 3,
//     title: "3",
//     content: "Lorem Ipsum3",
//     UserVoted: [{ id: 1, name: "Anna" }, { id: 2, name: "Marianne" }]
//   },
//   {
//     id: 4,
//     title: "4",
//     content: "Lorem Ipsum4",
//     UserVoted: [{ id: 1, name: "Mak" }]
//   }
// ];
// const user = ["bue", "nate-atkins"];
//     let arr = [];
//     let test = -1;
//     let temp = -1;

//     posts.map(post => {
//       for (let j = 0; j < post.UserVoted.length; j++) {
//         for (let i = 0; i < user.length; i++) {
//           test = post.UserVoted[j].name.indexOf(user[i]);
//           if (test > -1) temp = test;
//         }
//         if (temp === -1) arr.push(post);
//       }
//     });
//     const JSONposts = JSON.stringify(arr);
//     res.end(JSONposts);
// return client.database
//   .getDiscussions("trending", query)

//   .catch(err => {
//     console.log(err);
//     alert("Error occured, please reload the page");
//   });
// reqUrl && (data = queryVotes(reqUrl[0], reqUrl[2])); // prevent favico
// console.log(data); // <--------------------- PROMISE
//https://steemit.com/steem/@steem.marketing/steemhunt-and-reviewhunt-interview-with-founder-young-hwi
// data[0].active_votes[0].voter === "enlil"
//   ? (end = JSON.stringify({ block: true }))
//   : (end = JSON.stringify({ block: false })); //^3 quick check
