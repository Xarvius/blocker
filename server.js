const http = require("http");
const port = process.env.PORT || 3000;
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
    UserVoted: [{ id: 1, name: "Marianne" }, { id: 2, name: "Anna" }]
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
    res.writeHead(200, { "Content-Type": "text/html" });
    switch (req.url) {
      case "/":
        res.end("go /api/post");
        break;
      case "/api/post":
        let arr = [];
        let test = -1;
        let temp = -1;

        posts.map(post => {
          for (let j = 0; j < post.UserVoted.length; j++) {
            for (let i = 0; i < user.length; i++) {
              test = post.UserVoted[j].name.indexOf(user[i]);
              if (test > -1) temp = test;
            }
            if (temp === -1) arr.push(post);
          }
        });
        const JSONposts = JSON.stringify(arr);
        res.end(JSONposts);
        break;
    }
    res.end("test");
  })
  .listen(port, "127.0.0.1");
