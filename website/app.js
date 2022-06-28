/* Global Variables */
// const for all ids
const APIKey = 'c2f3eb50c8bd319a319657b70f903a9a';
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

// Upgrade UI
let zipHTML = '<label for="zip">Enter Zipcode here</label><input type="text" id="zip" placeholder="enter zip code here"><label for="country">Enter Countrycode here</label><input type="text" id="country" placeholder="enter country code here">';
zipHTML += '<fieldset><legend for="units">Select Units</legend><input type="radio" name="units" id="metric" value="metric">Metric<input type="radio" name="units" id="imperial" value="imperial" checked>Imperial<br/></fieldset></div>';
let entryHolderHTML = '<div id="date"></div><div id="city"></div><div id="temp"></div><div id="content"></div>';

//  safety check and info => us
//  units => rework

// Create a new date instance dynamically with JS
let d = new Date();
console.log(d);
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);

// Personal API Key for OpenWeatherMap API
const BaseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

/* Function called by event listener */
const handleGenerate = async () => {
  const zip = document.getElementById('zip');
  const country = document.getElementById('country');

  if (zip.value !== '' && country.value !== '' && feelings.value !== '') {

    let units = '';
    for(var i = 0; i < document.getElementsByName("units").length; i++)
    {
        if(document.getElementsByName("units")[i].checked == true)
        {
          units = document.getElementsByName("units")[i].value;
        }
    }

    const weatherURL = `${BaseUrl}zip=${zip.value},${country.value}&appid=${APIKey}&units=${units}`;
    const jsonData = await getAPIData(weatherURL);
    const data = {date: newDate, city: jsonData.name, temp: jsonData.main.temp, feelings: feelings.value};

    postToAPI(data);
    refreshUI();

  } else {

    alert('You need to enter all values!');

  }
}

/* Function to GET Web API Data*/
const getAPIData = async (weatherURL) => {
  const response = await fetch(weatherURL);
  let jsonData = response.json();
  return jsonData;
}

/* Function to POST data */
const postToAPI = async (data) => {
  const post = await fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: data.date,
      city: data.city,
      temp: data.temp,
      content: data.feelings
    })
  });
}

/* Function to GET Project Data */
//const refreshUI = (data) => {
//  const date = document.getElementById('date');
//  const city = document.getElementById('city');
//  const temp = document.getElementById('temp');
//  const content = document.getElementById('content');
//  date.innerHTML = `Date: ${data.date}`;
//  city.innerHTML = `City: ${data.city}`;
//  temp.innerHTML = `Temp: ${data.temp}`;
//  content.innerHTML = `Feels: ${data.feelings}`;
//}

const refreshUI = async () =>{
 const request = await fetch('/all');
 try {
 // Transform into JSON
 const allData = await request.json()
 // Write updated data to DOM elements
 document.getElementById('date').innerHTML = allData.date;
 document.getElementById('city').innerHTML = allData.city;
 document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
 document.getElementById('content').innerHTML = allData.feel;
 }
 catch(error) {
   console.log("error", error);
 }
}

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', handleGenerate);
window.onload = (e) => {
  document.querySelector('.zip').innerHTML = zipHTML;
  document.querySelector('#entryHolder').innerHTML = entryHolderHTML;
}
