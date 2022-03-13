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

function getWeather( cityID ){
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' +cityID+ '&units=imperial&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
    .then(function(resp) {return resp.json() })
    .then(function(data) {
        console.log(data)
        let desc = data.weather[0].description
        let temp = data.main.temp
        temp = Math.trunc(temp)
        let picID = data.weather[0].icon
        document.getElementById("temp").innerHTML = "Current Temp: " + temp + "°F";
        document.getElementById("desc").innerHTML = "Description: " + desc;
        document.getElementById("icon").innerHTML = '<img src=' + 'http://openweathermap.org/img/wn/' + picID + '@2x.png>';
    })
    .catch(function() {

    });
    
}

window.onload = function() {
    getWeather( 4259418 );
    getQuote()
}

