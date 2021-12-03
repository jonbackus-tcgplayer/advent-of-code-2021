const fs = require('fs');
const readline = require('readline');

(async () => {	
	let answer1;
	let answer2;
	let currentLineNum = 0;

	let gamma = "";
	let epsilon = "";

	const rl = readline.createInterface({
		input: fs.createReadStream('input.txt'),
		crlfDelay: Infinity
	});

	const bitSums = [];

	for await (const line of rl) {
		currentLineNum++;

		line.split('').forEach((bit, position) => {
			bitSums[position] = (bitSums[position] || 0) + Number(bit);
		})
	}

	gamma = bitSums.map(x => currentLineNum / x >= 2 ? 1 : 0).join('');
	epsilon = bitSums.map(x => currentLineNum / x < 2 ? 1 : 0).join('');

	answer1 = parseInt(gamma, 2) * parseInt(epsilon, 2);


	console.table({
		'Problem 1:': answer1,
		'Problem 2:': answer2,
	})
})()