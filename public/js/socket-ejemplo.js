let socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor...');
})

socket.on('disconnect', () => {
    console.log('Se perdió la conexión al servidor...');
})

socket.emit('emitirMensaje', {
    usuario: 'Sergio',
    edad: 42,
    info: 'Hola Mundo!'
})

socket.on('emitirMensaje', (mensaje) => {
    console.log('Servidor: ', mensaje);
})