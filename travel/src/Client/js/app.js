/* Global Variables */
const cityname = document.getElementById('cityname');
const leaveCity = document.getElementById('leave')
const date = document.getElementById('date');
const endDate = document.getElementById('endDate');
const endDateValue = endDate.value;

//Geonames URL and API(user)
const geoNamesUrl = "http://api.geonames.org/searchJSON?q=";
const user = "yasmine";

// weatherbit API and URL 
const weatherBitAPI = `https://api.weatherbit.io/v2.0/forecast/daily?`;
const weatherKEY = "d7bf7e7673614d349a16686a8d4e2149"

//pixabay API and URL
const pixabayurl = "https://pixabay.com/api/?"
const pixabayKey = `key=20714610-a23f0d89119822e7408d9b201&`

// Create a new date instance dynamically with JS
let d = new Date();

//days left
const daysLeft = new Date(date.value)
const f = daysLeft.getDate() - d.getDate();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click' , action);

/* Function called by event listener */
function action(event) {
    event.preventDefault();
    //get Values
    const datv = date.value;
    const cityv = cityname.value;
    const leve = leaveCity.value;
    
    //get day from date input
    const validDate = new Date(date.value).getDate();
    const validEndDate = new Date(endDate.value).getDate();
    
    //check if the user but the date in the right way , the arrive day of course cannot be higher than the leave date
    if(validDate > validEndDate){
        alert('Pleas put a valid date')
        return false;
    }
    
    //if the user but the arrive city and leave city , the same value , so he is in the country itself!
    if(leve == cityv){
        alert('OHH It seems like your in the city itself! , Go to another city')
        return false;
    }
    
    //if any date field is empty , make an alert to fill it 
    if(datv && endDateValue == "") {
        alert('Please Fill Out The Date Field')
        return false;
    }
    
    //if city name is empty , make an alert to fill it 
    if(cityv == ""){
        alert('Please Fill Out The Second Field')
        return false
    }
    
    //if leave city is empty , make an alert to fill it
    if(leve == ""){
        alert("Please Fill Out The First Field")
        return false
    }
    // Time to get the data from APIs , first th geonames , to use its latitude and longitude on weatherbit API 
    getCityData(geoNamesUrl , cityv , user)
    //then take the latitude and longitude
    .then(function(u) {
        const city_lat = u.geonames[0].lat;
        const city_lng = u.geonames[0].lng;
        //push it to weatherbit , to get the weather using latitude and longitude
        getWeatherbit(city_lat, city_lng)
        .then((u) => {
            //console.log(u);
            postData('/weather' , {temp: u.data[0].temp , des: u.data[0].weather.description})
        })
        .then(() => {
            //after the weather and country is attende , then make a link to take the user tot he trip information
            document.getElementById('small').style.display = 'block'
            //scroll smoothly
            document.getElementById('small').addEventListener('click' , function(){this.scrollIntoView({behavior:'smooth'})})
           // console.log(u)
            postData("/add" , {cityv , leve , datv , countryName:u.geonames[0].countryName , lng:u.geonames[0].lng , lat:u.geonames[0].lat});
            UI();

        })
    }).then(() =>  { 
        //then we need to get the img from pixabay API
        getImg(pixabayurl , pixabayKey)
        .then((u) => {
         //document.querySelector('#weather').scrollTo({behavior:"smooth"})
           // console.log(u)
            postData('/imag' , {img:u.hits[0].webformatURL})
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

//Function To GET Photo API Data
const getImg = async (pixabayurl , pixabayKey) => {
    const response = await fetch(pixabayurl + `${pixabayKey}q=${cityname.value}&image_type=photo&category=places`);
    console.log(response)
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log('error' , error)
    }


}

/* Function to POST data */
const postData = async (url="" , data={}) => {
    //days left
    const daysLeft = new Date(date.value)
    const f = daysLeft.getDate() - d.getDate();  
    //length
    const len = new Date(endDate.value)
    const lenv = len.getDate() - daysLeft.getDate()

    const request = await fetch(url , {
        method :"POST" ,
        credentials : "same-origin" ,
        mode:'cors',
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
            temp : data.temp,
            des: data.des,
            img:data.img,
            lenv:lenv,
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
        Math.abs(f)

        //length
        const len = new Date(endDate.value)
        const lenv = len.getDate() - daysLeft.getDate()
        Math.abs(lenv)
        const wholeData = await request.json();
        //Update elements with new information
        document.getElementById('fromToCity').innerHTML = `Your Trip from : ${leaveCity.value} To ${wholeData.cityName} in ${wholeData.countryName}`;
        document.getElementById('fromToDate').innerHTML = `You will Arrive On: ${wholeData.date} , ${f} Days For Your Journey , You'll be there for ${lenv} days! , ENJOY`
        document.getElementById('weather').innerHTML = `Expected Weather To Be : ${wholeData.des} wiht temp: ${wholeData.temp} Celsius <br><br>`
        document.getElementById('img').innerHTML = `<img src="${wholeData.img}" alt="cityImg" width="680px" height = "250px">`
    }catch(error){
        console.log("error" , error)
    }
};

export{action}