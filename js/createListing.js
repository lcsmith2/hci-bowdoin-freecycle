const form = document.querySelector('#listing-form');
form.addEventListener('submit', handleSubmit);

let curr_listings = JSON.parse(localStorage.listingsData);

function enablePrice(){
    document.querySelector("#priceInput").disabled = false;
}

function disablePrice(){
    document.querySelector("#priceInput").disabled = true; 
}

function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    //now, we edit value
    //if free exists, make price free and then delete
    //add user as current logged in user
    //make id the size of defaultListings.json, + 1
    
    if(value["free"]){
        value["price"] = "Free";
        delete value["free"];
    }
    value["category"] = value["category"].toLowerCase();
    
    delete value["img"];
    value["user"] = localStorage.getItem("user");
    value["requests"] = [];

    //for now, wizard of oz
    value["image"] = "./assets/placeholder.png";
    //set id
    let new_id = (defaultListingsData.length ); //we start 0 indexed so this should be ok
    value["id"] = new_id.toString();

    //alert(value);
    console.log({ value });

    if (localStorage.listingsData === undefined) {
        localStorage.listingsData = JSON.stringify(defaultListingsData);
    }
    let curr_listings = JSON.parse(localStorage.listingsData);
    //make sure required fields were defined 
    

    //console.log(curr_listings);
    if(value["name"] != "" && value["description"] != "" && value["category"] != "" && value["condition"] != ""){

        curr_listings.push(value);
        localStorage.listingsData = JSON.stringify(curr_listings);
        console.log("pushed");
        window.location.href = "listing-success.html";
    } else {
    
        $('#submission-modal').modal('show');
    }
  }
