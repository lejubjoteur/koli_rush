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

	constructor(map) {
		// this.height = height;
		// this.width = width;
		this.height = map.length
		this.width = map[0].length
		for (let i = 0; i < this.height; i++)
		{
			this.map[i] = []
			for (let j = 0; j < this.width; j++)
			{
				if (map[i][j] == 0)
					this.map[i][j] = new Case(i + j, "hole")
				else if (map[i][j] == -1)
					this.map[i][j] = new Case(i + j, "void")
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