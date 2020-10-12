BasePlugin = new require("./base_plugin.js");

module.exports = class Brick extends BasePlugin {
	constructor( sensors, actuators, parsed_instructions ) {
		super();

		this.actuator_ports = actuators || {
			"A" : null,
			"B" : null,
			"C" : null,
			"D" : null
		};
		this.sensor_ports = sensors || {
			"1" : null,
			"2" : null,
			"3" : null,
			"4" : null
		};

		this.parsed_instructions = parsed_instructions;
		this.instructions = {TICK: 'tick'};
		//this.set_of_instructions.set(this.instructions.TICK,this.tick.bind(this));
		this.set_of_instructions.set(this.instructions.TICK,() => this.tick());
		this.current_instruction = null;
		this.init();
	}

	init(){
		console.log("DEBUG: Initializing a Brick plugin!");
	}

	get_plugin_at_port( port ) {
		let plugin = this.actuator_ports[port];
		if ( plugin == null ) {
			return this.sensor_ports[port];
		}
		return plugin;
	}

	has_more_instructions() {
		return this.parsed_instructions.length > 0;
	}

	is_running_instruction() {
		return this.current_instruction != null;
	}

	tick() {
		if ( !this.is_running_instruction() && this.has_more_instructions()) {
			let instruction_ = this.parsed_instructions.shift();
			let plugin = this.get_plugin_at_port(instruction_.port);
			this.current_instruction = () => instruction_.run(plugin);
			this.current_instruction();
		}
		else if ( this.is_running_instruction() ){
			if( this.current_instruction() ) {
				this.current_instruction = null;
			}
		}
		return this.is_running_instruction() || this.has_more_instructions();
	}

}
