document.addEventListener("DOMContentLoaded", function(event) {
    if (!userLoggedIn()) {
        var createListingLink = document.getElementById("create-listing-link");
        createListingLink.href = "login.html";
    }
});