function displayWelcome(){
    console.log("display", localStorage.user, localStorage.user === undefined || localStorage.user === null || localStorage.user === "");
    if (localStorage.user === undefined || localStorage.user === null || localStorage.user === ""){
        return;
    }
    console.log(document.getElementById("welcomeMessage"));
    document.getElementById("welcomeMessage").innerHTML = "Welcome back " + localStorage.user + " !";
}

function displayRequests(){
    var listingsData = getListingsData();

    var listingsDiv = document.getElementsByClassName("requests")[0];
    listingsDiv.replaceChildren();
    listingsData.forEach(function(listingData) {
        listingsDiv.appendChild(getListing(listingData, true, "Cancel"))
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayWelcome();
    displayRequests();
});
