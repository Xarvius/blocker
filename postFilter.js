chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendresponse) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");
  let postLink = document.querySelectorAll("h2.articles__h2 a");
  let filterRespond;
  filterAsk = link => {
    const API = `https://g40zr.mocklab.io/blockFilter/${link}`;
    fetch(API)
      .then(response => {
        if (response.status === 200) return response;
        throw Error(response.status);
      })
      .then(response => response.text())
      .then(data => {
        filterRespond = JSON.parse(data);
        return filterRespond.block;
      })
      .catch(error =>
        error == "Error: 404"
          ? console.log("Not found")
          : console.log("Please try later " + error)
      );
  };
  let i = 0;
  for (post of posts) {
    // if (i % 2 == 0) pos.style["display"] = "none";
    filterAsk(postLink[i].href);
    if (filterRespond.block) post.style["display"] = "none";
    i++;
  }
}
