const fs = require('fs');
const readline = require('readline');

(async () => {	
	let answer1 = 0;
	let answer2 = 0;
	let currentLineNum = 0;

	const rl = readline.createInterface({
		input: fs.createReadStream('input.txt'),
		crlfDelay: Infinity
	});

	let previousDepth;
	let previous3Depths = [];

	for await (const line of rl) {
		currentLineNum++;
		const depth = Number(line);

		if (currentLineNum === 1) {
			previous3Depths.push(depth);
			previousDepth = depth;

			continue;
		}

		
		if (depth > previousDepth) {
			answer1++;
		}

		if (previous3Depths.length === 3) {
			if (depth > previous3Depths[0]) {
				answer2++;
			}

			previous3Depths.shift();
		}

		previous3Depths.push(depth);
		previousDepth = depth;
	}

	console.table({
		'Problem 1:': answer1,
		'Problem 2:': answer2,
	})
})()