const Brick = require('./js/plugins/brick.js');
const Motor = require('./js/plugins/motor.js');

let my_motor = new Motor();

fwd_one_second = {
	port : 'A',
	run : function( plugin ) { return plugin.run_instruction( my_motor.instructions.MOVE_SECONDS, {seconds:1,clockwise:true}) }
}

back_one_second = {
	port : 'A',
	run : function( plugin ) { return plugin.run_instruction( my_motor.instructions.MOVE_SECONDS, {seconds:1,clockwise:false}) }
}

back_one_second = {
	port : 'A',
	run : function( plugin ) { return plugin.run_instruction( my_motor.instructions.MOVE_SECONDS, {seconds:1,clockwise:false}) }
}
actuators = {
	"A" : my_motor,
	"B" : null,
	"C" : null,
	"D" : null
};
set_inst = [fwd_one_second,back_one_second,back_one_second];

let my_brick = new Brick(null,actuators,set_inst);

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const now = Date.now();

do {
	console.log(my_motor.current_degree);
	sleep(1);
} while( my_brick.run_instruction('tick') )

elapsed = Date.now() - now;
console.log('elapsed: ' + elapsed);
