
const weatherAPIKey = '30efb8f67a055073b5b8bbee329eac70';
const weatherAPICall = 'https://api.openweathermap.org/data/2.5/weather?zip='

const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try{

    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;

  } catch(error) {
    console.log("error", error);
  }
}

const getWeather = async () => {
  const zipCode = document.getElementById("zip").value;
  const res = await fetch(weatherAPICall + zipCode + ',us'+'&appid=' + weatherAPIKey);
  try {
    const data = await res.json();
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    let temp = data['main']['temp'];
    let feelings = document.getElementById("feelings").value;
    newData = {'date': newDate, 'temp': temp, 'feelings': feelings};
    console.log(newData);
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

const postData = async ( data ) => {
    url = 'http://localhost:3000/post';

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
    } catch(error) {
    console.log("error", error);
    }
}

function postFeelings(e) {
  getWeather()
  .then(function(data) {
    postData(data);
   }
  )
  .then(updateUI())
}

document.getElementById('generate').addEventListener('click', postFeelings);
updateUI();
