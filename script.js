// Author: Ethan Long
//   Date: 5/4/2022
//   Modification History
//   Apr 15 2022: Added HTML & CSS
//   Apr 22 2022: Figured out how to use APIs (Openweathermap, randomfact, etc)
//   Apr 28 2022: Styled it better for mobile devices
//   May 2 2022: Final touches and QoL fixes.
// 
//   Testing: This website is designed for mobile devices (for looks and because location data is more precise) 
//   although the browsers are similar the buttons do look better in Safari.

// get users location if they allow, then give them the weather, if user is not in US, give them the degrees in Celsius.
function getWeather(){
   navigator.geolocation.getCurrentPosition((position) => {
        fetch(' https://api.openweathermap.org/geo/1.0/reverse?lat='+ position.coords.latitude + '&lon='+ position.coords.longitude + '&limit=5&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
        .then(function(resp) {return resp.json() })
        .then(function(data2) {
            
    if (data2[0].country == "US") {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
        .then(function(resp) {return resp.json() })
        .then(function(data) {
            let desc = data.weather[0].description
            let temp = data.main.temp
            temp = Math.trunc(temp)
            let picID = data.weather[0].icon
            document.getElementById("temp").innerHTML = temp + "°F";
            document.getElementById("desc").innerHTML = desc;
            document.getElementById("icon").innerHTML = '<img src=' + 'http://openweathermap.org/img/wn/' + picID + '@2x.png>';

            document.getElementById("location").innerHTML = data2[0].name + ', ' + data2[0].state

            console.log(data)
            
        })
        .catch(function() {
    
        });

    } else {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&appid=a1b5b8dc03a7d9f84dc7e21d4d023ce4')
        .then(function(resp) {return resp.json() })
        .then(function(data) {
            let desc = data.weather[0].description
            let temp = data.main.temp
            temp = Math.trunc(temp)
            let picID = data.weather[0].icon
            document.getElementById("temp").innerHTML = temp + "°C";
            document.getElementById("desc").innerHTML = desc;
            document.getElementById("icon").innerHTML = '<img src=' + 'https://openweathermap.org/img/wn/' + picID + '@2x.png>';

            document.getElementById("location").innerHTML = data2[0].name + ', ' + data2[0].state
        })
        .catch(function() {
        });
    }

    });
    });   
} 

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

$(document).ready(function() {
    if(window.location.href.indexOf('#qrModal') != -1) {
      $('#qrModal').modal('show');
    }
  });

$(document).ready(function() {
    if(window.location.href.indexOf('#InspirationModal') != -1) {
      $('#InspirationModal').modal('show');
      document.getElementById("quote").innerHTML = "example Quote"
        document.getElementById("author").innerHTML = "example author"
    }
});

$(document).ready(function() {
    if(window.location.href.indexOf('#ContactMe') != -1) {
      $('#ContactMe').modal('show');
    }
});

// load these functions on when the browser loads
window.onload = function() {
    getWeather();
    getFact();
    loadModal();

}