function mainWeather() {
  navigator.geolocation.getCurrentPosition(locationSucceed, locationFail);
  var jsonURL;
  var jsonData;
  
  function locationSucceed(position) {
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    jsonURL = "http://api.openweathermap.org/data/2.5/forecast/daily?&cnt=7&mode=json&lon=" + lon + "&lat=" + lat + "&APPID=01df5cdb26af96d7d47a0a6c01dd7fa3"
    
    $('#latitude').html(lat);
    $('#longitude').html(lon);
         
    jsonRequest();
  }
  
  function jsonRequest() {
    $.getJSON(
      jsonURL, function(json){
        jsonData = json;
        weatherPopulate();
      }
    );
  }
  
  function locationFail(){
    alert("what is this i dont even");
  }
  
  function weatherPopulate(){
    console.log(jsonURL);
    console.log(jsonData);
    var weatherDesc = jsonData.list[0].weather[0].main;
    var temp = jsonData.list[0].temp.day;

    $('#weatherDesc').html(weatherDesc);
    $('#temp').html(temp);
  }
        
}

$(document).ready(mainWeather());