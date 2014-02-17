
function mainWeather() {
  navigator.geolocation.getCurrentPosition(locationTrue, locationFalse);
  
  function locationTrue(position) {
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    
    var api = "http://openweathermap.org/data/2.5/weather?/&cnt=7&lon=" + lon + "&lat=" + lat + "&APPID=01df5cdb26af96d7d47a0a6c01dd7fa3"
    
    $('#latitude').html(lat);
    $('#longitude').html(lon);
    
    
    $.ajax({
      url: api,
      data: { get_param: 'value' }, 
      dataType: 'json',
      success: function(data){
        var main = data.list[0].weather[0].main;
        var temp = data.main.temp;

        $('#main').html(main);
        $('#temp').html(temp);
      }
    });
  }
  
  function locationFalse(){
    alert("what is this i dont even");
  }
}

$(document).ready(mainWeather());