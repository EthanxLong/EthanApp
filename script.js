const element = document.getElementById("ilybutton");
element.addEventListener("click", iloveyouMore);

function iloveyouMore() {
    document.getElementById("hehe").innerHTML = "I know right 😩, u know you are.. text me??";
    document.getElementById("textme").innerHTML = '<a class="button" href="sms:18479093707&body=I MISS YOU SOOOOO MUCH BEBE LUBBY">Tap here to send me a cute msg 😳</a>'
}

function getQuote() {
    fetch('https://zenquotes.io/api/random/')
    .then(function(resp1) {return resp1.json() })
    .then(function(data1) {
        console.log(data1);
    })
    .catch(function() {

    });
}

function getWeather( cityID ){
    fetch('http://api.openweathermap.org/data/2.5/weather?id=' +cityID+ '&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
    .then(function(resp) {return resp.json() })
    .then(function(data) {
        console.log(data);
    })
    .catch(function() {

    });
}

window.onload = function() {
    getWeather( 4259418 );
    getQuote();
}