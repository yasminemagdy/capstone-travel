/* Global Variables */
const geoNamesUrl = "http://api.geonames.org/searchJSON?q=";
const cityname = document.getElementById('cityname');
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
    const datv = date.value;
    const cityv = cityname.value;
    const leve = leaveCity.value

    if(datv== "") {
        alert('Please Fill Out The Date Field')
        return false;
    }

    if(cityv == ""){
        alert('Please Fill Out The Empty Field')
        return false
    }
    
    if(leve == ""){
        alert("Please Fill Out The Empty Field")
        return false
    }

    getData(geoNamesUrl , cityv , user)
    .then(function(u) {
        console.log(u)
        postData("/add" , {cityv , leve , datv , countryName:u.geonames[0].countryName , lng:u.geonames[0].lng , lat:u.geonames[0].lat});
        UI();
        //Function to updat UI
    })
}

/* Function to GET Web API Data*/
const getData = async (geoNameUrl , cityv , user) => {
    const response = await fetch(geoNameUrl + cityv +"&maxRows=10&username="+ user );
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
            countryName:data.countryName,
            latitude:data.lat,
            longitude:data.lng,
            leaving : data.leve ,
            cityName :data.cityv,
            date : date.value,
            daysLesft: daysLeft,
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
        document.getElementById('l').innerHTML = `You are leaving from : ${leaveCity.value}`;
        document.getElementById('c').innerHTML = `To: ${wholeData.cityName} in ${wholeData.countryName}`;
        document.getElementById('de').innerHTML = `On: ${wholeData.date}`;
        document.getElementById('countdown').innerHTML = `Time Left: `
    }catch(error){
        console.log("error" , error)
    }
};
export{action}