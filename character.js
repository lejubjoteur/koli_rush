class Character {
	name
	hp
	pa
	pm
	posX
	posY

	constructor(name, hp, pa, pm, posX, posY) {
		this.name = name;
		this.hp = hp;
		this.pa = pa;
		this.pm = pm;
		this.posX = posX
		this.posY = posY
	}

	move(x, y) {
		if (/*this.pm > 0 &&*/ 
			(this.posX != x || this.posY != y)
				&& (
						((this.posY - y == 1 || y - this.posY == 1) && this.posX - x == 0)
							|| (this.posY - y == 1 && x - this.posX == 1) 
							|| (this.posX - x == 1 && y - this.posY == 1)
							|| (x - this.posX == 1 && y - this.posY == 1)
							|| (this.posX - x == 1 && this.posY - y == 1)
					)
		)
		{
			this.posX = x
			this.posY = y
			// this.pm--
		}
	}

	data() {
		return `${this.name} | ${this.hp} hp | ${this.pa} pa | ${this.pm} pm`;
	}
}

module.exports = {
	Character
}