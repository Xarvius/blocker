chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");

  async function blockPosts(post) {
    let link = post
      .querySelector("h2.articles__h2 a")
      .href.split("/")
      .reverse();

    const permlink = link[0];
    const author = link[1].substr(1);

    const API = `http://localhost:3000/${permlink}/${author}`;
    let response = await fetch(API);
    let json = await response.json();

    if (json.block) {
      post.style["display"] = "none";
      console.log(`Post ${permlink} - blocked`);
    }
  }

  Array.prototype.slice.call(posts).map(blockPosts);
}
