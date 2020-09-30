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
const cra = new Character("Cra", 3000, 11, 5, 5, 5)
const bouftou = new Character("Bouftou", 900, 8, 4, 5, 6)
let tabChar = []
tabChar.push(cra)
tabChar.push(bouftou)

app.use(express.static('public'))
io.on('connection', (socket) => {
	// Limite nb de joueurs
	if (tabChar.length > 0)
	{
		console.log('a user connected', socket.id)
		newConnect(tabChar, socket.id)
		initGame(socket)
	}
});



function newConnect(tabChar, socketId) {

	game.characters[socketId] = tabChar.shift()
}

function initGame (socket) {
	socket.emit('stateChanged', game)
	socket.on('move', (x, y) => {
		if (Object.keys(game.characters)[game.playOrder] != socket.id){
			return
		}
		game.map.map[game.characters[socket.id].posY][game.characters[socket.id].posX].state = 'empty'
		let goodPath = game.pathfinding(game.map.map[game.characters[socket.id].posY][game.characters[socket.id].posX], game.map.map[y][x])
		if (goodPath.length <= game.characters[socket.id].pm - game.pmCount) {
			let inter = setInterval(() => {
				let chemin = goodPath.pop()
				if (chemin == undefined)
				{
					clearInterval(inter)
					game.map.map[game.characters[socket.id].posY][game.characters[socket.id].posX].state = 'bloc'
					return
				}
				game.characters[socket.id].move(chemin.x, chemin.y)
				game.pmCount += 1
				io.emit('stateChanged', game)
			}, 80)
		}
	})
	socket.on('findPath', (x, y) => {
		if (Object.keys(game.characters)[game.playOrder] != socket.id)
			return
		let pmRange = game.pmRange(game.map.map[game.characters[socket.id].posY][game.characters[socket.id].posX], game.characters[socket.id].pm - game.pmCount)
		let goodPath = game.pathfinding(game.map.map[game.characters[socket.id].posY][game.characters[socket.id].posX], game.map.map[y][x])
		if (goodPath.length <= game.characters[socket.id].pm - game.pmCount)
			socket.emit('drawPath', goodPath)
		else
			socket.emit('drawPmRange', pmRange)
	})
	socket.on('endTurn', () => {
		game.playOrder += 1
		game.pmCount = 0
		if (game.playOrder >= Object.keys(game.characters).length)
			game.playOrder = 0
	})
}
