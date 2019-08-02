chrome.browserAction.onClicked.addListener(IconClicked);
function IconClicked(tab) {
  const msg = {
    txt: "[postFilter] - work in progres.."
  };
  chrome.tabs.sendMessage(tab.id, msg);
}
