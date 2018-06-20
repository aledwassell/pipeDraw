const app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    PORT = process.env.port || 3200;

    let timerId = null,
        chatId = null,
        sockets = new Set();

// app.use(express.static(__dirname + '/dist'));

io.on('connection', socket => {
    sockets.add(socket);
    console.log(`socket id:${socket.id} added`);

    // if (!timerId) {
    //     startTimer();
    // }
    if (!chatId) {
        startChat();
    }

    socket.on('message', (message) => {
        console.log(`message from client ${message}`);
        io.emit('message', {type: 'new-message', text: message})
    });

    socket.on('disconnect', () => {
        sockets.delete(socket);
        console.log('disconnected');
    });


});


function startTimer() {
    //Simulate stock data received by the server that needs
    //to be pushed to clients
    timerId = setInterval(() => {
        if (!sockets.size) {
            clearInterval(timerId);
            timerId = null;
            console.log(`Timer stopped`);
        }
        let value = ((Math.random() * 50) + 1).toFixed(2);
        //See comment above about using a "room" to emit to an entire
        //group of sockets if appropriate for your scenario
        //This example tracks each socket and emits to each one
        for (const s of sockets) {
            console.log(`Emitting value: ${value}`);
            s.emit('data', { x: value, y: 2 });
        }

    }, 500);
}

function startChat() {
    chatId = setInterval(() => {
        if(!sockets.size){
            clearInterval(chatId);
            chatId = null;
            console.log('chat stopped');
        }

        let value = ((Math.random() * 50) + 1).toFixed(2);

        for (const s of sockets) {
            console.log(`Emitting value: ${value}`);
            s.emit('data', { x: value, y: value });
        }

    }, 200)
}

http.listen(PORT, () => {
    console.log(`listening port: ${PORT}`)
})