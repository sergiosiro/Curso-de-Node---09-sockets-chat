let socket = io();

socket.on('connect', () => {

    let seachParams = new URLSearchParams(window.location.search);
    if (!seachParams.has('usuario') || !seachParams.has('sala')) {
        window.location = 'index.html';
        throw new Error('No se informa el usuario o la sala');
    }

    let usuario = seachParams.get('usuario');
    let sala = seachParams.get('sala');

    socket.emit('entrarChat', { usuario, sala }, (resp) => {

        console.log('personas:', resp)

    });


})

// socket.on('disconnect', () => {
//     console.log('Se perdió la conexión al servidor...');
// })

// socket.emit('emitirMensaje', {
//     usuario: 'Sergio',
//     edad: 42,
//     info: 'Hola Mundo!'
// })

socket.on('crearMensaje', (data) => {
    console.log(data);
});

socket.on('mensajePrivado', (data) => {
    console.log(data);
});

socket.on('listaPersonas', (data) => {
    console.log(data);
});