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

        renderizarUsuarios(resp);

    });


})

socket.on('crearMensaje', (data) => {
    renderizarMensajes(data, false);
    scrollBottom();
});

socket.on('mensajePrivado', (data) => {
    console.log(data);
});

socket.on('listaPersonas', (data) => {
    renderizarUsuarios(data);
});