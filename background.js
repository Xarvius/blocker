chrome.browserAction.onClicked.addListener(IconClicked);
function IconClicked(tab) {
  const msg = {
    txt: "Deleted"
  };
  chrome.tabs.sendMessage(tab.id, msg);
}
