const app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    PORT = process.env.port || 3200;

    let sockets = new Set();

// app.use(express.static(__dirname + '/dist'));

io.on('connection', socket => {
    sockets.add(socket);
    console.log(`socket id:${socket.id} added`);

    socket.on('data', (d) => {
        console.log(`data from client ${d.x} ${d.y}`);
        io.emit('data', d)
    });

    socket.on('message', (m) => {
        console.log(`message from client "${m}"`);
        io.emit('message', {message: m})
    });

    socket.on('color', (c) => {
        console.log(`colorfrom client "${c}"`);
        io.emit('color', {color: c})
    });

    socket.on('brushSize', (d) => {
        console.log(`size from client "${d}"`);
        io.emit('brushSize', d)
    });

    socket.on('disconnect', () => {
        sockets.delete(socket);
        console.log('disconnected');
    });


});

http.listen(PORT, () => {
    console.log(`listening port: ${PORT}`)
})