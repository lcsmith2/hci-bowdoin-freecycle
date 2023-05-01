function getListingsData() {
  if (localStorage.listingsData === undefined) {
    localStorage.listingsData = JSON.stringify(defaultListingsData);
  }
  return JSON.parse(localStorage.listingsData);
}
function userLoggedIn() {
  return localStorage.user !== undefined && localStorage.user !== null;
}

function updateNav() {
  var navbar = document.getElementsByClassName("navbar-nav")[0];
  var navbarRight = document.getElementsByClassName("navbar-right")[0];
  var loginLogout = document.createElement("li");
  var loginLogoutLink = document.createElement("a");
  if (!userLoggedIn()) {
    loginLogoutLink.href = "login.html";
    loginLogoutLink.appendChild(document.createTextNode("Log in"));
  }
  else {
   

    /* listing creation code */
    var createlisting = document.createElement("li");
    if (location.href.includes("create-listing.html")) {
      createlisting.classList.add("active");
    }
    var createListingLink = document.createElement("a");
    createListingLink.href = "create-listing.html";
    createListingLink.appendChild(document.createTextNode("Create Listing"));
    createlisting.appendChild(createListingLink);
    navbar.append(createlisting);


    var dashboard = document.createElement("li");
    if (location.href.includes("dashboard.html")) {
      dashboard.classList.add("active");
    }
    var dashboardLink = document.createElement("a");
    dashboardLink.href = "dashboard.html";
    dashboardLink.appendChild(document.createTextNode("Dashboard"));
    dashboard.appendChild(dashboardLink);
    navbar.appendChild(dashboard);
    

    loginLogoutLink.href = "logged-out.html";
    loginLogoutLink.appendChild(document.createTextNode("Log out"));
  }
  loginLogout.appendChild(loginLogoutLink);
  navbarRight.appendChild(loginLogout);
}



document.addEventListener("DOMContentLoaded", function(event) {
    updateNav();
    
});
