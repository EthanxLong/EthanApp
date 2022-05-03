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
        document.getElementById("quote").innerHTML = (randomQuote)
        document.getElementById("author").innerHTML = ("—" + randomAuthor)
        $('#InspirationModal').modal()
    });
}

function getWeather(){
    if (!navigator.geolocation) {
        console.error(`Your browser doesn't support Geolocation`);
    } else {navigator.geolocation.getCurrentPosition((position) => {
        fetch('https://api.opencagedata.com/geocode/v1/json?key=cadf225b484c4d629d0ae4bf80c5493b&q='+ position.coords.latitude  + '%2C+' + position.coords.longitude + '&pretty=1&no_annotations=1')
        .then(function(resp) {return resp.json() })
        .then(function(data1) {
            console.log(data1)
            if (data1.results[0].components.city == "undefined") {
                document.getElementById("location").innerHTML = data1.results[0].components.city + ', ' + data1.results[0].components.state_code
            }
            document.getElementById("location").innerHTML = data1.results[0].components.city + ', ' + data1.results[0].components.state_code
            
        
    if (data1.results[0].components.country_code == "us") {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
        // http://api.openweathermap.org/data/2.5/weather?lat=39.8086&lon=-85.9873&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4
        .then(function(resp) {return resp.json() })
        .then(function(data) {
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

    } else {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
        // http://api.openweathermap.org/data/2.5/weather?lat=42&lon=-88&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4
        .then(function(resp) {return resp.json() })
        .then(function(data) {
            console.log(data)
            let desc = data.weather[0].description
            let temp = data.main.temp
            temp = Math.trunc(temp)
            let picID = data.weather[0].icon
            document.getElementById("temp").innerHTML = temp + "°C";
            document.getElementById("desc").innerHTML = desc;
            document.getElementById("icon").innerHTML = '<img src=' + 'http://openweathermap.org/img/wn/' + picID + '@2x.png>';
        })
        .catch(function() {
        });
    }
    });
});
}
} 


function loadModal(){
    if( screen.width > 480 ) {     
        $('#exampleModal').modal()
    }
}

  

window.onload = function() {
    getWeather();
    getFact();
    loadModal();
    
}
