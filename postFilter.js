chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendresponse) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");
  for (post of posts) {
    post.style["display"] = "none";
  }
}
