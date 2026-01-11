let currentSite = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  if (!url || !url.startsWith("http")) return;

  const hostname = new URL(url).hostname;

  if (currentSite) {
    const timeSpent = Date.now() - startTime;
    chrome.storage.local.get([currentSite], (data) => {
      chrome.storage.local.set({
        [currentSite]: (data[currentSite] || 0) + timeSpent
      });
    });
  }

  currentSite = hostname;
  startTime = Date.now();
}
