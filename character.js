class Character {

	constructor(name, hp, pa, pm) {
		this.name = name;
		this.hp = hp;
		this.pa = pa;
		this.pm = pm;
	}

	data() {
		return `${this.name} | ${this.hp} hp | ${this.pa} pa | ${this.pm} pm`;
	}
}

module.exports = {
	Character
}