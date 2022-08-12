
/* Global Variables */

/*API Setup*/
// With the created account in openweather, we can use the key to retrieve data:
const apiKey = 'ec046d5af5afe0b77755a72576ea8c6e&units=imperial';
// data will be retrieved via the following api: e.g.: https://api.openweathermap.org/data/2.5/weather?zip=10038&appid=ec046d5af5afe0b77755a72576ea8c6e&units=imperial
// As we want to include the zip code by the user, the url needs to be split into several parts:
const urlStart = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const urlAdd = '&appid=';
// lateron the zip code + apikey will be added to use it properly


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


/* main function */
// → get the zip code entered, use the Api Key in Combination with the zip code, retrieve weather data, add sentiment of the user, post everything to the page
function combineZipWeather(element) {
  element.preventDefault();

  // to build the final url to retrieve the weather data we need the zip input + variables from before
  const zipEntered = document.getElementById('zip').value;
  const url = urlStart + zipEntered + urlAdd + apiKey;
  
  // use combined url to retrieve data
  retrieveWeatherData(url)
    // afterwards use date + temperature + sentiment to post the data
    .then( function (weatherData) {
      postData('/add', { date: newDate, temp: weatherData.main.temp, content: document.getElementById('feelings').value, city: weatherData.name})
    })
    // update the UI, so that the data is visible to the user
    .then( function(data) {
      updateUI()
    }
    )
}

/* some asynchronous helper functions */
// Building a retrieve weather data function, as done in the scripts. 
const retrieveWeatherData = async (url) => {
  const request = await fetch(url);
  try {
    const weaterData = await request.json();
    return weaterData;
  }
  catch (error) {
    console.log("some error happend while retrieving weather data", error);
  }
}

// Async POST, as in the scripts:
const postData = async (url='', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
      city: data.city
    }),       
  })

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// as in the Script, we will use the updateUI function, element-IDs are given by the index.html
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'On the: ' + allData.date;
    document.getElementById('temp').innerHTML = 'It is ' + Math.round(allData.temp)+ ' degrees in ' + allData.city ;
    document.getElementById('content').innerHTML = 'And I am feeling ' + allData.content;

  } catch (error) {
    console.log("some error happend", error);
  }
}


/*Event Listeners*/
// Whenever you click on "Generate"-button, we need to perform the appropriate action
// → get the zip code entered, use the Api Key in Combination with the zip code, retrieve weather data, add sentiment of the user, post everything to the page
document.getElementById('generate').addEventListener('click', combineZipWeather);