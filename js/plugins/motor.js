export class Motor extends BasePlugin{
	
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

	}

	// virtual: inits the motor 
	// @OVERRIDE
	init() {
		console.log("DEBUG: Initializing a motor plugin!");

		this.set_of_instructions.set(instructions.MOVE_SECONDS,this.move_seconds);
		this.set_of_instructions.set(instructions.MOVE_DEGREES,this.move_degrees);
		this.set_of_instructions.set(instructions.MOVE_ROTATION,this.move_rotation);
	} 

	// virtual: run a specific instruction 
	// @OVERRIDE
	// Params:
	// 	instruction_key: the name of the instruction to be executed
	// 	parameters: the paramaters that will be passed to the function
	// Return: ( errMsg, ok ) 
	// 	errMsg: Information about error can be NULL  
	// 	ok: 
	//	  true  -> sucess
	//        false -> some shit happend
	run_instruction( instruction_key /* string */ , parameters /* json */ ) { 

		let instruction_ =  this.set_of_instructions.get( instruction_key );

		// Verify if the instruction was created
		if( instruction_ === "undefined" /* WTF js... */ )
			return "Instruction doesn't exist!", false; 

		//Run the instruction...
		let message, ok = instruction_(pararmeters);

		// We dont need to treat the error here, let the guy above treat it
		return message, ok;
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
