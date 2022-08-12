# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

### where did changes happen?

server.js:
1. reused a lot of ideas and some code from the Scripts.
2. changed some functions to be defined using => funtionality
3. extended the dataset to have 4 entires -> added the city name

app.js:
1. Added API Key information, created a varibale only for the API Key, so that it could be reused, if in a future project you should enter the API Key of the user.
2. created one major function "combineZipWeather" that combines all sub functionalities of the asynchronous functions
3. created several asynch functions to cope with:
    a) retrieveWeatherData
    b) postData
    c) updateUI
4. at the end of the file is the Eventlistener to start everything after clicking the Generate button

index.html + style.css:
Nothing changed, I kept everything boring