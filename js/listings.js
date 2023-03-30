const DESCRIPTION_LEN = 50;

function handleDetails(buttonId) {
    var listingId = buttonId.split("-")[1];

    var listingsData = getListingsData();
    var listingData = listingsData.find(function(listing) {
        return listing["id"] === listingId
    });

    var modalBody = document.getElementsByClassName("modal-body")[0];
    modalBody.replaceChildren();

    modalBody.appendChild(getListingImage(listingData));
    modalBody.appendChild(getListingInfo(listingData, false));
    modalBodyContent = modalBody.childNodes[1];
    modalBodyContent.firstChild.firstChild.nodeValue = listingData["name"];
    var descriptionLine = document.createElement("p");
    descriptionLine.appendChild(document.createTextNode("Description: "));
    modalBodyContent.insertBefore(descriptionLine, modalBodyContent.childNodes[3]);

    var requestInfo = document.createElement("p");
    var requestInfoText = `This item currently has ${listingData["requests"].length} request(s).`;
    requestInfo.appendChild(document.createTextNode(requestInfoText));
    modalBodyContent.appendChild(requestInfo);

    var requestButton = document.getElementsByClassName("request-btn")[0];
    requestButton.id = "request-" + listingId;
    requestButton.onclick = function() {
        handleRequest(requestButton.id)
    };
}

function handleRequest(buttonId) {
    if (localStorage.user === undefined) {
        var loginAlert = document.getElementsByClassName("login-alert")[0];
        loginAlert.classList.remove("hidden");
    }
}

function hideLoginAlert() {
    var loginAlert = document.getElementsByClassName("login-alert")[0];
    loginAlert.classList.add("hidden");
}

function getListingImage(listingData) {
    var listingImage = document.createElement("img");
    listingImage.src = listingData["image"];
    return listingImage;
}

function getListingInfo(listingData, shortenDescription) {
    var listingInfo = document.createElement("div");
    listingInfo.classList.add("listing-info");

    var listingName = document.createElement("h3");
    var title = `${listingData["name"]} (${listingData["requests"].length} requests)`;
    listingName.appendChild(document.createTextNode(title));
    listingInfo.appendChild(listingName);

    var listingPrice = document.createElement("p");
    var price = listingData["price"] === "Free" ? listingData["price"] : "$" + listingData["price"];
    listingPrice.appendChild(document.createTextNode(`Price: ${price}`));
    listingInfo.appendChild(listingPrice);

    var listingCondition = document.createElement("p");
    listingCondition.appendChild(document.createTextNode(`Condition: ${listingData["condition"]}`));
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
    listingButton.classList.add("btn", "btn-primary");
    listingButton.setAttribute("data-toggle", "modal");
    listingButton.setAttribute("data-target", "#listing-modal");
    listingButton.onclick = function() {
        handleDetails(listingButton.id)
    };
    listingButton.appendChild(document.createTextNode("Details"));
    listingInfo.appendChild(listingButton);

    listing.appendChild(listingInfo);
    return listing;
}

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