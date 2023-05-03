function handleLogout() {
    localStorage.removeItem("user");
}

document.addEventListener("DOMContentLoaded", function(event) {
    handleLogout();
});