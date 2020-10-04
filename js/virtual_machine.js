export class Memory {
	constructor() {
		this.instruction_memory = new Array();
		this.data_memory = new Array();
		this.symbol_table = new Map();
		this.instruction_pointer = 0;
	}

	// Manipulação memória crua

	pushIntoDataMemory(value) {
		this.data_memory.push(value);
		return this.data_memory.size();
	}

	putDataIntoMemoryAddress(value,memory_address) {
		this.data_memory[memory_address] = value;
		return true;
	}

	// Manipulação tabela de simbolos

	addToSymbolTable(name,address) {
		let st = this.symbol_table;
		if (st.has(name)) {
			throw "There is already a variable defined with this name!";
		}
		st.set(name,address);
	}

	getAddressFromSymbolTable(name) {
		let st = this.symbol_table;
		if (!st.has(name)) {
			throw "Variable not declared!";
		}
		
		return st.get(name);
	}

	// Manipulação de variáveis
	
	setValueIntoVariable(name,value) {
		let memory_address = this.pushIntoDataMemory(value);
		this.addToSymbolTable(name,memory_address);
		return memory_address;
	}
	
	getValueFromMemoryAddress(address) {
		let memory = this.data_memory;

		if (address > memory.length || address < 0) {
			throw "Trying to access a Out-Of-Bounds address";
		}

		return memory[address];
	}

	getValueOfVariable(name) {
		let mem_address = this.getAddressFromSymbolTable(name);
		return this.getValueFromMemoryAddress(mem_address);
	}
	
	// Memória de instruções
	getInstructionPointerPosition() {
		return this.instruction_pointer;
	}

	runInstructionAt(current_instruction_pointer_position) {
		return this.instruction_memory[current_instruction_pointer_position]();
	}

	incrementInstructionPointer(jump_n_instructions = null) {
		this.instruction_pointer += jump_n_instructions || 1;
	}

}

export class Processor {
	constructor(memory = null,aditional_inst = null){
		let inst_set = new Map([
			['ADD',this.addTwoNumbers],
			['DIV',this.divTwoNumbers],
			['MUL',this.mulTwoNumbers],
			['SUB',this.subTwoNumbers],
		]);

		if (aditional_inst != null) { 
			inst_set = new Map([...inst_set,...aditional_inst]);
		}

		this.instruction_set = inst_set;
		this.memory = memory || Memory();
		this.registers = this.initRegisters();
	}

	initRegisters() {
		let mem = this.memory;

		return new Map([
			["REG_AAA",mem.setValueIntoVariable("REG_AAA",0)], // Registrador de OP matemáticas 1
			["REG_AAB",mem.setValueIntoVariable("REG_AAB",0)], // Registrador de OP matemáticas 2
			["REG_AAC",mem.setValueIntoVariable("REG_AAC",0)], // Registrador de resultados matemáticos
			["REG_AAD",mem.setValueIntoVariable("REG_AAD",0)],
			["REG_AAE",mem.setValueIntoVariable("REG_AAE",0)]
		]);
	}

	checkIfRegisterIsValid(register) {
		if(!this.registers.has(register)){
			throw "Invalid Register";
		}
	}

	loadFromMemoryToRegister(variable_name,register) {
		this.checkIfRegisterIsValid(register)

		let memory = this.memory;
		let registers = this.registers;

		let mem_value = memory.getValueOfVariable(variable_name);
		let register_address = registers.get(register);

		memory.putValueIntoMemoryAddress(mem_value,register_address);
	}

	getRegisterValue(register) {
		this.checkIfRegisterIsValid(register);
		let register_address = this.registers.get(register);
		return this.memory.getValueFromMemoryAddress(register_address);
	}

	setRegisterValue(value,register) {
		this.checkIfRegisterIsValid(register);
		let register_address = this.registers.get(register);
		return this.memory.putDataIntoMemoryAddress(value,register_address);
	}

	addTwoNumbers() {
		let n1 = this.getRegisterValue("REG_AAA");
		let n2 = this.getRegisterValue("REG_AAB");

		let result = n1 + n2;

		return this.setRegisterValue(result,"REG_AAC");
	}

	subTwoNumbers() {
		let n1 = this.getRegisterValue("REG_AAA");
		let n2 = this.getRegisterValue("REG_AAB");

		let result = n1 - n2;

		return this.setRegisterValue(result,"REG_AAC");
	}

	mulTwoNumbers() {
		let n1 = this.getRegisterValue("REG_AAA");
		let n2 = this.getRegisterValue("REG_AAB");

		let result = n1 * n2;

		return this.setRegisterValue(result,"REG_AAC");
	}

	divTwoNumbers() {
		let n1 = this.getRegisterValue("REG_AAA");
		let n2 = this.getRegisterValue("REG_AAB");

		if (n2 === 0){ throw "Division by Zero!" }

		let result = n1 / n2;

		return this.setRegisterValue(result,"REG_AAC");
	}

	runNextInstruction() {
		let mem = this.memory; 
		let current_instruction_pointer_position = mem.getInstructionPointerPosition();

		mem.runInstructionAt(current_instruction_pointer_position);
		mem.incrementInstructionPointer();

		return true;
	}
}

export class VirtualMachine {
	constructor(processor = null,memory = null) {
		let mem  = memory || Memory();
		let proc = processor || Processor(mem);
		this.processor = proc;
	}
	tick() {
		this.processor.runNextInstruction();
	}
}
