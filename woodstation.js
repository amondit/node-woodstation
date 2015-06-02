var HT1632 = require('ht1632');
var moment = require('moment');



var display = HT1632.initialize("/dev/spidev0.0", HT1632.mode.8PMOS);
display.clear();
display.pwm(15);
display.blink(false);

var nowString = moment().format("HHmmssDDMMYYYY");

// 7 segment digit display
var 7segmentDigits = [[true, true , true, true, true, true, false], [false, true , true, false, false, false, false], [true, true , false, true, true, false, true], [true, true , true, true, false, false, true], [false, false , true, false, false, true, true], [true, false , true, true, false, true, true], [false, false , true, true, true, true, true], [true, true , true, false, false, false, false], [true, true , true, true, true, true, true], [true, true , true, false, false, true, true]];

//Time / date digits addresses on the Woodstation display (HHmmssDDMMYYYY format)
var dateTimeDisplayAddresses = [[0,2], [14,2], [28,2], [0,3], [14,3], [28,3], [1,0], [15,0], [29,0], [1,1], [15,1], [29,1], [1,2], [15,2]];

setInterval(function(){
        var nowNewString = moment().format("HHmmssDDMMYYYY");
        if (nowNewString !== nowString) {
        	nowString = nowNewString;
        	updateDateTimeDisplay();
        };
//      console.log(nowString);
},100);

function updateDateTimeDisplay(){
	//switch on display indicators (':' in time, 'D' and 'M' on date)
	display.writeLed(41,3,true);
	display.writeLed(1,3,true);
	display.writeLed(11,3,true);
	display.writeLed(15,3,true);
	for (var i = 0; i < nowString.length; i++) {
		var digit = parseInt(nowString[i]);
		var writeAddress = dateTimeDisplayAddresses[i][0];
		var writeLed = dateTimeDisplayAddresses[i][1];
		for (var j = 0; j < 7segmentDigits[digit].length; j++) {
			display.writeLed(writeAddress, writeLed, 7segmentDigits[digit][j]);
			writeAddress = writeAddress + 2;
		};
	};
};
