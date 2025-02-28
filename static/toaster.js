function showToast(message, color = "bg-green-500") {
    let toastContainer = document.getElementById("toast-container");

    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "fixed top-5 right-5 z-50 flex flex-col gap-2";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `text-white font-semibold px-4 py-2 rounded-lg shadow-lg ${color} transition-opacity duration-300 opacity-100`;
    toast.innerText = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 3000);
    }, 3000);
}
