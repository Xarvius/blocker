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
async function queryVotes() {
  const query = {
    tag: "",
    limit: 1,
    start_author: "steempress",
    start_permlink:
      "guest-accounts-design-improvementsm-and-new-dashboard-for-user-settings",
    truncate_body: 1
  };
  const test = await client.database
    .getDiscussions("trending", query)
    .then(result => {
      let array = [];
      result.forEach(post => {
        // console.log("post", post);
        //   if (post.active_votes[0].voter === "enlil") console.log("yay");
        array.push(post.active_votes[0]);
      });
      return array;
    })
    .catch(err => {
      console.log(err);
      alert("Error occured, please reload the page");
    });
  return test;
}
const posts = [
  {
    id: 1,
    title: "First",
    content: "Lorem Ipsum1",
    UserVoted: [{ id: 1, name: "Steve" }]
  },
  {
    id: 2,
    title: "Snd",
    content: "Lorem Ipsum2",
    UserVoted: [{ id: 1, name: "Anna" }]
  },
  {
    id: 3,
    title: "3",
    content: "Lorem Ipsum3",
    UserVoted: [{ id: 1, name: "Anna" }, { id: 2, name: "Marianne" }]
  },
  {
    id: 4,
    title: "4",
    content: "Lorem Ipsum4",
    UserVoted: [{ id: 1, name: "Mak" }]
  }
];
const user = ["Anna", "Mak"];

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    queryVotes().then(answer => {
      // console.log(answer[0].voter);
    });
    console.log(req.url);
    const end = JSON.stringify({ block: true });
    res.end(end);

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

    // res.end("test");
  })
  .listen(port, "127.0.0.1");
