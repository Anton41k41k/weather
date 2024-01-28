import { toStorageFollow, toStorageNow, updateWeatherImg } from "./module.js";

const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const cityName = document.querySelector(".search-input");
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f&units=metric";
const tempText = document.querySelector(".temp__text");
const cityNow = document.querySelector(".city__now");
const listCity = document.querySelector(".list__city");
const followBtn = document.querySelector(".followBtn");
const imgCloud = document.querySelector(".img__cloud");
const listFollowCity = new Set();

async function getCityTempFromInput() {
  const url = `${serverUrl}?q=${cityName.value}&appid=${apiKey}`;

  const responce = await fetch(url);
  const temp = await responce.json();
  return temp;
}

function updateTempVidget(tempData) {
  const { weather, main, name } = tempData;
  tempText.textContent = Math.round(main.temp);
  cityNow.textContent = name;
  updateWeatherImg(weather[0].description, imgCloud);
  setCookie("city", name, { secure: true, "max-age": 3600 });
}

async function handleSubmitCity(event) {
  event.preventDefault();

  try {
    const temp = await getCityTempFromInput();
    updateTempVidget(temp);
  } catch (error) {
    tempText.textContent = "-";
    cityNow.textContent = "Ошибка!";
  }
}

function handleAddCityInFollowList() {
  if (listFollowCity.has(cityNow.textContent)) {
    alert("Этот город уже есть в списке");
  } else {
    if (listCity.childElementCount < 5) {
      listCity.insertAdjacentHTML(
        "afterbegin",
        `<div class="list__element">
    <p class="name__town">${cityNow.textContent}</p>
    <button>
    <img class="deleteBtn" src="img/delete.png" alt="0">
    </button>
    </div>`
      );
      listFollowCity.add(cityNow.textContent);
    } else {
      alert("Список полный!");
    }
  }
  toStorageFollow(listFollowCity);
}

async function getCityTempFromFollowList(event) {
  const url = `${serverUrl}?q=${event.target.textContent}&appid=${apiKey}`;

  const responce = await fetch(url);
  const temp = await responce.json();
  return temp;
}

async function handleGetDataFormFollowList(event) {
  if (event.target.tagName != "P") {
    return;
  } else {
    try {
      const temp = await getCityTempFromFollowList(event);
      updateTempVidget(temp);
    } catch (error) {
      tempText.textContent = "-";
      cityNow.textContent = "Ошибка!";
    }
  }
}

async function getCityTempFromLocalStorage() {
  try {
    const url = `${serverUrl}?q=${getCookie("city")}&appid=${apiKey}`;

    const responce = await fetch(url);
    const temp = await responce.json();
    return temp;
  } catch (err) {
    tempText.textContent = "-";
    cityNow.textContent = "Выберите город";
  }
}

async function reloadPage() {
  try {
    const temp = await getCityTempFromLocalStorage();
    updateTempVidget(temp);

    for (let cityName of JSON.parse(localStorage.getItem("follow"))) {
      listFollowCity.add(cityName);
      listCity.insertAdjacentHTML(
        "afterbegin",
        `<div class="list__element">
    <p class="name__town">${cityName}</p>
    <button>
    <img class="deleteBtn" src="img/delete.png" alt="0">
    </button>
    </div>`
      );
    }
  } catch (error) {
    tempText.textContent = "-";
    cityNow.textContent = "Ошибка!";
  }
}

function deleteCity(event) {
  const deleteCity = event.target.parentNode.parentNode;
  if (event.target.tagName != "IMG") {
    return;
  } else {
    listFollowCity.delete(deleteCity.children[0].textContent);
    listCity.removeChild(deleteCity);
  }
  toStorageFollow(listFollowCity);
}

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

document.addEventListener("submit", handleSubmitCity);
followBtn.addEventListener("click", handleAddCityInFollowList);
listCity.addEventListener("click", handleGetDataFormFollowList);
listCity.addEventListener("click", deleteCity);

reloadPage();
