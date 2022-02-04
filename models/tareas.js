const moment = require('moment');
const Tarea = require("./tarea");

class Tareas {

    _listado = {};


    get listadoArr() {
        const listadoArr = [];
        // listadoArr.push( ...Object.values( this._listado ) );
        Object.keys( this._listado ).forEach( key => {
            listadoArr.push( this._listado[ key ] );
        });
        return listadoArr;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){
        
        if( this._listado[ id ] ){
            delete this._listado[ id ];
        }
    
    }


    crearTarea( descripcion = '' ) {
        const tarea = new Tarea( descripcion );
        this._listado[ tarea.id ] = tarea;
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        });
    }

    listarCompleto( ){

        console.log('\nListando todas las tareas...\n'.trap);
        Object.values( this._listado ).forEach( (tarea, index) => {

            const idx = `${index + 1} - `.green;
            const { descripcion, completadoEn } = tarea;
            const completado = (completadoEn) 
                                    ? `Completada`.green 
                                    : 'Pendiente'.red;

            console.log(`${idx} ${descripcion} :: ${completado}`);
        });

    }

    listarPendientesCompletadas( completadas = false ){
            
        console.log('\nListando tareas pendientes...\n'.trap);
        let contador = 0;
        Object.values( this._listado ).forEach( (tarea, index) => {

            const idx = `${index + 1} - `.green;
            const { descripcion, completadoEn } = tarea;
            const completado = (completadoEn) 
                                    ? `Completada`.green 
                                    : 'Pendiente'.red;
            
            if ( completadas ){
                // completado
                if ( completadoEn ){
                    contador++;
                    let date = moment(completadoEn).format("MMM Do YY").toString().green;
                    // console.log( date.toString().green );
                    console.log(`${ (contador + ' -').green} ${descripcion} :: ${'Finalizacion'.green}: ${date}`);
                };
            } else {
                // pendientes
                if ( !completadoEn ){
                    contador++;
                    console.log(`${ (contador + ' - ').red} ${descripcion} :: ${completado}`);
                };
            };
        });
    };

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[ id ];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            };

        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        })

    };

};



module.exports = Tareas;