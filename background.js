console.debug(chrome);
var enabled = true;
chrome.browserAction.onClicked.addListener(tab => {
    console.debug('browserAction click')
    enabled = !enabled;
    console.debug(enabled);
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.debug(tabId, changeInfo, tab);
    if (changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tab.id, {
            file: "./dist/listener.js",
            runAt: 'document_start'
        })
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.debug(message, sender, sendResponse);
    console.debug(message.event.altKey, message.event.target);
});

var popUpId = null;
var sendToPopup = message => {
    let window = null;
    if (popUpId !== null) {
        window = chrome.windows.get(popUpId);
    }
    if (!popUpId || !window) {
        chrome.windows.create({
            url: './html/   display_popup.html',
            type: 'popup'
        }, newWindow => {
            popUpId = newWindow.id;
            window = newWindow;
        })
    }
    chrome.runtime.sendMessage();
}