function displayRequest() {
    if (localStorage.lastRequestedListing === undefined) {
        return;
    }
    var listingData = JSON.parse(localStorage.lastRequestedListing);
    var mainDiv = document.getElementsByClassName("request-info")[0];
    var listingDiv = getListing(listingData, false, false);
    listingDiv.classList.add("listing-full");
    listingDiv.lastChild.removeChild(listingDiv.lastChild.lastChild);
    mainDiv.insertBefore(listingDiv, document.getElementsByClassName("cta")[0]);
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayRequest();
});