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
			[-1,-1,1,1,1,1,1,1,0,1,-1,-1],
			[-1,1,1,1,1,1,1,1,1,1,1,-1],
			[1,1,1,0,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1],
			[-1,1,1,1,1,1,1,1,1,1,1,-1],
			[-1,-1,1,0,1,1,1,0,1,1,-1,-1],
			[-1,-1,-1,1,1,1,1,1,1,-1,-1,-1],
			[-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1]
		]

app.use(express.static('public'))
io.on('connection', (socket) => {
	console.log('a user connected')
	newJoin(socket)
});

function newJoin (socket) {
	const game = new Game()
	const board = new Map(map)
	const cra = new Character("Cra", 3000, 6, 3, 5, 5)
	game.characters.push(cra)
	game.map = board
	socket.emit('stateChanged', game)
	socket.on('move', function (index, x, y) {
		console.log('move', index, x , y)
		let goodPath = game.pathfinding(game.map.map[game.characters[index].posY][game.characters[index].posX], game.map.map[y][x])
		let inter = setInterval(() => {
			let chemin = goodPath.pop()
			if (chemin == undefined)
			{
				clearInterval(inter)
				return
			}
			game.characters[index].move(chemin.x, chemin.y)
			socket.emit('stateChanged', game)
		}, 200)
	})
	socket.on('findPath', (index, x, y) => {
		let goodPath = game.pathfinding(game.map.map[game.characters[index].posY][game.characters[index].posX], game.map.map[y][x])
		socket.emit('drawPath', goodPath)
	})
}
