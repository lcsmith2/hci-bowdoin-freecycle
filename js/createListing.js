//import {defaultListingsData} from defaultListingsData.js;

const form = document.querySelector('#listing-form');
form.addEventListener('submit', handleSubmit);

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

    defaultListingsData.push(value);
    console.log(defaultListingsData[defaultListingsData.length - 1]);
    console.log("pushed?");
  }


// function createTheListing(){

//     console.log("yeah!");
//     //get the info from each listing item
//     let form = document.getElementById("listing-form");
//     let data = new FormData(form);
//     for (let [key, val] of data) {
//         //alert(key.toString() +  val.toString() +  "<3");
//         console.log(key, val, "<3");
//     }

 


// }