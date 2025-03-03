chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

async function getTasks() {
    try {
        let response = await fetch("http://127.0.0.1:8000/api/categories");
        let fetchresponse = await response.json();
        return fetchresponse.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "getTasks") {
        const taskResponse = await getTasks();
        console.log("Fetched tasks:", taskResponse);
        if (taskResponse && taskResponse.data && taskResponse.data.length > 0) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "updateContainer",
                        tasks: taskResponse.data
                    });
                }
            });
        } else {
            console.warn("No tasks found or error fetching tasks");
        }
        sendResponse({ status: "success", tasks: taskResponse });
        return true;
    }
});chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});



async function getTasks() {
    try {
        let response = await fetch("http://127.0.0.1:8000/api/categories");
        let fetchresponse = await response.json();
        return fetchresponse.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "getTasks") {
        const taskResponse = await getTasks();
        console.log("Fetched tasks:", taskResponse);
        if (taskResponse && taskResponse.data && taskResponse.data.length > 0) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "updateContainer",
                        tasks: taskResponse.data
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