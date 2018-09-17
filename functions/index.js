const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    app = require('express')(),
    io = require('socket.io')(app);

admin.initializeApp();
let sockets = new Set();

// io.on('connection', socket => {
//     sockets.add(socket);
//     console.log(`socket id:${socket.id} added`);
//
//     socket.on('message', (m) => {
//         console.log(`message from client "${m}"`);
//         io.emit('message', {message: m})
//     });
//
//     socket.on('data', (d) => {
//         console.log(`data from client ${d.x} ${d.y}`);
//         io.emit('data', d)
//     });
//
//     socket.on('color', (c) => {
//         console.log(`colorfrom client "${c.hex}" "${c.type}"`);
//         io.emit('color', c)
//     });
//
//     socket.on('brushSize', (d) => {
//         console.log(`size from client "${d}"`);
//         io.emit('brushSize', d)
//     });
//
//     socket.on('disconnect', () => {
//         sockets.delete(socket);
//         console.log('disconnected');
//     });
// });
exports.sketchApp = functions.https.onRequest(io);
