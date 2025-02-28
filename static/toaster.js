function showToast(message, color = "bg-green-500") {
    let toastContainer = document.getElementById("toast-container");

    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "fixed top-5 right-5 z-50 flex flex-col gap-4";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `flex items-center w-96 max-w-sm text-white font-bold px-6 py-4 rounded-xl shadow-2xl ${color} relative opacity-0 translate-x-10 transition-all duration-500 ease-in-out`;

    toast.innerHTML = `
        <span class="flex-1">${message}</span>
        <div class="absolute bottom-0 left-0 w-full h-1 bg-white opacity-50 toast-progress"></div>
    `;

    toastContainer.appendChild(toast);

    // Trigger slide-in effect
    setTimeout(() => {
        toast.classList.remove("opacity-0", "translate-x-10");
        toast.classList.add("opacity-100", "translate-x-0");
    }, 100);

    // Animate progress bar
    const progress = toast.querySelector(".toast-progress");
    progress.style.transition = "width 3s linear";
    setTimeout(() => {
        progress.style.width = "0%";
    }, 10);

    // Fade out and remove
    setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-x-0");
        toast.classList.add("opacity-0", "translate-x-10");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
