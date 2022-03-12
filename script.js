const element = document.getElementById("ilybutton");
element.addEventListener("click", iloveyouMore);

function iloveyouMore() {
    document.getElementById("hehe").innerHTML = "So Perfect Dx, text me??";
    document.getElementById("textme").innerHTML = '<a class="button" href="sms:18479093707&body=Heyyy lovey I miss yu">Text Me!</a>'
}