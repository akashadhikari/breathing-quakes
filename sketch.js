var mapimg;

//base longitude latitude
var clat=0;
var clon=0;

//27.7172° N, 85.3240° E
var lat= 0;
var lon= 0;

var zoom=1;

var earthquakes;

function preload() {
	mapimg= loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiYWthc2hhZGhpa2FyaSIsImEiOiJjaXpkemZ6dDEyODdiMnFwOXlrOTAzeWZxIn0.jqawgQSE-GrEe1GH7axGwQ');
	earthquakes= loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
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

	for (var i=0; i<earthquakes.length; i++) {
		var data = earthquakes[i].split(/,/);
		//console.log(data);

		var lat = data[1];
		var lon = data[2];
		var mag = data[4]; // magnitude data from csv

		var x = mercX(lon) - cx;
		var y = mercY(lat) - cy;

		if(mag<6.5) {

			fill(0,128,0, 200); //green
			ellipse(x,y,5,5);

		} else {

			fill(255,0,0, 200); //red for magnitude more than 6.5
			ellipse(x,y,25,25);
		}

	}

}
