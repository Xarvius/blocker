chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");
  let postLink = document.querySelectorAll("h2.articles__h2 a");

  filterAsk = (link, post) => {
    const API = `http://localhost:3000/${link}`;
    fetch(API, { mode: "cors" })
      .then(response => {
        if (response.status === 200) return response;
        throw Error(response.status);
      })
      .then(response => response.text())
      .then(data => {
        let filterRespond;
        filterRespond = JSON.parse(data);
        if (filterRespond.block) post.style["display"] = "none";
      })
      .catch(error =>
        error == "Error: 404" ? console.log("Not found") : console.log(error)
      );
  };
  let i = 0;
  for (post of posts) {
    filterAsk(postLink[i].href, post);
    i++;
  }
}
