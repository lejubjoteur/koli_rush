class Case {
	id;
	state;

	constructor(id, state) {
		this.id = id;
		this.state = state;
	}
}

class Map {
	nbCase;
	height;
	width;
	map = [];

	getJSON(){

	}

	constructor(nbCase, height, width) {
		this.nbCase = nbCase;
		this.height = height;
		this.width = width;
		for (let i = 0; i < height; i++)
		{
			this.map[i] = []
			for (let j = 0; j < width; j++)
				this.map[i][j] = new Case(i + j, "empty")
		}
		console.log(this.map)
	}
}

module.exports = {
	Case, Map
}