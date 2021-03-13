/* Global Variables */
const geoNamesUrl = "http://api.geonames.org/searchJSON?q=";
const arriveCity = document.getElementById('cityname');
const leaveCity = document.getElementById('leave')
const date = document.getElementById('date');
const user = "yasmine";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click' , action);

/* Function called by event listener */
function action(event) {
    event.preventDefault();

    const nameOfCity = arriveCity.value;
    //checking if zip is empty !
    if(nameOfCity == "") {
        alert("Please Fill Out The Empty Field");
        return false;
    }

    getData(geoNamesUrl , arriveCity , user)
    .then(function(u) {
        console.log(u)
        postData("/add" , {countryName : u.geonames[0].countryName , longitude: u.geonames[0].lng , latitude: u.geonames[0].lat});
        UI();
        //Function to updat UI
    })
}

//values 
const arriveCityValue = arriveCity.value;
const leavValue = leaveCity.value;
const dateValue = date.value;
/* Function to GET Web API Data*/
const getData = async (geoNameUrl , arriveCityValue , user) => {
    const response = await fetch(geoNameUrl + arriveCityValue + "maxRows=10&" + "username=" + user );
    try{
        const Data = await response.json();
        return Data;
    }catch(err){
        console.log("error" , err)
    }
}

/* Function to POST data */
const postData = async (url="" , data={}) => {
    const request = await fetch(url , {
        method :"POST" ,
        mode: 'cors',
        credentials : "same-origin" ,
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            latitude : data.countryName,
            longitude : data.lat ,
            country : data.lng
        })
    });
    try{
        const newD = await request.json();
        return newD;
    }catch(error){
        console.log("error" , error)
    }
};

const UI = async () => {
    const request = await fetch("/all");
    try{
        const wholeData = await request.json();
        document.getElementById('leave').innerHTML = `You are leaving from : ${wholeData.country}`;
        document.getElementById('cityname').innerHTML = `To: ${wholeData.latitude}`;
        document.getElementById('date').innerHTML = `On: ${wholeData.longitude}`;
    }catch(error){
        console.log("error" , error)
    }
};
export{action}