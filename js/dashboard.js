function displayWelcome(){
    console.log("display", localStorage.user, localStorage.user === undefined || localStorage.user === null || localStorage.user === "");
    if (localStorage.user === undefined || localStorage.user === null || localStorage.user === ""){
        return;
    }
    console.log(document.getElementById("welcomeMessage"));
    document.getElementById("welcomeMessage").innerHTML = "Welcome back " + localStorage.user + " !";
}

document.addEventListener("DOMContentLoaded", function(event) {
    displayWelcome();
});