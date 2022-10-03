const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res) {
res.sendFile(__dirname + "/index.html");
  // res.send("Server is up an running");
})

app.post("/", function(req,res) {

  const query = req.body.cityName;
  const apiKey = "c981de3947399556eab725957712f6ac";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?units="+ units +"&q="+ query +"&appid="+ apiKey;

  https.get(url, function(responce){
    console.log(responce.statusCode);

    responce.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      // const object = {
      //   name: "Angela",
      //   food: "Banana"
      // }
      // JSON.stringify(object);
      // console.log(object);
      const temp = weatherData.main.temp ;
      const weath = weatherData.weather[0].main;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + weath + "</p>");
      res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius</h1>");
      res.write("<img src=" + imageUrl + " />");
      res.send();
    })
  });
})



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
