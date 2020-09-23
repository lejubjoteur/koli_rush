const express = require('express')
const app = express()
const server = app.listen(3000)
const io = require('socket.io')(server)
const { Character } = require('./character')
const { Map } = require('./case')

app.use(express.static('public'))
const map = new Map(0, 5, 5)
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.emit('mapChanged', map.map)
});

const cra = new Character("Cra", 3000, 12, 6);
const iop = new Character("Iop", 3500, 12, 6);

console.log(cra.data());
console.log(iop.data());