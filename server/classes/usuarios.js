class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersonas(id, nombre, sala) {

        let persona = {
            id,
            sala,
            nombre
        }
        this.personas.push(persona);
        return this.getPersonasPorSala(sala);

    }

    getPersona(id) {

        let persona = this.personas.filter(p => p.id == id)[0];
        return persona;

    }

    getPersonas() {

        return this.personas;

    }

    getPersonasPorSala(sala) {

        let personasPorSala = this.personas.filter(p => p.sala == sala);
        return personasPorSala;

    }

    borrarPersona(id) {

        let persona = this.getPersona(id);
        this.personas = this.personas.filter(p => p.id !== id);
        return persona;

    }

}

module.exports = {
    Usuarios
}