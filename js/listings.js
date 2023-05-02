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


function performSearch(){
    var searchQuery = document.getElementById("search").value;
    console.log(searchQuery);

    var filteredListings = searchListings(searchQuery);
    displaySearchListings(filteredListings);


}
   
function performFilter(){
    displayFilterListings(filterListings());

    let filters = [];
    
    if (document.getElementById("check1").checked) {
      filters.push("category");
    }
    
    if (document.getElementById("check2").checked) {
      filters.push("condition");
    }
    
    if (document.getElementById("check3").checked) {
      filters.push("price");
    }

    return filters;
}
    



function searchListings(searchString){
    searchString = searchString.toLowerCase(); 
    
    if (localStorage.listingsData === undefined) {
        localStorage.listingsData = JSON.stringify(defaultListingsData);
    }
    var listingsData = JSON.parse(localStorage.listingsData);
    //look at name and description

    let listingsObj = [];
    listingsData.forEach( function(entry) {
       
        //caseless matching
        var matchName = entry["name"].toLowerCase().search(searchString);
        var matchDescription = entry["description"].toLowerCase().search(searchString);
        console.log(entry["name"]);
        
        if(matchName != -1 || matchDescription != -1){
            //filteredListings.appendChild(searched);
            console.log("Match!");
            console.log(entry);
            console.log("parse", JSON.stringify(entry));
           
            listingsObj.push(JSON.stringify(entry));
            
            // filtered= JSON.parse(filteredListings);
            // filteredListings.appendChild(JSON.stringify(entry));
           
        }
    }
    );

    console.log(JSON.stringify(listingsObj));
    return listingsObj;

}

function filterListings(){
    if (localStorage.listingsData === undefined) {
        localStorage.listingsData = JSON.stringify(defaultListingsData);
    }
    var listingsData = JSON.parse(localStorage.listingsData);

    //get filter info

    //by category
    let categoryStates = new Array();
    let catInfo = document.getElementById("category_check");
    const category_children = catInfo.childNodes;
    category_children.forEach(function(node) {
        if(node.nodeName == "INPUT"){
            console.log(node.value);
            if(node.checked ){
                categoryStates.push(node.value.toLowerCase());
            }
        }
        
    }
    );
    console.log("Category states:",categoryStates);
    //by condition
    let conditionStates = new Array();
    let condition = document.getElementById("condition");
    const condition_children = condition.childNodes;
    condition_children.forEach(function(node) {
        if(node.nodeName == "INPUT"){
            console.log(node.value);
            if(node.checked ){
                conditionStates.push(node.value.toLowerCase());
            }
        }
    }
    );
    console.log(conditionStates);
    //price
    let price_limit = document.getElementById("price_limit");
    console.log("price, ",price_limit.value);
    let price_lim = price_limit.value;
    let isFree = (price_lim == 0 || price_lim == null || price_lim == "") ? true : false;


    let filteredListings = [];
    listingsData.forEach( function(entry) {
       
        //check category , condition, price matches
        if(categoryStates.indexOf(entry.category) != -1 &&
        conditionStates.indexOf(entry.condition.toLowerCase()) != -1  &&
        (entry.price == "Free" || parseFloat(entry.price) < price_lim || isFree)
        ){
            filteredListings.push(JSON.stringify(entry));
           
        }
        
        }
    );
    
    return filteredListings;
}

function displaySearchListings(terms) {
    
    //var data = JSON.parse(terms);
    console.log(terms);
    //var listingsData = JSON.parse(terms);
    console.log(terms.length);
    
    
    var listingsDiv = document.getElementsByClassName("listings")[0];
    listingsDiv.replaceChildren();
    if(terms.length == 0){
        let h1 = document.createElement("h1");
        let txt = document.createTextNode("Sorry, nothing came up for your search.");
        h1.appendChild(txt);
        listingsDiv.appendChild(h1);
    }

    terms.forEach(function(listingData) {
        listingData = JSON.parse(listingData);
        listingsDiv.appendChild(getListing(listingData, true))
    });


}



function displayFilterListings(terms) {
    
    //var data = JSON.parse(terms);
    console.log(terms);
    //var listingsData = JSON.parse(terms);
    console.log("filtered listing data data", terms);
    console.log(terms.length);
    
    
    var listingsDiv = document.getElementsByClassName("listings")[0];
    listingsDiv.replaceChildren();
    if(terms.length == 0){
        let h1 = document.createElement("h1");
        let txt = document.createTextNode("Sorry, nothing came up for your filters.");
        h1.appendChild(txt);
        listingsDiv.appendChild(h1);
    }

    terms.forEach(function(listingData) {
        listingData = JSON.parse(listingData);
        listingsDiv.appendChild(getListing(listingData, true))
    });
}
