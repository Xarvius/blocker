chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ display: none }, function() {
    console.log("Rdy to filter");
  });
});
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: "steemit.com" }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});
