const api = {
    key: "f7c205ae54fdc1bb1082d3bd93623223",
    base: "https://api.openweathermap.org/data/2.5/"
};
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
    }
}
function search() {
    var input = document.getElementById("searchInput");
    var city = input.value.toLowerCase().split(' ');
    for (var i = 0; i < city.length; i++) {
        city[i] = city[i].charAt(0).toUpperCase() + city[i].slice(1);
    }
    var formattedCity = city.join(' ');
    var weatherContent = document.getElementById("weatherContent");
    weatherContent.style.display = "block";
    weatherContent.innerHTML = `
        <div class="location">
            <div class="city">${formattedCity}</div>
            <!-- Other weather details -->
        </div>
        <!-- More weather details -->
    `;
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}
function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    
    setBackgroundImage(weather.weather[0].main);
    
    document.querySelector('.content').style.display = 'block';
}
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    return `${day} ${date} ${months[month]} ${year}`;
}
function setBackgroundImage(weatherCondition) {
    let backgroundImageUrl;
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            backgroundImageUrl = 'images/clear.png';
            break;
        case 'clouds':
            backgroundImageUrl = 'images/cloudy.png';
            break;
        case 'rain':
            backgroundImageUrl = 'images/rainy.png';
            break;
        case 'drizzle':
            backgroundImageUrl = 'images/drizzle.png';
            break;
        case 'thunderstorm':
            backgroundImageUrl = 'images/thunderstorm.png';
            break;
        case 'snow':
            backgroundImageUrl = 'images/snowy.png';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
            backgroundImageUrl = 'images/mist.png';
            break;
        case 'squall':
        case 'tornado':
            backgroundImageUrl = 'images/tornado.png';
            break;
        default:
            backgroundImageUrl = 'images/default.png';
            break;
    }
    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.content').style.display = 'none';
});