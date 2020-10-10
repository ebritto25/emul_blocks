// Base class for a plugin
// every plugin must inherit from this class
module.exports = class BasePlugin{

	constructor() {
		this.set_of_instructions = new Map(); // Map to instructions( functions )
		this.is_initialized = false; // If this plugin was correctly initialized
		this.is_running = false; // Wether this plugin is running a struction or not
	}

	// virtual: inits the plugin
	init() {
		console.log("Plugin Base Class init: You should Override this function!");
	} 

	// virtual: run a specific instruction 
	// Params:
	// 	instruction_key: the name of the instruction to be executed
	// 	parameters: the paramaters that will be passed to the function
	run_instruction( instruction_key, parameters ) { 

		let instruction_ =  this.set_of_instructions.get( instruction_key ); 
		// Verify if the instruction was created
		if( instruction_ == null  )
			return "Instruction doesn't exist!", false; 

		//Run the instruction...
		let message, ok = instruction_(pararmeters);

		// We dont need to treat the error here, let the guy above treat it
		return message, ok;
	} 

	// check if the plugin was correctly initialized
	is_initialized() {
		return this.is_initialized == true;
	}

	// check if the plugin is running
	is_running() {
		return this.is_running == true;
	}
}
