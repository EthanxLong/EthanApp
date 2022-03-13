const element = document.getElementById("ilybutton");
element.addEventListener("click", getFact);

function getFact() {    
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(function(response1) { return response1.json() })
    .then(function(data1) {
        alert(data1.text)
    });
}

function getQuote(){
    let N = 0 
    fetch("https://type.fit/api/quotes")
    .then(function(response) { return response.json() })
    .then(function(data) {
        let date = new Date().toLocaleDateString();
        if (localStorage.yourapp_date == date){
            document.getElementById("quote").innerHTML = '"' + data[N].text + '"';
            document.getElementById("author").innerHTML = "-" + data[N].author;
        }
        if (localStorage.yourapp_date != date){
            document.getElementById("quote").innerHTML = '"' + data[N + 1].text + '"';
            document.getElementById("author").innerHTML = "-" + data[N + 1].author;
        }
  });
}

function getWeather(){
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
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

window.onload = function() {
    getWeather();
    getQuote();
}

