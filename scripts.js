// Variable called API 
const api = ''; // enter API key here

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

// event lisener. Event is looking for page load. Upon load it executes function. 
window.addEventListener('load', () => {
  let long;
  let lat;

    // Accessing Geolocation of User
    //The Geolocation.getCurrentPosition() method is used to get the current position of the device.
    // Must allow browser to access your location. 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {

      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //query paramater
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      // Javascript promise
      //The fetch API enables us to call and get data from API services
      //We will pass in the base variable inside it.
      fetch(base)
        .then((response) => {
          //The value that is returned after passing the base URL is converted into JSON
          return response.json();
        })

        //Destructuring / extracting data from objects.
        .then((data) => {
          const { temp, feels_like } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          //convert the celsius to Fahrenheit
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});