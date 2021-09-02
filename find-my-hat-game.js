const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let endOfGame = false;

class Field {
	constructor(newField) {
		this._field = newField;
		this._xLoc = 0;
		this._yLoc = 0;
	}
	get field() {
		return this._field;
	}
	
	get xLoc() { return this._xLoc; }
	set xLoc(newX) { this._xLoc = newX; }
	get yLoc() { return this._yLoc; }
	set yLoc(newY) { this._yLoc = newY; }
	
	moveLeft() { this._xLoc -= 1; }
	moveRight() { this._xLoc += 1; }
	moveUp() { this._yLoc -= 1; }
	moveDown() { this._yLoc += 1; }
	
	print() {
		this._field.forEach(item => {
			console.log(item.join(" "));
		}, 0);
	}
	
	checkLocation(x,y) {
		//prevents error if first value is undefined
		if (this.field[y]) {
			return this.field[y][x];
		} else {
			return this.field[y]
		}
	}
	
	static generateField(height, width, percent) {
		let randomField = [];
		
		//create an empty field using height and width
		for (let i = 0; i < height; i++) {
			let fieldArray = [];
			for (let j = 0; j < width; j++) {
				fieldArray.push(fieldCharacter);
			}
			randomField.push(fieldArray);
		}
		
		//add character marker
		randomField[0][0] = [pathCharacter];
		
		//add hat to the bottom half of the field
		let randHeight = Math.floor(Math.random()*height);
		let randWidth = Math.floor(Math.random()*width);
		let randLocation = randomField[randHeight][randWidth];
		let hatPlaced = false;
			while (!hatPlaced) {
				if (randHeight > height/3) {
					randomField[randHeight][randWidth] = hat;
					hatPlaced = true;
				}
			}
		
		//determine amount of holes to add based on percent
		let holesToAdd = Math.round((height*width)*(percent/100));
		//...and add them to a random location
		do {
			//get new random number
			let randHeight = Math.floor(Math.random()*height);
			let randWidth = Math.floor(Math.random()*width);
			let randLocation = randomField[randHeight][randWidth];
			//prevent hole placement on starting location or hat
			if (randLocation != pathCharacter && randLocation != hat) {
				randomField[randHeight][randWidth] = hole;
				holesToAdd--;
			}
		} while (holesToAdd > 0);
	
		return randomField;
	}
}

function checkMoveLocation(obj, input) {
	switch (input) {
		case 'w':
			obj.moveUp();
			return obj.checkLocation(obj.xLoc, obj.yLoc);
			break;
		case 'a':
			obj.moveLeft();
			return obj.checkLocation(obj.xLoc, obj.yLoc);
			break;
		case 's':
			obj.moveDown();
			return obj.checkLocation(obj.xLoc, obj.yLoc);
			break;
		case 'd':
			obj.moveRight();
			return obj.checkLocation(obj.xLoc, obj.yLoc);
			break;
		default:
			console.log('Invalid Input');
			break;
	}
}

const myField = new Field(Field.generateField(10,10,30));

console.log('Find your hat! (AWSD keys to move)');

while (!endOfGame) {
	
	myField.print();
	
	const currX = myField.xLoc;
	const currY = myField.yLoc;
	const question = prompt('Which direction?');
	const move = checkMoveLocation(myField, question);
	
	switch (move) {
		case pathCharacter:
			console.log('You must press on...');
			//prevents movement to previous locations
			myField.xLoc = currX; myField.yLoc = currY; break;
		case undefined:
			endOfGame = true;
			console.log('You fell off the edge of the earth. Told you it was flat!');
			console.log('GAME OVER!'); break;
		case hole:
			endOfGame = true;
			console.log('OOOH NOOOooo...!')
			console.log('GAME OVER!'); break;
		case hat:
			endOfGame = true;
			console.log('You found your hat!');
			console.log('YOU WIN!!'); break;
		case fieldCharacter:
			myField._field[myField._yLoc][myField._xLoc] = pathCharacter; break;
		default:
			console.log('Invalid Input'); break;
	}
}