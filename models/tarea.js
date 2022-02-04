const { v4: uuidv4 } = require('uuid');

class Tarea {

    id = "";
    descripcion = "";
    completadoEn = null

    get descripcion() {
        return this._descripcion;
    }

    constructor( descripcion ) {

        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completadoEn = null;

    }

}


module.exports = Tarea;