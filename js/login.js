
function saveUser(){
    var userName = document.getElementById('inputUsername').value;
    var passWords = document.getElementById('inputPassword').value;
    if (userName === undefined || userName === null || userName === "" ||
        passWords === undefined || passWords === null || passWords === ""){
        alert("Must have valid username and passwords!");
        return;
    }
    localStorage.user = userName;
    if (localStorage.toRequest !== undefined) {
        location.href = "listings.html";
    }
    else {
        location.href = "dashboard.html";
    }
}



