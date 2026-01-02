const form = document.getElementById("signupForm");
const toastEl = document.getElementById("toastMsg");
const toastText = document.getElementById("toastText");

console.log("script.js loaded successfully");

form.addEventListener("submit", async (e) => {
    console.log("addEventListener: submit");
    e.preventDefault(); //  stop page reload / new tab

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch("http://localhost:5050/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showToast("Account created successfully!", "success");
            form.reset();
        } else {
            showToast("Failed to create account", "danger");
        }
    } catch (err) {
        showToast("Server error", "danger");
    }
});

function showToast(message, type) {
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastText.innerText = message;
    new bootstrap.Toast(toastEl).show();
}
