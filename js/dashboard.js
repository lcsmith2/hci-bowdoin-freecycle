function displayWelcome(){
    if (localStorage.user === undefined || localStorage.user === null || localStorage.user === ""){
        return;
    }
    if( document.getElementById("welcomeMessage")){
        document.getElementById("welcomeMessage").innerHTML = "Welcome back " + localStorage.user + " !";
    }
   
}

function displayRequests(){
    var listingsData = getListingsData();
    var listingsDiv = document.getElementsByClassName("requests")[0];
    if(listingsDiv) listingsDiv.replaceChildren();
    for (var i = 0; i < listingsData.length; i++) {
        if (userRequestedItem(listingsData[i])){
            listingsDiv.appendChild(getListing(listingsData[i], true, true, "Cancel"));
        }
    }
}

function userRequestedItem(listing){
    var request = false;
    for (var i = 0; i < listing.requests.length; i++) {
        if (listing.requests[i].user === localStorage.user){
            request = true;
        }
    }
    return request;
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayWelcome();
    displayRequests();
});
