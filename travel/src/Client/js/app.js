/* Global Variables */
const geoNamesUrl = "http://api.geonames.org/searchJSON?q=";
const cityname = document.getElementById('cityname');
const leaveCity = document.getElementById('leave')
const date = document.getElementById('date');
const user = "yasmine";

// weatherbit API and URL 
const weatherBitAPI = `https://api.weatherbit.io/v2.0/forecast/daily?`;
const weatherKEY = "d7bf7e7673614d349a16686a8d4e2149"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'-'+ d.getDate()+'-'+ d.getFullYear();

//days left
const daysLeft = new Date(date.value)
const f = daysLeft.getDate() - d.getDate();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click' , action);

/* Function called by event listener */
function action(event) {
    event.preventDefault();
    const datv = date.value;
    const cityv = cityname.value;
    const leve = leaveCity.value;

    if(leve == cityv){
        alert('OHH It seems like your in the city itself! , Go to another city')
        return false;
    }

    if(datv== "") {
        alert('Please Fill Out The Date Field')
        return false;
    }

    if(cityv == ""){
        alert('Please Fill Out The Second Field')
        return false
    }
    
    if(leve == ""){
        alert("Please Fill Out The First Field")
        return false
    }

    getCityData(geoNamesUrl , cityv , user)
    .then(function(u) {
        const city_lat = u.geonames[0].lat;
        const city_lng = u.geonames[0].lng;
        getWeatherbit(city_lat, city_lng)
        .then((u) => {
            console.log(u);
            postData('/weather' , {weather: u.data[0].temp})
        }).then(() => {
            console.log(u)
            postData("/add" , {cityv , leve , datv ,countryName:u.geonames[0].countryName , lng:u.geonames[0].lng , lat:u.geonames[0].lat});
            UI();
        })
       
    })
}

/* Function to GET City API Data*/
const getCityData = async (geoNameUrl , cityv , user) => {
    const response = await fetch(geoNameUrl + cityv +"&maxRows=10&username="+ user );
    try{
        const Data = await response.json();
        return Data;
    }catch(err){
        console.log("error" , err)
    }
}

/* Function to GET Weather API Data */
const getWeatherbit = async (city_lat, city_lng) => {
    const request = await fetch(weatherBitAPI +`lat=${city_lat}&lon=${city_lng}&key=${weatherKEY}`)
    try{
        const wd = await request.json();
        return wd;
    }catch(error){
        console.log("error" , error)
    }
}


/* Function to POST data */
const postData = async (url="" , data={}) => {
    //days left
    const daysLeft = new Date(date.value)
    const f = daysLeft.getDate() - d.getDate();  
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
            daysleft:f,
            weather : data.weather
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
        //days left
        const daysLeft = new Date(date.value)
        const f = daysLeft.getDate() - d.getDate();  
        const wholeData = await request.json();
        document.getElementById('l').innerHTML = `Your Trip from : ${leaveCity.value}`;
        document.getElementById('c').innerHTML = `To: ${wholeData.cityName} in ${wholeData.countryName}`;
        document.getElementById('de').innerHTML = `On: ${wholeData.date}`;
        document.getElementById('after').innerHTML = `After : ${f} Days`;
        document.getElementById('weather').innerHTML = `Temp : ${wholeData.weather} Celsius`
    }catch(error){
        console.log("error" , error)
    }
};
export{action}