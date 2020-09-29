class Game {
	nbPlayer = 0
	map
	characters = {}
	players = []
	playOrder = 0
	pmCount = 0

	calculHcost(current, caseEnd) {
		return (Math.sqrt((caseEnd.x - current.x) * (caseEnd.x - current.x) + (caseEnd.y - current.y) * (caseEnd.y - current.y)))
	}

	calculFcost(current, caseEnd, nbMaillon) {
		return (this.calculHcost(current, caseEnd) + 10 * nbMaillon)
	}

	findNeighbours(sCase) {
		let x = sCase.x
		let y = sCase.y
		let voisin = []

		if (y - 1 >= 0)
			voisin.push(this.map.map[y - 1][x])
		if (y + 1 < this.map.height)
			voisin.push(this.map.map[y + 1][x])
		if (x - 1 >= 0)
			voisin.push(this.map.map[y][x - 1])
		if (x + 1 < this.map.width)
			voisin.push(this.map.map[y][x + 1])
		return (voisin)
	}

	checkInTab(newCase, tab) {
		for (let meta of tab)
		{
			if (newCase.id == meta.case.id)
				return meta
		}
		return undefined
	}

	pathfinding(sCase, eCase) {
		let Open = []
		let Close = []
		let goodPath = []
		let ptr = { case : sCase, parent : 0, Fcost : this.calculFcost(sCase, eCase, 0), nbMaillon : 0 }
		
		Open.push(ptr)
		let i = 0
		while(ptr.case.id != eCase.id)
		{
			i++
			Open.sort((a, b) => a.Fcost - b.Fcost)
			Object.assign(ptr, Open[0])
			Close.push(Open.shift())
			for (let maillon of this.findNeighbours(ptr.case))
			{
				if (maillon.state != 'empty' || this.checkInTab(maillon, Close))
					continue
				if (this.checkInTab(maillon, Open))
				{
					let meta = this.checkInTab(maillon, Open)
					if (meta.Fcost > this.calculFcost(maillon, eCase, ptr.nbMaillon + 1))
					{
						for (let index in Open)
						{
							if (maillon.id == Open[index].case.id)
								Open.splice(index, 1)
						}
					}
					else
						continue
				}
				//ajout de chaques nouveaux  voisins valides a mon tableau Open
				let newObj = {}
				Object.assign(newObj, ptr)
				Open.push({case : maillon, parent : newObj, Fcost : this.calculFcost(maillon, eCase, newObj.nbMaillon + 1), nbMaillon : newObj.nbMaillon + 1})
			}
		}
		while (ptr.parent != 0)
		{
			goodPath.push(ptr.case)
			ptr = ptr.parent
		}
		return (goodPath)
	}

	pmRange(sCase, pm) {
		let pmRange = []
		let path = []

		for (let i in this.map.map) {
			for (let j in this.map.map[i]) {
				if (this.map.map[i][j].state != 'empty')
					continue
				path = this.pathfinding(sCase, this.map.map[i][j])
				if (path.length <= pm) {
					for (let p of path)
						pmRange.push(p)
				}
			}
		}
		return (pmRange)
	}

	constructor() {

	}
}

module.exports = {
	Game
}