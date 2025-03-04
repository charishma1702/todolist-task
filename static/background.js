chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});
console.log("Background script loaded.");

async function fetchTasks() {
    try {
        let response = await fetch("http://127.0.0.1:8000/api/tasks");
        let fetchresponse = await response.json();
        return fetchresponse.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
console.log("Extension ID:", chrome.runtime.id);

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "fetchTasks") {
        const taskResponse = await fetchTasks();
        console.log("Fetched tasks:", taskResponse);
        if (taskResponse && taskResponse.length > 0) {
            chrome.tabs.query({}, (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "updateContainer",
                        tasks: taskResponse
                    });
                }
            });
        } else {
            console.warn("No tasks found or error fetching tasks");
        }
        sendResponse({ status: "success", tasks: taskResponse });
        return true;
    }
});


