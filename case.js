class Case {
	id;
	state;

	constructor(id, state) {
		this.id = id;
		this.state = state;
	}
}

class Map {
	height;
	width;
	map = [];

	getJSON(){

	}

	constructor(height, width) {
		this.height = height;
		this.width = width;
		for (let i = 0; i < height; i++)
		{
			this.map[i] = []
			for (let j = 0; j < width; j++)
			{
				if (i == 3 && j == 3)
					this.map[i][j] = new Case(i + j, "hole")
				else if (i == 7 && j == 2)
					this.map[i][j] = new Case(i + j, "hole")
				else
					this.map[i][j] = new Case(i + j, "empty")
			}
		}
		console.log(this.map)
	}
}

module.exports = {
	Case, Map
}