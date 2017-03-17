var mapimg;

var clat=0;
var clon=0;

//27.7172° N, 85.3240° E
var lat= 27.7172;
var lon= 85.3240;

var zoom=1;

function preload() {
	mapimg= loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/85.3240,27.7172,10,0,0/1024x512?access_token=pk.eyJ1IjoiYWthc2hhZGhpa2FyaSIsImEiOiJjaXpkemZ6dDEyODdiMnFwOXlrOTAzeWZxIn0.jqawgQSE-GrEe1GH7axGwQ');
}

function mercX(lon) {
	lon = radians(lon);
	var a = (256/PI) * pow(2,zoom);
	var b = lon + PI;
	return a*b;
}

function mercY(lat) {
	lat = radians(lat);
	var a = (256/PI) * pow(2,zoom);
	var b = tan(PI/4 + lat/2);
	var c = PI - log(b);
	return a*c;
}

function setup() {
	createCanvas(1024,512);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapimg,0,0);

	var cx = mercX(clon);
	var cy = mercY(clat);

	var x = mercX(lon) - cx;
	var y = mercY(lat) - cy;

	fill(255,0,255, 200);
	ellipse(x,y,20,20);
}
