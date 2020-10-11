class InstructionParser {
	constructor() {
		
	}

	create_instruction( parameter_string ) {
		let parameters = JSON.parse(parameter_string);
		return {
			port : parameters.port,
			run : function( plugin ) { return plugin.run_instruction( parameters.instruction_code, parameters ) }
		}
	}

}
