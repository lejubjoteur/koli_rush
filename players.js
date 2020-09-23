class Player {
	characters
	pseudo
	id
	rank

	constructor(characters, pseudo, id, rank) {
		this.characters = characters
		this.pseudo = pseudo
		this.id = id
		this.rank= rank
	}
}

module.exports = {
	Player
}