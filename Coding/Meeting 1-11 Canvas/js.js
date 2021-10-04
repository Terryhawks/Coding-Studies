var canvas = document.getElementById("c1");
var ctx = c1.getContext("2d");

var grd = ctx.createLinearGradient(0, 0, 1580, 0);
grd.addColorStop(0, "midnightblue");
grd.addColorStop(1, "deepSkyBlue");
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

var canvas = new fabric.Canvas('c1');
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 5;
console.log(canvas);