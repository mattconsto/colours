var $ = function(query) {return document.querySelector(query);}
var _ = function(query) {return document.querySelectorAll(query);}

var list;

var update = function(value) {
var hexToRGB = function(hex) {
if(!(hex = hex.match(/((?:[0-9a-fA-F]{3})+)/g))) return null;

var per = (hex = hex[0]).length / 3;

// Independent of how many bits are used to represent each colour.
var r = parseInt(hex.substring(0,       per),        16) / (Math.pow(2, per * 4) - 1);
var g = parseInt(hex.substring(per,     per * 2),    16) / (Math.pow(2, per * 4) - 1);
var b = parseInt(hex.substring(per * 2, hex.length), 16) / (Math.pow(2, per * 4) - 1);

return [r, g, b];
}

var pythagorasDistance = function(a, b) {
return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
}

if(list && (value = hexToRGB(value))) {
// Find the closest colour
var hex      = "";
var smallest = Number.MAX_VALUE;

for (var entry in list){
var distance = pythagorasDistance(hexToRGB(entry), value);
if(distance < smallest) {
smallest = distance;
hex      = entry;
}
}

console.log("Smallest distance from " + value + ": " + smallest);

// Alter the page
$("body").className            = hexToRGB(hex).reduce(function(a, b) {return a + b;}) / 3 < 0.6 ? "dark" : 
"light";
$("main h1").textContent       = list[hex];
$("main input").value          = "#" + hex;
$("body").style["background"]  = "#" + hex;
$("main input").style["color"] = "#" + hex;
if(document.styleSheets[0].addRule) document.styleSheets[0].addRule("main input::selection", "background: #" + 
hex + " !important");

$("main input").select();
}
}

window.onload = function() {
$("main input").addEventListener("focus",  function() {this.select();});
$("main input").addEventListener("change", function() {update(this.value);});
}
