function displayListings() {

    var listingsData = getListingsData();

    var listingsDiv = document.getElementsByClassName("listings")[0];
    listingsDiv.replaceChildren();
    listingsData.forEach(function(listingData) {
        listingsDiv.appendChild(getListing(listingData, true))
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayListings();
});