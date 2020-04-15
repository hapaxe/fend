
const weatherAPIKey = '30efb8f67a055073b5b8bbee329eac70';
const weatherAPICall = 'https://api.openweathermap.org/data/2.5/weather?zip='

function refreshElements() {
  let groupHolder = document.getElementsByClassName("holder entry")[0];
  while (groupHolder.childElementCount != 1) {
    groupHolder.removeChild(groupHolder.lastChild);
  }
}

const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try{

    const allData = await request.json();
    refreshElements();

    allData.forEach((item, i) => {
      addSection(i);
      document.getElementById('date' + i).innerHTML = allData[i].date;
      document.getElementById('temp' + i).innerHTML = allData[i].temp;
      document.getElementById('content' + i).innerHTML = allData[i].feelings;
    });

  } catch(error) {
    console.log("error", error);
  }
}

function addSection(number) {
  let newHolder = document.createElement("div");
  newHolder.setAttribute("id", "entryHolder" + number);
  let newDate = document.createElement("div");
  newDate.setAttribute("id", "date" + number);
  let newTemp = document.createElement("div");
  newTemp.setAttribute("id", "temp" + number);
  let newContent = document.createElement("div");
  newContent.setAttribute("id", "content" + number);

  newHolder.appendChild(newDate);
  newHolder.appendChild(newTemp);
  newHolder.appendChild(newContent);

  document.getElementsByClassName("holder entry")[0].appendChild(newHolder);

}

const getWeather = async () => {
  const zipCode = document.getElementById("zip").value;
  const res = await fetch(weatherAPICall + zipCode + ',us'+'&appid=' + weatherAPIKey);
  try {
    const data = await res.json();
    console.log(data);
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
    if (Object.keys(data).length === 0) {
      // do not post anything if previous query failed and returned null object.
      return;
    }
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
  .then(function(res) {
    updateUI();
    }
  )
}

document.getElementById('generate').addEventListener('click', postFeelings);
updateUI();
