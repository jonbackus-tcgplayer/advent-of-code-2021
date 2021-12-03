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

	let position1 = [0,0]
	let position2 = [0,0,0];

	for await (const line of rl) {
		currentLineNum++;
		
		let [direction, delta] = line.split(' ');
		delta = Number(delta);


		switch (direction) {
			case "forward":
				position1[0] += delta;

				position2[0] += delta;
				position2[1] += position2[2] * delta;
				break;
			case "up":
				position1[1] -= delta;
				position2[2] -= delta;
				break;
			case "down":
				position1[1] += delta;
				position2[2] += delta;
				break;
		}
	}

	answer1 = position1[0] * position1[1];
	answer2 = position2[0] * position2[1];

	console.table({
		'Problem 1:': answer1,
		'Problem 2:': answer2,
	})
})()