const element = document.getElementById("ilybutton");
element.addEventListener("click", iloveyouMore);

function iloveyouMore() {
    document.getElementById("hehe").innerHTML = "I LOVE YOU TOOOO! Why don't you text me??";
    document.getElementById("textme").innerHTML = '<a class="button" href="sms:18479093707&body=I love you veeeerry much Ethan, this web app is awesome!">Tap here to send me a cute msg 😳</a>'
}

function getQuote( random ){
    fetch('https://quotes.rest' + random)
    .then(function(resp) {return resp.json() })
    .then(function(data) {
        console.log(data);
    })
    .catch(function() {

    });
}

function getWeather( cityID ){
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' +cityID+ '&units=imperial&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
    .then(function(resp) {return resp.json() })
    .then(function(data) {
        let desc = data.weather[0].description
        let temp = data.main.temp
        if (temp < 50){
            document.getElementById("temp").innerHTML = "Current Temp: " + temp + "°F 🥶🥶 WEAR A JACKET!";
        }
        if (desc == "clear sky"){
            document.getElementById("desc").innerHTML = "Description: Clear Skies";
        } else {
            document.getElementById("desc").innerHTML = "Description: " + desc;
        }
        
    })
    .catch(function() {

    });
    
}

window.onload = function() {
    getWeather( 4259418 );
    getQuote( '/qod' )
}

