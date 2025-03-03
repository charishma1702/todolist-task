document.addEventListener("DOMContentLoaded", async () => {
    await fetchCategories(); // Load categories first
    await fetchTasks(); // Now fetch tasks (categories will be mapped correctly)
    setCurrentDateTime(); // Set default date and time
});


// Fetch categories and update the dropdown
let categoryMap = {}; // Global object to store categoryId -> categoryName mapping

async function fetchCategories() {
    try {
        let response = await fetch("http://127.0.0.1:8000/api/categories");
        let responseData = await response.json();

        let categoryDropdown = document.getElementById("taskCategory");
        categoryDropdown.innerHTML = ""; // Clear existing options

        if (responseData.data && Array.isArray(responseData.data)) {
            responseData.data.forEach(category => {
                let option = document.createElement("option");
                option.value = category._id; // Make sure this matches the task category ID
                option.textContent = category.name;
                categoryDropdown.appendChild(option);

                // Store category ID and Name in the global categoryMap
                categoryMap[category._id] = category.name;
            });
        } else {
            console.error("Invalid categories response:", responseData);
        }
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
        let response = await fetch("http://127.0.0.1:8000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        let data = await response.json();

        if (response.ok) {
            alert("Task Created Successfully!");
            resetForm();
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
        let response = await fetch("http://127.0.0.1:8000/api/tasks");
        let responseData = await response.json();

        responseData.tasks.forEach(task => {
            let categoryName = categoryMap[task.category] || "Uncategorized";
            console.log(`Task: ${task.name}, Category: ${categoryName}`);

            addTaskToUI(task); // Ensure UI updates with correct category
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

function resetForm() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskPriority").value = "low";
    setCurrentDateTime(); // Reset date and time to current values
}
