    var canvas = document.getElementById("c1");
var ctx = c1.getContext("2d");

var grd = ctx.createLinearGradient(0, 0, 1580, 0);
grd.addColorStop(0, "midnightblue");
grd.addColorStop(0.5, "deepSkyBlue");
grd.addColorStop(1, "dodgerblue");

ctx.fillStyle = grd;
ctx.fillRect(0, 0, 1580, 760);

var text = "Welcome!"
ctx.fillStyle = "gold"
ctx.textAlign = "center"
ctx.font = "85px Cursive"
ctx.fillText(text, 793, 335)

text = "This's My Canvas";
ctx.fillStyle = "goldenrod"
ctx.textAlign = "center"
ctx.font = "30px Cursive"
ctx.fillText(text, 793, 375)

text = "Spiderbite"
ctx.fillStyle = "darkslateblue"
ctx.textAlign = "center"
ctx.font = "15px Noto Sans"
ctx.fillText(text, 250, 400)