const fs = require('fs');
const readline = require('readline');

(async () => {	
    console.time('execution');

	let answer1;
	let answer2;
	let currentLineNum = 0;

	const rl = readline.createInterface({
		input: fs.createReadStream('input.txt'),
		crlfDelay: Infinity
	});

    let draws = [];
    let boards = [];

	for await (const line of rl) {
		currentLineNum++;

        if (currentLineNum === 1) {
            draws = line.split(',');
        }
        else if (line === '') {
            boards.push([]);
        }
        else {
            const numbers = line.split(' ').filter(l => l);
            boards[boards.length - 1].push(numbers);
        }
	}

    const boardsWithAllWinningLines = boards.map(board => {
        let _board = board.slice();

        board[0].forEach((number, colIndex) => {
            _board.push([
                board[0][colIndex],
                board[1][colIndex],
                board[2][colIndex],
                board[3][colIndex],
                board[4][colIndex],
            ])
        })

        _board = _board.map(line => line.map(number => ({
            number,
            marked: false,
        })));

        return _board;
    });

    const winningBoardIndices = [];
    let lastWinningDraw;

    const markNumberOnBoards = (number) => {
        boardsWithAllWinningLines.forEach(board => {
            board.forEach(line => {
                line.forEach(location => {
                    if (location.number === number) {
                        location.marked = true;
                    }
                })
            })
        })
    }

    const checkForWinningBoards = () => {
        const newWinningBoardIndices = []
        
        boardsWithAllWinningLines.forEach((board, boardIndex) => {
            if (winningBoardIndices.includes(boardIndex)) {
                return;
            }

            board.forEach((line, lineIndex) => {
                if (!line.filter(location => !location.marked).length) {
                    winningBoardIndices.push(boardIndex);
                    newWinningBoardIndices.push(boardIndex);
                }
            });
        })

        if (!newWinningBoardIndices.length) {
            return undefined;
        }

        return newWinningBoardIndices;
    }

    const getBoardScore = (board, lastDraw) => {
        const sumOfUnmarkedNumbers = board.slice(0, 5).reduce((prev, current) => {
            return prev + current.reduce((prev, current) => {
                if (current.marked) {
                    return prev;
                }
                return prev + parseInt(current.number);
                
            }, 0);
        }, 0);

        return sumOfUnmarkedNumbers * lastDraw;
    }

    for (const draw of draws) {
        markNumberOnBoards(draw);

        const winningBoards = checkForWinningBoards();

        if (winningBoards !== undefined) {
            lastWinningDraw = draw;

            if (answer1 === undefined) {
                answer1 = getBoardScore(boardsWithAllWinningLines[winningBoards[0]], draw);
            }
        }
    }

    const drawsUntilLastBoardWin = draws.slice(0, draws.findIndex(draw => draw === lastWinningDraw) + 1);

    const lastWinningBoard = boardsWithAllWinningLines[winningBoardIndices[winningBoardIndices.length - 1]]
        .map(line => line
            .map(location => ({
                number: location.number,
                marked: drawsUntilLastBoardWin.includes(location.number),
                
            })
        )
    );

    answer2 = getBoardScore(lastWinningBoard, lastWinningDraw);

	console.table({
		'Problem 1:': answer1,
		'Problem 2:': answer2,
	})

    console.timeEnd('execution');
})();