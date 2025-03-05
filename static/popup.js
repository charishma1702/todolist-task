document.addEventListener("DOMContentLoaded", async () => {
    await fetchCategories();
    await fetchTasks();
    setCurrentDateTime();
});

// Fetch categories and update the dropdown
let categoryMap = {};
const API_URL="http://127.0.0.1:8000/api";

// async function fetchCategories() {
//     try {
//         let response = await fetch(`${API_URL}/categories`);
//         let responseData = await response.json();

//         let categoryDropdown = document.getElementById("taskCategory");
//         categoryDropdown.innerHTML = "";

//         if (responseData.data && Array.isArray(responseData.data)) {
//             responseData.data.forEach(category => {
//                 let option = document.createElement("option");
//                 option.value = category._id;
//                 option.textContent = category.name;
//                 categoryDropdown.appendChild(option);
//                 categoryMap[category._id] = category.name;
//             });
//         } else {
//             console.error("Invalid categories response:", responseData);
//         }
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//     }
// }
async function fetchCategories() {
    try {
        let response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let responseData = await response.json();

        if (!responseData.data || !Array.isArray(responseData.data)) {
            throw new Error("Invalid categories data received");
        }

        let categoryDropdown = document.getElementById("taskCategory");
        categoryDropdown.innerHTML = "";
        
        responseData.data.forEach(category => {
            let option = document.createElement("option");
            option.value = category._id;
            option.textContent = category.name;
            categoryDropdown.appendChild(option);
            categoryMap[category._id] = category.name;
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}


// Set the date and time fields to the current date and time
function setCurrentDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = now.toTimeString().slice(0, 5); // HH:MM

    document.getElementById("taskDate").value = formattedDate;
    document.getElementById("taskTime").value = formattedTime;
}

// Handle task submission
document.getElementById("addTaskBtn").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission refresh

    const category = document.getElementById("taskCategory").value;
    const task = document.getElementById("taskName").value;
    const date = document.getElementById("taskDate").value;
    const time = document.getElementById("taskTime").value;
    const description = document.getElementById("taskDescription").value;
    const priority = document.getElementById("taskPriority").value;

    if (!category || !task || !date || !time || !description || !priority) {
        alert("Please fill out all fields.");
        return;
    }

    const payload = {
        name: task,
        category: category,
        description: description,
        status: "pending",
        due_date: `${date}T${time}:00`,
        priority_level: priority
    };

    try {
        let response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        let data = await response.json();

        if (response.ok) {
            alert("Task Created Successfully!");
            chrome.runtime.sendMessage({action:'fetchTasks'})
            document.querySelector(".popup-container").style.display = "none";
        } else {
            alert("Error: " + data.detail);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to create task.");
    }
});

async function fetchTasks() {
    try {
        let response = await fetch(`${API_URL}/tasks`);
        let responseData = await response.json();

        console.log("API Response:", responseData); // Log the response

        if (!responseData.data || !Array.isArray(responseData.data)) {
            throw new Error("Invalid tasks data received");
        }

        responseData.data.forEach(task => {
            let categoryName = categoryMap[task.category] || "Uncategorized";
            console.log("Task: ", task.name, "Category: ", categoryName);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}


// Reset form fields
function resetForm() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskPriority").value = "Low";
    setCurrentDateTime();
}

document.getElementById("cancelTaskBtn").addEventListener("click", function () {
    document.querySelector(".popup-container").style.display = "none";
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.querySelector(".popup-container").style.display = "none";
    }
});
