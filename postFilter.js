chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendresponse) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");
  let i = 1;
  for (post of posts) {
    if (i % 2 == 0) post.style["display"] = "none";
    i++;
  }
}
