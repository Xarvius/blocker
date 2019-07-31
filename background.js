chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ display: true }, function() {
    console.log("Rdy to filter");
  });
});
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: "https://steemit.com" }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});
