chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendresponse) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");
  let postLink = document.querySelectorAll("h2.articles__h2 a");
  let filterRespond;

  filterAsk = (link, post) => {
    //const API = `https://cors-anywhere.herokuapp.com/https://g40zr.mocklab.io/blockFilter/${link}`;
    // const API = `https://cors-anywhere.herokuapp.com/http://192.168.5.13000/${link}`;
    const API = `http://localhost:3000/${link}`;
    fetch(API, { mode: "cors" })
      .then(response => {
        if (response.status === 200) return response;
        throw Error(response.status);
      })
      .then(response => response.text())
      .then(data => {
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
