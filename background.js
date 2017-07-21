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
        try {
            chrome.tabs.executeScript(tab.id, {
                file: "./dist/listener.js",
                runAt: 'document_start'
            }, result => {
                if (chrome.runtime.lastError) {
                    //
                }
            })
        } catch (ex) {
            console.warn(ex);
        }
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.debug(message, sender, sendResponse);
    console.debug(message.event.altKey, message.event.target);
    sendToPopup({ target: message.event.target });
});

var popUpId = null;
var sendToPopup = message => {
    console.debug(popUpId);
    ensurePopupPresence(popUpId)
        .then(updatedPopupId => {
            popUpId = updatedPopupId;
            chrome.runtime.sendMessage(message);
        })
        .catch(exception => {
            console.warn(exception);
        })
};
var popupScheduled = false;
var ensurePopupPresence = windowId => {
    return new Promise((resolve, reject) => {
        if (popupScheduled) {
            reject();
        } else {
            popupScheduled = true;
            tryToGetWindow(windowId)
                .then(window => {
                    if (!window) {
                        chrome.windows.create({
                            url: './html/display_popup.html',
                            type: 'popup'
                        }, window => {
                            popupScheduled = false;
                            console.warn(window.id);
                            resolve(window.id);
                        });
                    } else {
                        popupScheduled = false;
                        resolve(window.id);
                    }
                });
        }
    });
}
var tryToGetWindow = windowId => {
    return new Promise((resolve, reject) => {
        if (!windowId) {
            resolve(false);
        } else {
            chrome.windows.get(windowId, window => {
                resolve(window);
            })
        }
    });
}