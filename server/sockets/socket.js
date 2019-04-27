const { io } = require('../server.js');
io.on('connection', (client) => {

    console.log('Se conectó el cliente');

    client.emit('emitirMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido al mundo de Siro'

    });

    client.on('disconnect', () => {
        console.log('El cliente se ha desconectado');
    });

    client.on('emitirMensaje', (mensaje) => {
        console.log(mensaje);
        client.broadcast.emit('emitirMensaje', mensaje);
        // if (mensaje.usuario) {
        //     callback({
        //         respuesta: 'Todo salió bien!'
        //     })
        // } else {
        //     callback({
        //         respuesta: 'Usuario no informado!!'
        //     });
        // }
    });
})