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
        if (taskResponse && taskResponse.length > 0) {
            chrome.tabs.query({}, (tabs) => {
                const targetTab = tabs.find(tab => tab.url && tab.url.includes("http://127.0.0.1:8000/index"));
                if (targetTab) {
                    console.log("Injecting content.js into tab:", targetTab.id);
                    
                    // Inject content.js dynamically
                    chrome.scripting.executeScript({
                        target: { tabId: targetTab.id },
                        files: ["content.js"]
                    }, () => {
                        console.log("content.js injected successfully.");

                        // Now send the message after injecting
                        chrome.tabs.sendMessage(targetTab.id, {
                            action: "updateContainer",
                            tasks: taskResponse
                        });
                    });
                } else {
                    console.warn("No matching tab found.");
                }
            });
            

        } else {
            console.warn("No tasks found or error fetching tasks");
        }
        sendResponse({ status: "success", tasks: taskResponse });
        return true;
    }
});
