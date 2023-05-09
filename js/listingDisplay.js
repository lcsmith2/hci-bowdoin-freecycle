function performSearch(){

    let filters = document.getElementById("filter-list");
    filters.replaceChildren();

    var searchQuery = document.getElementById("search").value;

    var filteredListings = searchListings(searchQuery);
    displaySearchListings(filteredListings);


}
   
function performFilter(){

    displayFilterListings(filterListings());
    console.log(getFilterList())

    // display filter list
  let filterDictHtml = getFilterList();
  //clear old filters
    let fil_list = document.getElementById("filter-list");
    while(fil_list.hasChildNodes()){
        fil_list.firstChild.remove();
    }
//   var all_state_text = document.getElementsByClassName('filtered-state');
//   while(all_state_text.length > 0){
//     all_state_text[0].parentNode.removeChild(all_state_text[0]);
//   }
//   all_state_text.parentNode.remove(all_state_text);

  //FIGURE OUT HOW TO PRINT EACH KEY, VALUE PAIR AFTER GETTING THE DICTIONARY

  var space = document.createElement('p');


  var z = document.createElement('p');
  z.classList.add("filter-status");
  if (filterDictHtml.category.length > 0) {
    z.innerHTML = "Category: ";
  }
   document.getElementById("filter-list").appendChild(z);
  filterDictHtml.category.forEach(function(category) {
    console.log("category", category);
    var z = document.createElement('div');
    z.setAttribute("class", "filtered-state");
    z.innerHTML = category;
    document.getElementById("filter-list").appendChild(z);
   })
  ;

   var y = document.createElement('p');
   y.classList.add("filter-status");
   if (filterDictHtml.condition.length > 0) {
    y.innerHTML = "Condition: ";
   }
   document.getElementById("filter-list").appendChild(y);
  filterDictHtml.condition.forEach(function(condition) {
    console.log("condition", condition);
    var y = document.createElement('div');
    y.setAttribute("class", "filtered-state");
    y.innerHTML = condition;
    document.getElementById("filter-list").appendChild(y);
   });

   var x = document.createElement('p');
   x.classList.add("filter-status");
   if (filterDictHtml.price.length > 0) {
    x.innerHTML = "Price Limit: ";
   }
   document.getElementById("filter-list").appendChild(x);
  filterDictHtml.price.forEach(function(price) {
    console.log("price", price);
    var x = document.createElement('div');
    x.setAttribute("class", "filtered-state");
    x.innerHTML = "$" + price.split(" ")[1];
    document.getElementById("filter-list").appendChild(x);
   });
   
  //document.getElementById("filter-list").innerHTML = filterListHtml;


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
        
        if (matchName != -1 || matchDescription != -1){          
            listingsObj.push(JSON.stringify(entry));
           
        }
    }
    );

    return listingsObj;
}

function filterListings(){
    if (localStorage.listingsData === undefined) {
        localStorage.listingsData = JSON.stringify(defaultListingsData);
    }
    var listingsData = JSON.parse(localStorage.listingsData);

    //get filter info

    //by category
    let categoryStates = [];
    let catInfo = document.getElementById("category_check");
    const category_children = catInfo.childNodes;
    category_children.forEach(function(node) {
        if(node.nodeName == "INPUT"){
            if(node.checked ){
                categoryStates.push(node.value.toLowerCase());
            }
        }
        
    }
    );

    //by condition
    let conditionStates = [];
    let condition = document.getElementById("condition");
    const condition_children = condition.childNodes;
    condition_children.forEach(function(node) {
        if(node.nodeName == "INPUT"){
            if(node.checked ){
                conditionStates.push(node.value.toLowerCase());
            }
        }
    }
    );

    //price
    let price_limit = document.getElementById("price_limit");
    let price_lim = price_limit.value;
    let isFree = (price_lim == 0 || price_lim == null || price_lim == "") ? true : false;

    let filteredListings = [];
    listingsData.forEach( function(entry) {
       
        //check category , condition, price matches
        if ((categoryStates.indexOf(entry.category) != -1 || categoryStates.length == 0) &&
        (conditionStates.indexOf(entry.condition.toLowerCase()) != -1 || conditionStates.length == 0) &&
        (entry.price == "Free" || parseFloat(entry.price) < price_lim || isFree)
        ){
            filteredListings.push(JSON.stringify(entry));
           
        }
        
        }
    );
    
    return filteredListings;
}

function displaySearchListings(terms) {
    
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

function getFilterList() {

    let filterDict = {
        "category": [],
        "condition": [],
        "price": [],
        };

    //let filterList = [];

    // get selected categories
    let categoryCheck = document.querySelectorAll("#category_check input[type=checkbox]:checked");
    categoryCheck.forEach(function (checkbox) {
        filterDict["category"].push(checkbox.value);
    });

    // get selected conditions
    let conditionCheck = document.querySelectorAll("#condition input[type=checkbox]:checked");
    conditionCheck.forEach(function (checkbox) {
        filterDict["condition"].push(checkbox.value);
    });

    // get price limit
    let priceLimit = document.getElementById("price_limit").value;
    if (priceLimit != "") {
        filterDict["price"].push("Price: " + priceLimit.toString());
    }

    
    let filterListHtml = document.createElement("ul");


    for(var key in filterDict) {
        var filterList = filterDict[key];
        console.log(filterList)

    let filterListHtml = document.createElement("p");
    filterList.forEach(function(filter) {
    let filterItemHtml = document.createElement("div");
    let filterTextHtml = document.createTextNode(filter);
    filterItemHtml.appendChild(filterTextHtml);
    filterListHtml.appendChild(filterItemHtml);
    console.log(filterListHtml.outerHTML)
  });
}

  // return HTML list of filters
  //return filterListHtml.outerHTML;

return filterDict;
}