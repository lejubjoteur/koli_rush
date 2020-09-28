const express = require('express')
const app = express()
const server = app.listen(3000)
const io = require('socket.io')(server)
const { Game } = require('./game')
const { Character } = require('./character')
const { Map } = require('./case')

const map = [
	[-1,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1],
	[-1,-1,-1,1,1,1,1,1,1,-1,-1,-1],
	[-1,-1,1,1,1,1,0,0,1,1,-1,-1],
	[-1,1,1,0,1,1,1,1,1,1,1,-1],
	[1,1,1,0,0,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[-1,1,1,1,1,1,1,1,1,1,1,-1],
	[-1,-1,1,0,1,1,1,0,1,1,-1,-1],
	[-1,-1,-1,1,1,1,1,1,1,-1,-1,-1],
	[-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1]
]

const game = new Game()
const board = new Map(map)
game.map = board

app.use(express.static('public'))
io.on('connection', (socket) => {
	console.log('a user connected')
	initGame(socket)
	newConnect()
});

function newConnect() {
	const cra = new Character("Cra", 3000, 11, 5, 5, 5)
	const bouftou = new Character("Bouftou", 900, 8, 4, 8, 8)

	
	game.characters.push(cra)
	game.characters.push(bouftou)
}

function initGame (socket) {
	socket.emit('stateChanged', game)
	socket.on('move', function (index, x, y) {
		let goodPath = game.pathfinding(game.map.map[game.characters[index].posY][game.characters[index].posX], game.map.map[y][x])
		if (goodPath.length <= game.characters[index].pm && game.characters[index].pm > 0) {
			let inter = setInterval(() => {
				let chemin = goodPath.pop()
				if (chemin == undefined)
				{
					clearInterval(inter)
					return
				}
				game.characters[index].move(chemin.x, chemin.y)
				game.characters[index].pm -= 1
				socket.emit('stateChanged', game)
			}, 200)
		}
	})
	socket.on('findPath', (index, x, y) => {
		let pmRange = game.pmRange(game.map.map[game.characters[index].posY][game.characters[index].posX], game.characters[index].pm)
		let goodPath = game.pathfinding(game.map.map[game.characters[index].posY][game.characters[index].posX], game.map.map[y][x])
		if (goodPath.length <= game.characters[index].pm)
			socket.emit('drawPath', goodPath)
		else
			socket.emit('drawPmRange', pmRange)
	})
}
