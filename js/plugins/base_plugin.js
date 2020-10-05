// Base class for a plugin
// every plugin must inherit from this class
export class BasePlugin{

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
		console.log("Plugin Base Class run_instruction: You should Override this function!");
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
