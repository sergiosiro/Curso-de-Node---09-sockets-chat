const scrollBottom = () => {
    let divChatbox = $('#divChatbox');

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

const renderizarUsuarios = (usuarios) => {

    let seachParams = new URLSearchParams(window.location.search);
    let sala = seachParams.get('sala');

    $('small').text(sala);

    let html = `<li>
                    <a href="javascript:void(0)" class="active"> Chat de <span> ${ sala } </span></a>
                </li>`

    for (let usuario of usuarios) {

        html += `<li>
                    <a data-id="${ usuario.id }" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ${ usuario.nombre } <small class="text-success">online</small></span></a>
                </li>`

    }

    $('#divUsuarios').html(html);

}

const renderizarMensajes = (mensaje, yo) => {

    let html;
    let fecha = new Date(mensaje.fecha);
    let hora = `${ fecha.getHours() }:${ fecha.getMinutes() }`;
    if (yo) {

        html = `<li class="reverse">
                        <div class="chat-content">
                            <h5>${ mensaje.usuario }</h5>
                            <div class="box bg-light-inverse">${ mensaje.mensaje }</div>
                        </div>
                        <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                        <div class="chat-time">${ hora }</div>
                    </li>
`
    } else {
        let tipo;
        if (mensaje.usuario == 'Administrador') {
            tipo = 'danger';
        } else {
            tipo = 'info';
        }
        html = `<li class="animated fadeIn">
                    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
                        <div class="chat-content">
                            <h5>${ mensaje.usuario }</h5>
                            <div class="box bg-light-${ tipo }">${ mensaje.mensaje }</div>
                        </div>
                    <div class="chat-time">${ hora }</div>
                </li>`

    };

    $('#divChatbox').append(html);

}

$('#divUsuarios').on('click', 'a', function() {

    let id = $(this).data('id');

    if (id) {
        console.log(id);
    }

});

$('#formEnviar').on('submit', function(e) {

    e.preventDefault();

    let seachParams = new URLSearchParams(window.location.search);
    let usuario = seachParams.get('usuario');

    let mensaje = $('#txtMensaje').val();
    if (mensaje.trim().length > 0) {
        socket.emit('crearMensaje', { mensaje }, (resp) => {
            console.log(resp);
            renderizarMensajes(resp, true);
            scrollBottom();
            $('#txtMensaje').val('').focus();

        });

    }
})