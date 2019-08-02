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

  let data = await client.database.getDiscussions("trending", query);
  return data;
}

http
  .createServer((req, res) => {
    let reqUrl;
    if (req.url != "/favicon.ico") reqUrl = req.url.split("/").reverse(); //split url
    let data;
    reqUrl && (data = queryVotes(reqUrl[0], reqUrl[2])); // prevent favico

    console.log(data); // <--------------------- PROMISE
    res.writeHead(200, { "Content-Type": "application/json" });
    const end = JSON.stringify({ block: true });
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
// const user = ["Anna", "Mak"];
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
