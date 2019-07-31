const http = require("http");
const port = process.env.PORT || 3000;
const posts = [
  { id: 1, title: "First", content: "Lorem Ipsum1", visable: true },
  { id: 2, title: "Snd", content: "Lorem Ipsum2", visable: true },
  { id: 3, title: "3", content: "Lorem Ipsum3", visable: false }
];
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    switch (req.url) {
      case "/api/post":
        const JSONposts = JSON.stringify(
          posts.map(post => {
            return post.visable ? post : false;
          })
        );
        res.end(JSONposts);
        break;
    }
    res.end("test");
  })
  .listen(port, "127.0.0.1");
