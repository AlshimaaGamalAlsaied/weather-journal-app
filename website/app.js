/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// we should add 1 to getMonth() fun as it starts from 0, then 1, ...
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

//get the key from OpenWeatherMap.com
const apiKey = "9797e77991b7799ff70b59381798d685";

//async function to get the data from OpenWeatherMap URL
async function weatherData(){ 
    try {
        // get the entered zip code to send it to API
        const zip =  document.getElementById('zip').value;
        if (!zip){
            alert("Please enter zip code")
        }
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`;
        const res = await fetch(baseURL)
        // turn the response url to json 
        const data = await res.json();
        let temp = data.main.temp;
        // get the feeling data from user
        const feeling =  document.getElementById('feelings').value;
        //Post method
        await fetch ("/postWeather",{
            method: "POST",
            credentials: "same-origin",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: newDate,
                temp: temp,
                content: feeling})
            
            })  
        }
    
     catch(error) {
     console.log("error", error);
    }
}

// update user's data and show in ui
const updateUI = async () => {
    // get metod
    const response = await fetch ("/getWeather",{
        method: "GET",
        credentials: "same-origin",
    })
    const update = await response.json();
    // update UI 
    document.getElementById("date").innerHTML = 'Date: ' + newDate; 
    document.getElementById("temp").innerHTML = 'Temp: ' + update.temp;
    document.getElementById("content").innerHTML = 'Feeling: ' + update.content;
    } 

// call the weatherData when clicked the generate button
document.getElementById('generate').addEventListener('click', start);

function start(){
    weatherData()
    .then(function(){
        updateUI()
    })
}