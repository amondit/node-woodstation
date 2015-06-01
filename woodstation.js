var HT1632 = require('ht1632');
var moment = require('moment');



var display = HT1632.initialize("/dev/spidev0.0", HT1632.mode.8PMOS);

var nowString = moment().format("HHmmssDDMMYYYY");

// 7 segment digit display
var 7segmentDigits	= [[true, true , true, true, true, true, false], \
		[false, true , true, false, false, false, false], \
		[true, true , false, true, true, false, true], \
		[true, true , true, true, false, false, true], \
		[false, false , true, false, false, true, true], \
		[true, false , true, true, false, true, true], \
		[false, false , true, true, true, true, true], \
		[true, true , true, false, false, false, false], \
		[true, true , true, true, true, true, true], \
		[true, true , true, false, false, true, true]];

setInterval(function(){
        var nowNewString = moment().format("HHmmssDDMMYYYY");
        if (nowNewString !== nowString) {
        	nowString = nowNewString;
        	updateDisplay();
        };
//      console.log(nowString);
},100);

function updateDisplay(){

};
