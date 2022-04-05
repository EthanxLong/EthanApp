const element = document.getElementById("ilybutton");
element.addEventListener("click", getQuote);

function getFact() {    
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(function(response1) { return response1.json() })
    .then(function(data1) {
        document.getElementById("fact").innerHTML = (data1.text)
    });
}

function getQuote(){
    fetch("quotes.json")
    .then(function(response)  { return response.json() })
    .then(function(data) {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max)
        }
        let random = getRandomInt(100)
        let randomQuote = data.quotes[random].quote
        let randomAuthor = data.quotes[random].author

        alert('"' + randomQuote + '"' + '\n' + '\n' + '- ' + randomAuthor)
    });
}

function getWeather(){
    fetch("https://api.freegeoip.app/json/?apikey=c93fa3a0-a31c-11ec-90a4-6f848fd20c1a")
    .then(function(response1) { return response1.json() })
    .then(function(data1) {
        let lat = data1.latitude
        let long = data1.longitude
        console.log(data1.city, data1.region_code)

        document.getElementById("location").innerHTML = data1.city + ', ' + data1.region_code

        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=imperial&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
        // http://api.openweathermap.org/data/2.5/weather?lat=42&lon=-88&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4
        .then(function(resp) {return resp.json() })
        .then(function(data) {
            console.log(data)
            let desc = data.weather[0].description
            let temp = data.main.temp
            temp = Math.trunc(temp)
            let picID = data.weather[0].icon
            document.getElementById("temp").innerHTML = temp + "°F";
            document.getElementById("desc").innerHTML = desc;
            document.getElementById("icon").innerHTML = '<img src=' + 'http://openweathermap.org/img/wn/' + picID + '@2x.png>';
        })
        .catch(function() {
    
        });
    });
    
    
}

function loadModal(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#exampleModal').modal(options)
    }
}



window.onload = function() {
    getWeather();
    getFact();
    loadModal();
}

