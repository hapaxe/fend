/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const weatherAPIKey = '30efb8f67a055073b5b8bbee329eac70';
const weatherAPICall = 'https://api.openweathermap.org/data/2.5/weather?zip='

const getWeather = async () => {
  const zipCode = document.getElementById("zip").value;
  const res = await fetch(weatherAPICall + zipCode + ',us'+'&appid=' + weatherAPIKey)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

document.getElementById('generate').addEventListener('click', getWeather);
