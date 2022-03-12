const element = document.getElementById("ilybutton");
element.addEventListener("click", iloveyouMore);

function iloveyouMore() {
    document.getElementById("hehe").innerHTML = "I LOVE YOU TOOOO! Why don't you text me??";
    document.getElementById("textme").innerHTML = '<a class="button" href="sms:18479093707&body=I love you veeeerry much Ethan, this web app is awesome!">Tap here to send me a cute msg 😳</a>'
    $("#ilybutton").remove();
}

function getQuote( random ){
    fetch('https://quotes.rest' + random)
    .then(function(resp) {return resp.json() })
    .then(function(data) {
        console.log();
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
        let picID = data.weather[0].icon
        let picURL = "http://openweathermap.org/img/wn/"+ picID +"@2x.png"
        if (temp < 50){
            document.getElementById("temp").innerHTML = "Current Temp: " + temp + "°F 🥶🥶 WEAR A JACKET!";
        }
        document.getElementById("desc").innerHTML = "Description: " + desc;
        document.getElementById("icon").innerHTML = '<img src=' + 'http://openweathermap.org/img/wn/' + picID + '@2x.png>';
    })
    .catch(function() {

    });
    
}

window.onload = function() {
    getWeather( 4259418 );
    getQuote( '/qod' )
}

