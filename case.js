class Case {
	id;
	state;
	x;
	y;

	constructor(id, state, x, y) {
		this.id = id;
		this.state = state;
		this.x = x;
		this.y = y;
	}
}

class Map {
	height;
	width;
	map = [];

	getJSON(){

	}

	constructor(map) {
		this.height = map.length
		this.width = map[0].length
		let k = 0
		for (let i = 0; i < this.height; i++)
		{
			this.map[i] = []
			for (let j = 0; j < this.width; j++)
			{
				if (map[i][j] == -1)
					this.map[i][j] = new Case(k, "void", i, j)
				else if (map[i][j] == 0)
					this.map[i][j] = new Case(k, "hole", j, i)
				else if (map[i][j] == 2)
					this.map[i][j] = new Case(k, "bloc", i, j)
				else
					this.map[i][j] = new Case(k, "empty", j, i)
				k++
			}
		}
	}
}

module.exports = {
	Case, Map
}