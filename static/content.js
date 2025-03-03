chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in content.js:", message);
    if (message.action === "updateContainer") {
        console.log("🎯 Forwarding message to body.html");
        window.postMessage({ action: "updateContainer", tasks: message.tasks }, "*");
        sendResponse({ status: "success", forwarded: true });
    }
});