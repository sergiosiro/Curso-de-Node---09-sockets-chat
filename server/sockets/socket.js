const { io } = require('../server');
const { crearMensaje } = require('../utilidades/utilidades');
const { Usuarios } = require('../classes/usuarios');

let usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.usuario || !data.sala) {
            return callback({
                err: true,
                mensaje: 'Usuario o sala no informado'
            })
        }
        client.join(data.sala);
        let personas = usuarios.agregarPersonas(client.id, data.usuario, data.sala);
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
        callback(personas);

    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `El usuario ${ personaBorrada.nombre } ha abandonado el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    })

});