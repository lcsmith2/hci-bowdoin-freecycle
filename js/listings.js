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


function performSearch(){
    var searchQuery = document.getElementById("search").value;
    console.log(searchQuery);

    var filteredListings = searchListings(searchQuery);
    displaySearchListings(filteredListings);


}

function openFilterPopup(){

    
    let filterButton = document.getElementById("filterbutton");
    filterButton.setAttribute("data-toggle", "modal");
    filterButton.setAttribute("data-target", "#filter-modal");
    document.getElementById("filter-modal").setAttribute("aria-hidden", "false");
    console.log("aria visible??");
    
     
}
   
function performFilter(){
    displayFilterListings(filterListings());
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
                categoryStates.push(node.value);
            }
        }
        
    }
    );
    console.log(categoryStates);
    //by condition
    let conditionStates = new Array();
    let condition = document.getElementById("condition");
    const condition_children = condition.childNodes;
    condition_children.forEach(function(node) {
        if(node.nodeName == "INPUT"){
            console.log(node.value);
            if(node.checked ){
                conditionStates.push(node.value);
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


    var filteredListings;
    listingsData.forEach( function(entry) {

        //check category value match
        if(entry.category.toLowerCase() in categoryStates && entry.condition.toLowerCase() in conditionStates){
            console.log("category and conditon match");
            if(isFree){
                if(entry.price == "Free" || entry.price == "") filteredListings.appendChild(getListing(entry, true));

            } else {
                if(parseFloat(entry.price) < parseFloat(price_lim)) filteredListings.appendChild(getListing(entry, true));
            }
            
        }
        
        }
    );
    console.log(filteredListings);
    return filteredListings;
}

function displaySearchListings(terms) {
    
    //var data = JSON.parse(terms);
    console.log(terms);
    //var listingsData = JSON.parse(terms);
    console.log("listings data", terms);
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


function displayListings() {
    if (localStorage.listingsData === undefined) {
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