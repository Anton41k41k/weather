let storageFollowCity;
let currentCity;

export function toStorageFollow(object) {
  storageFollowCity = JSON.stringify([...object]);
  localStorage.setItem('follow', storageFollowCity);
}

export function toStorageNow(cityNow) {
  currentCity = cityNow.textContent;
  localStorage.setItem('city', currentCity);
}

export function updateWeatherImg(object, imgCloud) {
  switch (object) {
      case 'clear sky':
        imgCloud.src = './img/clouds/clearSky.png';
        break;
      case 'few clouds':
        imgCloud.src = './img/clouds/fewClouds.png';
        break;
      case 'scattered clouds':
        imgCloud.src = './img/clouds/scatteredClouds.png';
        break;
      case 'broken clouds':
      case 'overcast clouds':
        imgCloud.src = './img/clouds/brokenClouds.png';
        break;
      case 'light intensity drizzle':
      case 'drizzle':
      case 'light intensity shower rain':
      case 'shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
      case 'heavy intensity drizzle':
      case 'light intensity drizzle rain':
      case 'drizzle rain':
      case 'heavy intensity drizzle rain':
      case 'shower rain and drizzle':
      case 'heavy shower rain and drizzle':
      case 'shower drizzle':
      case 'shower rain':
        imgCloud.src = './img/clouds/showerRain.png';
        break;
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'rain':
        imgCloud.src = './img/clouds/rain.png';
        break;
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
      case 'light thunderstorm':
      case 'thunderstorm':
      case 'heavy thunderstorm':
      case 'ragged thunderstorm':
      case 'thunderstorm with light drizzle':
      case 'thunderstorm with drizzle':
      case 'thunderstorm with heavy drizzle':
        imgCloud.src = './img/clouds/thunderstorm.png';
        break;
      case 'freezing rain':
      case 'light snow':
      case 'snow':
      case 'heavy snow':
      case 'sleet':
      case 'light shower sleet':
      case 'shower sleet':
      case 'light rain and snow':
      case 'rain and snow':
      case 'light shower snow':
      case 'shower snow':
      case 'heavy shower snow':
        imgCloud.src = './img/clouds/snow.png';
        break;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'sand/dust whirls':
      case 'fog':
      case 'sand':
      case 'dust':
      case 'volcanic ash':
      case 'squalls':
      case 'tornado':
        imgCloud.src = './img/clouds/mist.png';
        break;
    }
}