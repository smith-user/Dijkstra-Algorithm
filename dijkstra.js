module.exports.dijkstraAlg = function (exp) {	
	let rpn = getReversePolishNotation(exp);
	
	let result = calculate(rpn);
	
	return result;	
}

function getReversePolishNotation(exp) {
	let stack = new Array();
	let sp = 0; // Stack Pointer указывает на первую свободную ячейку
	let operPrio = { 
		'+': 0, '-': 0, 
		'*': 1, '/': 1, 
		'^': 2 
	};
	let rpn = new Array();
	let number = '';
	for (let i = 0; i < exp.length; i++) {
		char = exp[i];
		if (!isNaN(Number(char)) || char == '.' || char == ',' // проверка на число
		|| ( char == '-' && ( (i > 0 && isNaN(Number(exp[i - 1])) || i == 0) )) // проверка на унарный минус
		) {
			number += char;
			continue;
		}
		else if (number != '') {
			rpn.push(number);
			number = '';
		}
		
		if (char == '(') {
			stack[sp] = char;
			sp++;
		} else if (char == ')') {
			while (stack[sp - 1] != '(') {
				rpn.push(stack[sp - 1]);
				sp--;
			}
			sp--;
		} else {
			/*OPERATIONS*/
			while ( (sp - 1 >= 0) && (operPrio[char] != undefined) && ( 
				(char != '^' && operPrio[char] <= operPrio[ stack[sp - 1] ])
				|| (char == '^' && operPrio[char] < operPrio[ stack[sp - 1] ])
			)) {
				rpn.push(stack[sp - 1]);
				sp--;
			}	
			stack[sp] = char;
			sp++;
		}	
	}
	if (number != '')
		rpn.push(number);

	
	for(; sp > 0; sp--) 
		rpn.push(stack[sp - 1]);
	return rpn	
}

function calculate(rpn) {
	let stack = new Array();
	let sp = 0; // Stack Pointer указывает на первую свободную ячейку
	for (elem of rpn) {
		if (isNaN(Number(elem))) {
			stack[sp - 2] = executeOperation(elem, stack[sp - 2], stack[sp - 1]);
			sp--;
		} else {
			stack[sp] = Number(elem);
			sp++;
		}
	}
	if (sp != 1) 
		throw new Error(`Invalid expression!`);
	return stack[0]
}

function executeOperation(oper, num1, num2) {
	let result;
	switch (oper) {
		case '+':
			result = num1 + num2;
			break;
		case '-':
			result = num1 - num2;
			break;
		case '/':
			result = num1 / num2;
			break;
		case '*':
			result = num1 * num2;
			break;
		case '^':
			result = Math.pow(num1, num2);
			break;
		default:
			throw new Error(`Invalid arithmetic operation: ${oper}`);
	}
	return result;
}

