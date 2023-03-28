const DESCRIPTION_LEN = 50;

function handleDetails(buttonId) {
    console.log(`clicked ${buttonId}`);
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
    listingName.appendChild(document.createTextNode(`${listingData["name"]} (${listingData["amount"]})`));
    listingInfo.appendChild(listingName);

    var listingPrice = document.createElement("p");
    var price = listingData["price"] === "Free" ? listingData["price"] : "$" + listingData["price"];
    listingPrice.appendChild(document.createTextNode(price));
    listingInfo.appendChild(listingPrice);

    var listingCategory = document.createElement("p");
    var category  = listingData["category"];
    listingCategory.appendChild(document.createTextNode(category));
    listingInfo.appendChild(listingCategory);

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

function searchListings(searchString){
    searchString = searchString.toLowerCase(); 
    
    if (localStorage.listingData === undefined) {
        localStorage.listingsData = JSON.stringify(defaultListingsData);
    }
    var listingsData = JSON.parse(localStorage.listingsData);
    //look at name and description

    var filteredListings;
    listingsData.forEach( function(entry) {
        //caseless matching
        var matchName = entry["name"].toLowerCase().search(searchString);
        var matchDescription = entry["description"].toLowerCase().search(searchString);

        if(matchName != -1 || matchDescription != -1){
            filteredListings.appendChild(getListing(entry, true));
        }
    }
    );

    return filteredListings;




}

function filterListings(category){
    if (localStorage.listingData === undefined) {
        localStorage.listingsData = JSON.stringify(defaultListingsData);
    }
    var listingsData = JSON.parse(localStorage.listingsData);

    var filteredListings;
    listingsData.forEach( function(entry) {
        //check category value match
        if(entry.category == category){
            filteredListings.appendChild(getListing(entry, true));
        }
        
        }
    );

    return filteredListings;


}

function displayListings() {
    if (localStorage.listingData === undefined) {
        localStorage.listingsData = JSON.stringify(defaultListingsData);
    }
    var listingsData = JSON.parse(localStorage.listingsData);

    var listingsDiv = document.getElementsByClassName("listings")[0];
    listingsDiv.replaceChildren();
    listingsData.forEach(function(listingData) {
        listingsDiv.appendChild(getListing(listingData, true))
    });
}
  
document.addEventListener("DOMContentLoaded", function(event) {
    displayListings();
});