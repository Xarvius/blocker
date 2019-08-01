chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendresponse) {
  console.log(message.txt);
  let posts = document.querySelectorAll("div.articles__summary");
  let post = document.querySelectorAll("h2.articles__h2 a");
  test = link => {
    let block;
    const API = `https://g40zr.mocklab.io/blockFilter/${link}`;
    console.log("link " + API);
    fetch(API)
      .then(response => {
        if (response.status === 200) return response;
        throw Error(response.status);
      })
      .then(response => response.text())
      .then(data => {
        block = JSON.parse(data.block);
        console.log(block.block);
      })
      .catch(error =>
        error == "Error: 404"
          ? alert("Not found")
          : alert("Please try later " + error)
      );
  };
  console.log(post[1].href);
  console.log(test(post[1].href));
  let i = 0;
  // for (post of posts) {
  //   if (i % 2 == 0) post.style["display"] = "none";
  //   console.log(post);
  //   i++;
  // }
}
