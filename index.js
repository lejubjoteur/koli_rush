const express = require('express')
const app = express()
const server = app.listen(3000)
const io = require('socket.io')(server)
const { Game } = require('./game')
const { Character } = require('./character')
const { Map } = require('./case')
const map = [
			[1,1,1,1,1],
			[1,1,1,1,1],
			[1,1,1,1,1],
			[1,1,1,1,1],
			[1,1,1,1,1]
		]

app.use(express.static('public'))
io.on('connection', (socket) => {
	console.log('a user connected')
	newJoin(socket)
});

function newJoin (socket) {
	const game = new Game()
	const board = new Map(map)
	const cra = new Character("Cra", 3000, 6, 3, 2, 4)
	game.characters.push(cra)
	game.map = board
	socket.emit('stateChanged', game)
	socket.on('move', function (index, x, y) {
		console.log('move', index, x , y)
		if (game.map.map[y][x].state != 'hole')
			game.characters[index].move(x, y)
		socket.emit('stateChanged', game)
	})
}
