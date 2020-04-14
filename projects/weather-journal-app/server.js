// Setup empty JS object to act as endpoint for all routes
projectData = new Array();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(express.static('website'));
app.use(cors());


// const updateUI = async () => {
//   const request = await fetch('/all');
//   try{
//     const allData = await request.json();
//     document.getElementById('animalName').innerHTML = allData[0].animal;
//     document.getElementById('animalFact').innerHTML = allData[0].facts;
//     document.getElementById('animalFav').innerHTML = allData[0].fav;
//
//   }catch(error){
//     console.log("error", error);
//   }
// }

// function performAction(e){
//   const zipCode =  document.getElementById('zip').value;
//
//   getWeather(zipCode)
//   .then(function(data){
//     console.log(data);
//     postData('/addAnimal', {animal:data.animal, fact: data.fact, fav:favFact} );
//   })
//   .then(
//     updateUI()
//   )
// }

// Setup Server
app.get('/all', function(req, res) {
  res.send(projectData);
});

app.post('/post', function (req,res) {
  projectData.push(req.body);
  console.log('server data');
  console.log(projectData);
});


app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
