chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");

  async function blockPosts(post) {
    let link = post.querySelector("h2.articles__h2 a").href;
    const API = `http://localhost:3000/${link}`;
    let response = await fetch(API, { mode: "cors" });
    let json = await response.json();

    if (json.block) {
      post.style["display"] = "none";
      console.log(`Post ${link} - blocked`);
    }
  }

  Array.prototype.slice.call(posts).map(blockPosts);
}
