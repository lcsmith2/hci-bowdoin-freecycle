function displayWelcome(){
    if (localStorage.user === undefined || localStorage.user === null || localStorage.user === ""){
        return;
    }
    if( document.getElementById("welcomeMessage")){
        document.getElementById("welcomeMessage").innerHTML = "Welcome back " + localStorage.user + " !";
    }
   
}

function displayRequests() {
    var listingsData = getListingsData();
    var listingsDiv = document.getElementsByClassName("requests")[0];
    if(listingsDiv) listingsDiv.replaceChildren();
    for (var i = 0; i < listingsData.length; i++) {
        if (userRequestedItem(listingsData[i])){
            var listing = getListing(listingsData[i], true, true, ["cancel"]);
            var desc = listing.getElementsByClassName("listing-desc")[0];
            desc.parentNode.removeChild(desc);
            listingsDiv.appendChild(listing);
        }
    }
}

function displayOwnedListings() {
    var listingsData = getListingsData();
    var listingsDiv = document.getElementsByClassName("own")[0];
    listingsDiv.replaceChildren();
    for (var i = 0; i < listingsData.length; i++) {
        if (listingsData[i].user === localStorage.user) {
            var listing = getListing(listingsData[i], true, true, ["delete"]);
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

function dismissConfirm(buttonId) {
    var action = buttonId.split("-")[1];
    var modalButtons = document.getElementsByClassName("footer-btns")[0];
    modalButtons.classList.remove("hidden");
    var confirmAlert = document.getElementsByClassName(action + "-alert")[0];
    confirmAlert.classList.add("hidden");
}

function toggleSection(buttonId) {
    var buttonClass = buttonId.split("-")[0];
    var sectionDiv = document.getElementsByClassName(buttonClass)[0];
    var toggleButton = document.getElementById(buttonId);
    var currentText = toggleButton.innerText.split(" ");
    if (sectionDiv.classList.contains("hidden")) {
        sectionDiv.classList.remove("hidden");
        toggleButton.innerText = "Hide " + currentText.slice(1).join(" ");
    }
    else {
        sectionDiv.classList.add("hidden");
        toggleButton.innerText = "Show " + currentText.slice(1).join(" ");
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayWelcome();
    displayRequests();
    displayOwnedListings();
});
