/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// we should add 1 to getMonth() fun as it starts from 0, then 1, ...
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

//get the key from OpenWeatherMap.com
const apiKey = "9797e77991b7799ff70b59381798d685";

//async function to get the data from OpenWeatherMap URL

const URL = async (baseURL) => {
    
    const res = await fetch(baseURL)
    const data = await res.json();
    //console.log(data)
    return data.main.temp;
}

async function weatherData(){ 
    try {
        // get the entered zip code to send it to API
        const zip =  document.getElementById('zip').value;
        if (!zip){
            alert("Please enter zip code")
        }
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`;
        // call URL function with API link
        let temp = URL(baseURL);
        const feeling =  document.getElementById('feelings').value;
        await fetch ("/postWeather",{
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                date: newDate,
                temp: temp,
                feelings: feeling})
            
            })  
                // get metod
         const response = await fetch ("/getWeather",{
            method: "GET",
            credentials: "same-origin",
        })
        const update = await response.json();
        return update;
        //console.log(temp);
        //console.log(date);
        //console.log(feelings);
        console.log(update);
        
        //updateUI(update); 
    }
    
     catch(error) {
     console.log("error", error);
    }
}
function updateUI(update){
    document.getElementById("date").innerHTML = 'Date: ' + update.date;   
    document.getElementById("temp").innerHTML = 'Temp: ' + update.temp;
    document.getElementById("content").innerHTML = 'Feeling: ' + update.feelings;
    
}
function ask (e){
    weatherData;
    .then(function (update){
        updateUI; 
    })
  
}
// call the weatherData when clicked the generate button
document.getElementById('generate').addEventListener('click', ask);
/** 
async function get_post(temp){
    //console.log(temp)
    //post method
    const feeling =  document.getElementById('feelings').value;
    await fetch ("/postWeather",{
        method: "POST",
        credentials: "same-origin",
        body: {
           temp: temp,
        }
    })
   // get metod
   const res = await fetch ("/getWeather",{
       method: "GET",
       credentials: "same-origin",
   })
}*/
/*
weatherData
.then((temp)=> {
const feeling =  document.getElementById('feelings').value;
await fetch ("/postWeather",{
    method: "POST",
    credentials: "same-origin",
    body: {
       temp: temp,
    }
})
// get metod
const res = await fetch ("/getWeather",{
   method: "GET",
   credentials: "same-origin",
})
})
.catch((error)=>{
    console.log("error", error);
})
/*
// promise
getWeather
.then((temp)=>{
    console.log(temp)
    // get metod
    await fetch ("/getWeather",{
        method: "GET",
        credentials: "same-origin",
    })
     //post method
     const feeling =  document.getElementById('feelings').value;
     const a = await fetch ("/postWeather",{
         method: "POST",
         credentials: "same-origin",
         body: {
            data: newDate,
            temp: data.main.temp,
            feelings: feelings

        }
     })
    const b = await.b.json();
    updataUI(b);
   
})
.then(data => {
    updataUI();
})
.catch((error)=>{
    console.log("error", error);
})
/* Spin up the server*/
/** 
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };
  app.use((req, res, next) => {
    console.log("Time:", new Date())
    next()
})

app.get('/', sendData);

function sendData (request, response) {
  response.send("home");
};

app.get('/hello', (req, res) => {
    res.send("hello"); 
}) **/


