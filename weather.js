//made into a global variable to fix issue within time constraint
var currentDate = 0;

function mainWeather() {
  navigator.geolocation.getCurrentPosition(locationSucceed, locationFail);
  var jsonURL;
  var jsonData;
  var skykons;
  var iconState;
}

function locationSucceed(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  jsonURL = "http://api.openweathermap.org/data/2.5/forecast/daily?&cnt=7&units=imperial&mode=json&lon=" + lon + "&lat=" + lat + "&APPID=01df5cdb26af96d7d47a0a6c01dd7fa3";
  jsonRequest();
}

function locationFail(){
  console.log("location failed");
  datePopulate();
  bgPopulate();
}

function jsonRequest() {
  $.getJSON(
    jsonURL, function(json){
      jsonData = json;
      weatherPopulate();
    }
  );
}

function weatherPopulate(){
  var weatherDesc = jsonData.list[currentDate].weather[0].main;
  var temp = jsonData.list[currentDate].temp.day;
  var city = jsonData.city.name;
  iconState = jsonData.list[currentDate].weather[0].icon;

  $('#weatherDesc').html(weatherDesc);
  $('#weatherCity').html(city);
  $('#temp').html(Math.floor(temp) + ' °F');
  
  iconPopulate();
  datePopulate();
  bgPopulate();
}

function iconPopulate(){
  skykon = new Skycons({
    "color": "white"
  });
  addIcon();
}

function datePopulate(){
  var d = new Date();
  var date = d.getDate();
  var month = d.getMonth();
  var monthArr = ["Jan","Feb","Mar","Apr","May"];
  $('.weatherTable').empty();
  
  for(var i = 0; i < 5; i++){
    $('.weatherTable').append("<div class='tableDates' id='" + i + "'>" + monthArr[month] + " " + (date + i) + '</div>');
  }
  buttonEvent();
}

// ideally this would take temp as its input and use a helper function to create a different background color depending on the weather
function bgPopulate()
  // the hidden body is shown after the weather has been updated
  $("body").animate({ opacity:'1'}, 1000);


function buttonEvent(){
  $(".tableDates").click(function(){
    currentDate = this.id;
    // the line below "hides" the body until the weather is updated (animation timing needs to improve to look good)    
    // $("body").animate({ opacity:'0'}, 400);

    // button event calls weatherPopulate() again... It should be refactored to only update variables and divs necessary
    weatherPopulate();
  });
}

// not very DRY but required to use icons not given by openweather
function addIcon(){
  var iconImg;
  switch (iconState) {
  case "01d":
    iconImg = "CLEAR-DAY";
    break;
  case "01n":
    iconImg = "CLEAR-NIGHT";
    break;
  case "02d":
  case "03d":
  case "04d":
    iconImg = "PARTLY-CLOUDY-DAY";
    break;
  case "02n":
  case "03n":
  case "04n":
    iconImg = "PARTLY-CLOUDY-NIGHT";
    break;
  case "09d":
  case "09n":
  case "10d":
  case "10n":
  case "11d":
  case "11n":
    iconImg = "RAIN";
    break;
  case "13d":
  case "13n":
    iconImg = "SNOW";
    breka;
  case "50d":
  case "50n":
    iconImg = "FOG";
    break;
  }   
  skykon.add("weatherIcon", iconImg);
  skykon.play();
}

$(document).ready(mainWeather());