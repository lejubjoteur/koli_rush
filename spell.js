class spell {
	type
	x
	y

	constructor(type, dammage, x, y) {
		this.type = type
		this.x = x
		this.y = y
	}

	posLine(sCase) {

	}

	posDiag(sCase) {

	}

	posMultiWay(sCase, map) {
		let ldv = []
		for (let rows of map) {
			for (let pos of map[rows]) {
				if (map[rows][pos].state != 'empty')
					continue
				let vect = { posX : map[rows][pos].x - sCase.x, posY : map[rows][pos].y - sCase.y}
				let tmpX = sCase.x
				let tmpY = sCase.y
				let i = 0
				while ((map[tmpY][tmpX].state == 'empty' || map[tmpY][tmpX].state == 'hole' || map[tmpY][tmpX].id != map[rows][pos].id) && i < 50) {
					tmpX += vect.posX / 50
					tmpY += vect.posY / 50
					i++
				}
				if (map[tmpY][tmpX].id == map[rows][pos].id)
					ldv.push(map[rows][pos])
			}
		}
		return (ldv)
	}
}