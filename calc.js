const { dijkstraAlg } = require('./dijkstra.js');
let fs = require('fs');
let arg = process.argv;

let data;
try {
	data = fs.readFileSync(arg[2]);
} catch (err) {
	console.err(err);
}

data = data.toString();
if (data.charAt(data.length - 1) == '\n')
	data = data.substring(0, data.length - 1); // удаление символа переноса строки (line feed)
console.log('eval ', eval(data.replace(/\^/g, '**')));
let result = dijkstraAlg(data);

           /*Print*/        
console.log(`Expression (${arg[2]}): "${data}"`);
console.log(`RESULT: ${result}`);
           /*Print*/
