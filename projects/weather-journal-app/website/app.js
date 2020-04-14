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
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

const postData = async ( data ) => {
    url = 'http://localhost:3000/post'
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

function postFeelings(e) {
  getWeather()
  .then(function(data){
    postData(data);
  })
}

document.getElementById('generate').addEventListener('click', postFeelings);
