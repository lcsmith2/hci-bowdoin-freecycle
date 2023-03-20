const DESCRIPTION_LEN = 50;

function getListingImage(listingData) {
    var listingImage = document.createElement("img");
    listingImage.src = listingData["image"];
    return listingImage;
}

function getListingInfo(listingData, shortenDescription) {
    var listingInfo = document.createElement("div");
    listingInfo.classList.add("listing-info");

    var listingName = document.createElement("h3");
    listingName.appendChild(document.createTextNode(`${listingData["name"]} (${listingData["amount"]})`));
    listingInfo.appendChild(listingName);

    var listingPrice = document.createElement("p");
    var price = listingData["price"] === "Free" ? listingData["price"] : "$" + listingData["price"];
    listingPrice.appendChild(document.createTextNode(price));
    listingInfo.appendChild(listingPrice);

    var listingCondition = document.createElement("p");
    listingCondition.appendChild(document.createTextNode(listingData["condition"]));
    listingInfo.appendChild(listingCondition);

    var listingDescription = document.createElement("p");
    var description = listingData["description"];
    if (shortenDescription && description.length > DESCRIPTION_LEN) {
        description = description.slice(0, DESCRIPTION_LEN + 1).trim() + "...";
    }
    listingDescription.classList.add("listing-desc");
    listingDescription.appendChild(document.createTextNode(description));
    listingInfo.appendChild(listingDescription);
    return listingInfo;
}

function getListing(listingData, shortenDescription) {
    var listing = document.createElement("div");
    listing.classList.add("listing");

    var listingImage = getListingImage(listingData);
    listing.appendChild(document.createElement("div").appendChild(listingImage));
    
    var listingInfo = getListingInfo(listingData, shortenDescription);

    var listingButton = document.createElement("button");
    listingButton.id = "listing-" + listingData["id"];
    listingButton.onclick = function() {
        handleDetails(listingButton.id)
    };
    listingButton.appendChild(document.createTextNode("Details"));
    listingInfo.appendChild(listingButton);

    listing.appendChild(listingInfo);
    return listing;
}

function displayListings() {
    var listingsDiv = document.getElementsByClassName("listings")[0];
    listingData.forEach(function(listingData) {
        listingsDiv.appendChild(getListing(listingData, true))
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayListings();
});