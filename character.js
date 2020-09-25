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
		this.posX = x
		this.posY = y
	}

	data() {
		return `${this.name} | ${this.hp} hp | ${this.pa} pa | ${this.pm} pm`;
	}
}

module.exports = {
	Character
}