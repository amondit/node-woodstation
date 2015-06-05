var HT1632 = require('ht1632');
var moment = require('moment');
var dhtSensor = require('node-dht-sensor');


var nowTimeString = moment().format("HHmmss");
var nowDateString = moment().format("DDMMYYYY");

/**
 * Display related initialization
**/

var display = HT1632.initialize("/dev/spidev0.0", HT1632.mode.MODE_8PMOS);
display.clear();
display.pwm(15);
display.blink(false);

// 7 segment digit display
var sevenSegmentDigits = [[true, true , true, true, true, true, false], [false, true , true, false, false, false, false], [true, true , false, true, true, false, true], [true, true , true, true, false, false, true], [false, true , true, false, false, true, true], [true, false , true, true, false, true, true], [true, false , true, true, true, true, true], [true, true , true, false, false, false, false], [true, true , true, true, true, true, true], [true, true , true, true, false, true, true]];
var spaceCharacter = [false, false, false, false, false, false, false];
var minusCharacter = [false, false, false, false, false, false, true];


//Time / date digits addresses on the Woodstation display (HHmmssDDMMYYYY format)
var timeDisplayAddresses = [[0,2], [14,2], [28,2], [0,3], [14,3], [28,3]];
var dateDisplayAddresses = [[1,0], [15,0], [29,0], [1,1], [15,1], [29,1], [1,2], [15,2]];

/*
//display secret message
var secretMessage = [[true, true, true, true, true, false, false],[true, false, false, true, true, true, true], [false, false, false, true, true, true, true], [false, false, false, false, false, true, false], [true, true, true, false, true, true, true], [false, true, true, false, true, true, false], [true, true, true, false, false, true, false], [true, false, false, true, true, true, true]];
for (var i = 0; i < 8; i++) {
	var writeAddress = dateTimeDisplayAddresses[i+6][0];
	var writeLed = dateTimeDisplayAddresses[i+6][1];
	for (var j = 0; j < secretMessage[i].length; j++) {
		display.writeLed(writeAddress, writeLed, secretMessage[i][j]);
		writeAddress = writeAddress + 2;
	};
};
*/


/**
 * Temperature/humidity related initialization
**/
/*
dhtSensor.initialize(22,4);
var humidityDisplayAddresses = [[0,0],[14,0]];
var temperatureDisplayAddresses = [[0,1], [14,1], [28,1]];
// display '%' for humidity, and '°C' for temp
display.writeLed(29,2,true);
display.writeLed(31,2,true);
display.writeLed(35,2,true);
display.writeLed(28,0,true);
display.writeLed(34,0,true);
display.writeLed(36,0,true);
display.writeLed(38,0,true);
display.writeLed(33,2,true);

var sensorRead = setInterval(function () {
	var readout = dhtSensor.read();
	//Humidity
	var humidity = readout.humidity.toFixed(0);
	var currentDigit = 0;
	if (humidity.length = 1) {
		write7segCharAtIndex(spaceCharacter, humidityDisplayAddresses[0][0],humidityDisplayAddresses[0][1]);
		currentDigit++;
	};
	for (var i = 0; i < humidity.length; i++) {
		var digit = parseInt(humidity[currentDigit]);
		write7segCharAtIndex(sevenSegmentDigits[digit], humidityDisplayAddresses[i][0],humidityDisplayAddresses[i][1]);
	};
	//Temperature
	var temperature = readout.temperature.toFixed(1).split(".");
	currentDigit = 0;
	if (temperature[0].length = 1) {
		write7segCharAtIndex(spaceCharacter, temperatureDisplayAddresses[0][0],temperatureDisplayAddresses[0][1]);
		currentDigit++;
	};
	for (var i = 0; i < temperature[0].length; i++) {
		var digit = parseInt(temperature[0][currentDigit]);
		write7segCharAtIndex(sevenSegmentDigits[digit], temperatureDisplayAddresses[i][0],temperatureDisplayAddresses[i][1]);
	};
	write7segCharAtIndex(sevenSegmentDigits[parseInt(temperature[1][0])], temperatureDisplayAddresses[2][0],temperatureDisplayAddresses[2][1]);
}, 2000);
*/


var timeDisplay = setInterval(function(){
        var nowTimeNewString = moment().format("HHmmss");
        
        if (nowTimeNewString !== nowTimeString) {
        	updateTimeDisplay(nowTimeNewString);
        };
//      console.log(nowString);
},100);

function updateTimeDisplay(nowNewString){
	//switch on display indicators (':' in time, 'D' and 'M' on date)
	display.writeLed(41,3,true);
	display.writeLed(1,3,true);
	//display.writeLed(11,3,true);
	//display.writeLed(15,3,true);
	for (var i = 0; i < nowNewString.length; i++) {
//		if (displayDate || i < 6) {
//			if (nowNewString[i] !== nowString[i]) {
				var digit = parseInt(nowNewString[i]);
//				var writeAddress = dateTimeDisplayAddresses[i][0];
//				var writeLed = dateTimeDisplayAddresses[i][1];
				write7segCharAtIndex(sevenSegmentDigits[digit], timeDisplayAddresses[i][0], timeDisplayAddresses[i][1]);
				/*for (var j = 0; j < sevenSegmentDigits[digit].length; j++) {
					display.writeLed(writeAddress, writeLed, sevenSegmentDigits[digit][j]);
					writeAddress = writeAddress + 2;
				};
				*/
//			};
//		};
	};
	nowTimeString = nowNewString;
};

function write7segCharAtIndex(charArray, baseAddr, ledIndex) {
	var writeAddress = baseAddr;
	for (var j = 0; j < charArray.length; j++) {
		display.writeLed(writeAddress, ledIndex, charArray[j]);
		writeAddress = writeAddress + 2;
	};
};
