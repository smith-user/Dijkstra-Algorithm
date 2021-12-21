const { dijkstraAlg } = require('./dijkstra.js');
let fs = require('fs')
let report = [];
let countFailure = 0;	

			/* TestCases: */
test('1+2*4');

test('2*2^4');

test('2^2^3');

test('(1+2)/3');

test('10/-5');

test('0.2*0.5');

test('0.15/0.3');

test('(1+2)/3');

test('100/(4+6)');

test('(15-5)/(4+6)');

test('-1+2*3^3-9');

test('(1+2-3*1024/2^2^3)*(8-9)');

			/* TestCases  */


function test(expression) {
	let result = dijkstraAlg(expression);
	let expectation = eval(expression.replace(/\^/g, '**'));
	report.push(` ${expression} = ${result} `);
	if (result != expectation) {
		report.push(`\tCorrect answer is '${expectation}'.`);
		countFailure += 1;
	}
}		

fs.writeFile('testsReport.txt', report.join('\n'), (err) => {
		if (err){
			console.err(err);
			return;
		}
		console.log(`The tests are finished! Failed tests: ${countFailure}.`);
		console.log('Read more in testsReport.txt');
	});
