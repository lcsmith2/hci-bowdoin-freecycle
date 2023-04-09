function performSearch(){
    var searchQuery = document.getElementById("search").value;
    console.log(searchQuery);

    var filteredListings = searchListings(searchQuery);
    displaySearchListings(filteredListings);


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
        listingsDiv.appendChild(getListing(listingData, true, true))
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
        listingsDiv.appendChild(getListing(listingData, true, true))
    });


}


function displayListings() {

    if(localStorage.categoryFiltered){
        displayCategoryFilterListings(localStorage.getItem("categoryFiltered").toLowerCase());
        localStorage.removeItem("categoryFiltered");
    } else {
        var listingsData = getListingsData();

        var listingsDiv = document.getElementsByClassName("listings")[0];
        listingsDiv.replaceChildren();
        listingsData.forEach(function(listingData) {
            listingsDiv.appendChild(getListing(listingData, true, true))
        });
    }

   
}
  

function displayCategoryFilterListings(category){
    window.onload = function(){
      console.log("category filter display");
  
      let listings = getListingsData();
  
      var listingsDiv = document.getElementsByClassName("listings")[0];
      listingsDiv.replaceChildren();
  
     
      let addedListing = false;

      listings.forEach(function(entry) {
        if(entry.category.toLowerCase() == category.toLowerCase()){
            addedListing = true;
            listingsDiv.appendChild(getListing(entry, true, true))
        }
        
     });
    
      if(!addedListing){
        let h1 = document.createElement("h1");
        let txt = document.createTextNode("Sorry, no items currently in this category.");
        h1.appendChild(txt);
        listingsDiv.appendChild(h1);

    } 
      
  
   
      
     }
    
  
  
  }

  
document.addEventListener("DOMContentLoaded", function(event) {
    displayListings();
});
