chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ enabled: false });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "platzi.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.webNavigation.onCompleted.addListener(
  function () {
    chrome.storage.sync.get("enabled", function (data) {
      if (data.enabled) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          chrome.tabs.insertCSS(tabs[0].id, {
            file: "platzitheme.css",
          });
        });
      }
    });
  },
  { url: [{ urlMatches: "platzi.com" }] }
);
