const apiKey = "490d72abfd0dbd86ee2449951868f900";
async function getWeather() {
  const city = document.getElementById("cityname").value;
  if (!city) {
    document.getElementById("searchresult").innerHTML =
      `<p class="error"> Please Enter City Name</p>`;
    return;
  }
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(apiURL);
}
async function getWeatherByCoords(lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(apiURL);
}
async function fetchWeather(apiURL) {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.cod != 200) {
      document.getElementById("searchresult").innerHTML =
        `<p class="error"> ${data.message}</p>`;
      return;
    }
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    document.getElementById("searchresult").innerHTML = `
      <div class="div-2">
        <img src="${iconURL}">
      </div>
      <div class="div-3">
        <h1>${data.main.temp} °C</h1>
        <span>${data.name}</span>
      </div>
      <div class="measure">
        <div class="hum">
          <img src="C:/weather/humidity_727891.png" alt="Humidity icon">
          <h3>Humidity: ${data.main.humidity} %</h3>
        </div>
        <div class="wind">
          <img src="C:/weather/nature_15925757.png" alt="Wind icon">
          <h3>Wind Speed: ${data.wind.speed} m/s </h3>
        </div>
      </div>
      <div class="sun">
        <div class="sunrise">
          <img src="C:/weather/icons8-sunrise-48.png" alt="Sunrise icon">
          <h3>Sunrise: ${sunrise.toLocaleTimeString()}</h3>
        </div>
        <div class="sunset">
          <img src="C:/weather/icons8-sunset-50.png" alt="Sunset icon">
          <h3>Sunset: ${sunset.toLocaleTimeString()}</h3>
        </div>
      </div>`;
  } catch (error) {
    document.getElementById("searchresult").innerHTML =
      `<p class="error"> Error fetching data</p>`;
  }
}
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        document.getElementById("searchresult").innerHTML =
          `<p class="error"> Location access denied. Please search manually.</p>`;
      } );
  } else {
    document.getElementById("searchresult").innerHTML =
      `<p class="error"> Geolocation not supported</p>`;
  }
};
