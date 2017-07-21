chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.debug(message);
});