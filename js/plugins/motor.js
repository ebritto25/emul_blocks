BasePlugin = new require("./base_plugin.js");

module.exports = class Motor extends BasePlugin{
	
	/* @REMOVE
	 * TODOs:
	 * - Test this
	 * - Instructions still does nothing
	 */ 

	constructor() {

		// Calling my father constructor...
		super(); 

		// The possible instructions for a motor plugin
		// FIXME: I think that's not the best way to do this
		this.instructions = {
			MOVE_SECONDS: 'mov_sec',
			MOVE_DEGREES: 'mov_deg',
			MOVE_ROTATION: 'mov_rot'
		};

		this.current_degree = 0;
		this.max_degrees = 1000;

		this.init();

	}

	// virtual: inits the motor 
	init() {
		console.log("DEBUG: Initializing a motor plugin!");

		// Correlates intruction code to instruction function. Arrow functions have to be used
		// to get the right 'this' for the functions
		
		this.set_of_instructions.set(this.instructions.MOVE_SECONDS,(param) => this.move_seconds(param));
		this.set_of_instructions.set(this.instructions.MOVE_DEGREES,(param) => this.move_degrees(param));
		this.set_of_instructions.set(this.instructions.MOVE_ROTATION,(param) => this.move_rotations(param));
	} 

	// Instruction function: run the instructions to make the motor move a "X" seconds
	// Params: TODO: There are more parameters that needs to be here
	// 	time: desired time to run
	// Return: ( errMsg, ok ) 
	// 	errMsg: Information about error can be NULL  
	// 	ok: 
	//	  true  -> sucess
	//        false -> some shit happend
	move_seconds( parameters /* json */ ) {
		this.current_degree += parameters.clockwise ? 1 : -1 ;
		if ( parameters.clockwise && this.current_degree >= this.max_degrees * parameters.seconds || 
				 !parameters.clockwise && this.current_degree <= -(this.max_degrees * parameters.seconds)
		) {
			this.current_degree = 0;
			return true;
		}
		else {
			return false;
		}
	}

	// Instruction function: run the instructions to make the motor move a "X" seconds
	// Params: TODO: There are more parameters that needs to be here
	// 	degrees: desired number of degrees to move/rotate
	// Return: ( errMsg, ok ) 
	// 	errMsg: Information about error can be NULL  
	// 	ok: 
	//	  true  -> sucess
	//        false -> some shit happend
	move_degrees( parameters /* json */ ) {
	}

	// Instruction function: run the instructions to make the motor mova a "X" number of rotations 
	// Params: TODO: There are more parameters that needs to be here
	// 	rotation: desired number of rotations
	// Return: ( errMsg, ok ) 
	// 	errMsg: Information about error can be NULL  
	// 	ok: 
	//	  true  -> sucess
	//        false -> some shit happend
	move_rotations( parameters /* json */ ) {
	}
}
