// function to load the contact me modal
function getContacts() {
    $('#ContactMe').modal()
}

// fill in the email subject and body fields with the form subject and body when button is pressed
$(document).ready(function() {

    var $sendEmailN = $('#sendEmail');
    var $subjectN = $('#subject');
    var $bodyN = $('#body');

    function updateEmail() {
        $sendEmailN.attr('href', 'mailto:ethalong@iu.edu?' +
        'subject=' + encodeURIComponent($subjectN.val()) +
        '&body=' + encodeURIComponent($bodyN.val()));
    }

    $('#subject,#body').on('input', updateEmail);
    updateEmail();
});

// get a random fact using a random fact API
function getFact() {    
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(function(response1) { return response1.json() })
    .then(function(data1) {
        document.getElementById("fact").innerHTML = (data1.text)
    });
}

// get a quote using a local quotes json db
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

// get users location if they allow, then give them the weather, if user is not in US, give them the degrees in Celsius.
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

// if user clicks I understand on the QRmodal, they will not get the prompt again.
function understandButton() {
    localStorage.setItem('visited', true);
}

// function to detect if user is NOT on a mobile device (if screen width is more than 480 pixels)
function loadModal(){
    if(typeof window.localStorage !== "undefined" && !localStorage.getItem('visited') && screen.width > 480) {
        $('#qrModal').modal()  
   }
}

// load these functions on when the browser loads
window.onload = function() {
    getWeather();
    getFact();
    loadModal();

}
