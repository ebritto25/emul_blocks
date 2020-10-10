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
		this.sensor_ports = sensor || {
			"1" : null,
			"2" : null,
			"3" : null,
			"4" : null
		};

		this.instructions = {TICK: 'tick'};
		this.set_of_instructions.set(this.instructions.TICK,this.tick);
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

	tick() {
		let instruction_ = this.parsed_instructions.shift();
		let plugin = get_plugin_at_port(instruction_.port);
		instruction_.run(plugin);
	}

}
