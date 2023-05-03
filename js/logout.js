function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("toRequest");
}

document.addEventListener("DOMContentLoaded", function(event) {
    handleLogout();
});