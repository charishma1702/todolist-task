chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    console.log("Forwarding message to body.html", message);

    if (message.action === "updateContainer") {
        window.postMessage({ action: "updateContainer", tasks: message.tasks }, "*");
        sendResponse({ status: "success", forwarded: true });
    } else if (message.action === "taskCreated") {
        console.log("Task created:", message.task);
    }
});