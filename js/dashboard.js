function displayWelcome(){
    if (localStorage.user === undefined || localStorage.user === null || localStorage.user === ""){
        return;
    }
    document.getElementById("welcomeMessage").innerHTML = "Welcome back " + localStorage.user + " !";
}

function displayRequests(){
    var listingsData = getListingsData();
    var listingsDiv = document.getElementsByClassName("requests")[0];
    listingsDiv.replaceChildren();
    for (var i = 0; i < listingsData.length; i++) {
        if (userRequestedItem(listingsData[i])){
            var listing = getListing(listingsData[i], true, true, ["cancel"]);
            var desc = listing.getElementsByClassName("listing-desc")[0];
            desc.parentNode.removeChild(desc);
            listingsDiv.appendChild(listing);
        }
    }
}

function userRequestedItem(listing){
    var request = false;
    for (var i = 0; i < listing.requests.length; i++) {
        if (listing.requests[i].user === localStorage.user){
            request = true;
        }
    }
    return request;
}

function dismissConfirm() {
    var modalButtons = document.getElementsByClassName("footer-btns")[0];
    modalButtons.classList.remove("hidden");
    var confirmAlert = document.getElementsByClassName("cancel-alert")[0];
    confirmAlert.classList.add("hidden");
}

function toggleRequests() {
    var requestsDiv = document.getElementsByClassName("requests")[0];
    var toggleButton = document.getElementsByClassName("requests-toggle")[0];
    if (requestsDiv.classList.contains("hidden")) {
        requestsDiv.classList.remove("hidden");
        toggleButton.innerText = "Click to Hide";
    }
    else {
        requestsDiv.classList.add("hidden");
        toggleButton.innerText = "Click to Show";
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayWelcome();
    displayRequests();
});
