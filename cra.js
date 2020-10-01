const { Character } = require("./character");

class Cra extends Character {
	spells = {}

	constructor(name, hp, pa, pm, posX, posY, spells) {
		super(name, hp, pa, pm, posX, posY)
		spells = {}
	}
}