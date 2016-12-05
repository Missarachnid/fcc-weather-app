//Initial code to retrieve Location and Weather in English/Imperial
var $body = $("body");

$(document).ready(function() {
    
  var lati, longi;
  $("#fahrenheit").css("background-color", "#99e6ff");

  //gather geolocation data from client
  navigator.geolocation.getCurrentPosition(successFunc, errorFunc, {
    maximumAge: 600000
  });

  function successFunc(position) {
    longi = position.coords.longitude;
    lati = position.coords.latitude;
    //my Open Weather Map API id
    var myId = "4a82154c39d11213";
    var wunderground = 'https://api.wunderground.com/api/' + myId + '/conditions/geolocation/q/' + lati + ',' + longi + '.json';
    // request for Open Weather Map
    $.ajax(wunderground)
      .done(
        function(data) {
         //put information from object sent into variables
          console.log(data);
          var temperature = Math.floor(data.current_observation.temp_f);
          var cityName = data.current_observation.display_location.city;
          var weatherDescription = data.current_observation.weather;
          var wind = data.current_observation.wind_mph;
          var humidity = data.current_observation.relative_humidity;
          var iconLink = data.current_observation.icon_url;
          var iconImage = ('<img>');
          iconImage = $(iconImage).attr("src", iconLink).css("height", "53px");
          
            
          //code for display of current time
          var today = new Date();
          var currentTime = new Date();
          var hours = currentTime.getHours();
          var minutes = currentTime.getMinutes();
          var ending = "AM";

          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (hours >= 12) {
            hours = hours - 12;
            ending = "PM";
          }

          if (hours === 0) {
            hours = 12;
          }
          var currentDate = new Date();
          var timeNow = hours + ":" + minutes + " " + ending;

          //insert weather and time data into divs
          $("#time").html(timeNow + " " + currentDate.toDateString());
          $("#city").html(cityName);
          $("#temperature").html(temperature);
          $("#icon").append(iconImage);
          $("#description").html(weatherDescription);
          $("#wind").html(wind);
          $("#humidity").html(humidity);
          $("#tempUnit").html("F");
          $("#windUnit").html("mph");
          $("#weather").css("visibility", "visible");
          $("#loader").css("animation-duration", "0ms");
          $("#loader").css("visibility", "hidden");
            
          // Button causes metric conversion
          $("#celsius").click(function() {
            $("#fahrenheit").css("background-color", "white");
            $("#temperature").html(Math.floor((((temperature - 32) * 5) / 9)));
            $("#wind").html(Math.round(wind * 1.60934));
            $("#celsius").css("background-color", "#99e6ff");
            $("#tempUnit").html("C");
            $("#windUnit").html("kph");
          });
            
          //Button back to imperial measure
          $("#fahrenheit").click(function(event) {
            event.preventDefault();
            $("#celsius").css("background-color", "white");
            temperature = temperature;
            $("#temperature").html(temperature);
            $("#wind").html(wind);
            $("#fahrenheit").css("background-color", "#99e6ff");
            $("#tempUnit").html("F");
            $("#windUnit").html("mph");

          });

        }).fail(
        function() {
          $('#communication').html('Error, please try again.');
        });
  }

  function errorFunc(error) {
    $("#communication").html("Please allow us to access<br>your location data");
  }
});
