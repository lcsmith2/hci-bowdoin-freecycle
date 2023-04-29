const DESCRIPTION_LEN = 50;

function handleDetails(buttonId) {
    var listingId = buttonId.split("-").pop();

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
    modalBodyContent.insertBefore(descriptionLine, modalBodyContent.childNodes[4]);

    var requestInfo = document.createElement("p");
    var req = listingData["requests"].length === 1 ? "request" : "requests";
    var requestInfoText = `This item currently has ${listingData["requests"].length} ${req}.`;
    requestInfo.appendChild(document.createTextNode(requestInfoText));
    modalBodyContent.appendChild(requestInfo);

    var requestButton = document.getElementsByClassName("request-btn")[0];
    requestButton.id = "request-" + listingId;
    requestButton.onclick = function() {
        handleRequest(requestButton.id)
    };
}

function addRequest(listingsData, listingIndex) {
    listingsData[listingIndex]["requests"].push({ "user": localStorage.user });
    localStorage.listingsData = JSON.stringify(listingsData);
    localStorage.lastRequestedListing = JSON.stringify(listingsData[listingIndex]);
    location.href = "request-confirmed.html";
}

function handleRequest(buttonId) {
    var listingId = buttonId.split("-").pop();
    var alerts = document.getElementsByClassName("request-alert");
    // User isn't logged in
    if (localStorage.user === undefined || localStorage.user === null) {
        alerts[0].classList.remove("hidden");
        localStorage.toRequest = "listing-" + listingId;
        return;
    }
    var listingsData = getListingsData();
    var listingIndex = listingsData.findIndex(function(listing) {
        return listing["id"] === listingId
    });
    // User owns the listing they're trying to request
    if (localStorage.user === listingsData[listingIndex]["user"]) {
        alerts[1].classList.remove("hidden");
        return;
    }
    // User already requested this listing
    if (listingsData[listingIndex]["requests"].some(function(req) {
        return req["user"] === localStorage.user
    })) {
        alerts[2].classList.remove("hidden");
        return;
    }
    localStorage.removeItem("toRequest");
    addRequest(listingsData, listingIndex);
}

function hideRequestAlerts() {
    var alerts = Array.from(document.getElementsByClassName("request-alert"));
    alerts.forEach(function(alert) {
        alert.classList.add("hidden")
    });
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
    var req = listingData["requests"].length === 1 ? "request" : "requests";
    var title = `${listingData["name"]} (${listingData["requests"].length} ${req})`;
    listingName.appendChild(document.createTextNode(title));
    listingInfo.appendChild(listingName);

    var listingPrice = document.createElement("p");
    var price = listingData["price"] === "Free" ? listingData["price"] : "$" + listingData["price"];
    listingPrice.appendChild(document.createTextNode(`Price: ${price}`));
    listingInfo.appendChild(listingPrice);

    var listingCategory = document.createElement("p");
    var cat = listingData["category"];
    var category = `Category: ${cat[0].toUpperCase() + cat.slice(1)}`;
    listingCategory.appendChild(document.createTextNode(category));
    listingInfo.appendChild(listingCategory);

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

function getListing(listingData, shortenDescription, imageButton, buttonName="Details") {
    var listing = document.createElement("div");
    listing.classList.add("listing");

    var listingImage = getListingImage(listingData);
    if (!imageButton) {
        listing.appendChild(document.createElement("div").appendChild(listingImage));
    }
    else {
        listingImage.classList.add("img-btn");
        listingImage.id = "listing-img-" + listingData["id"];
        listingImage.setAttribute("data-toggle", "modal");
        listingImage.setAttribute("data-target", "#listing-modal");
        listingImage.onclick = function() {
            handleDetails(listingImage.id)
        };
        listing.appendChild(document.createElement("div").appendChild(listingImage));
    }
    
    var listingInfo = getListingInfo(listingData, shortenDescription);

    var listingButton = document.createElement("button");
    listingButton.id = "listing-" + listingData["id"];
    listingButton.classList.add("btn", "btn-primary");
    listingButton.setAttribute("data-toggle", "modal");
    listingButton.setAttribute("data-target", "#listing-modal");
    listingButton.onclick = function() {
        handleDetails(listingButton.id)
    };
    listingButton.appendChild(document.createTextNode(buttonName));
    listingInfo.appendChild(listingButton);

    listing.appendChild(listingInfo);
    return listing;
}
 
