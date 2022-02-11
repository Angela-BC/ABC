console.log('background.js')

chrome.runtime.onMessageExternal.addListener( (request, sender, sendResponse) => {
    console.log("Received message from " + sender + ": ", request);
    sendResponse({ received: true }); //respond however you like
});