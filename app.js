require('colors');

const { inquireMenu, 
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirm,
        mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {
    console.clear();
    console.log('Starting app...\n'.green);

    let option = null;
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    
    do {
        option = await inquireMenu();
        
        switch (option) {

            case '1':
                const descripcion = await leerInput('Ingrese la descripción de la tarea:');
                tareas.crearTarea( descripcion );
            break;
            
            case '2':
                tareas.listarCompleto();
            break;
            
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                // console.log(ids);

            break;
            
            case '6':
                const idBorrar = await listadoTareasBorrar( tareas.listadoArr );
                if ( idBorrar !== '0' ) {
                    const ok = await confirm('¿Está seguro de borrar la tarea?')
                    if ( ok ) {
                        tareas.borrarTarea( idBorrar );
                        console.log('Tarea borrada con éxito'.green);
                    }
                }
            break;
        
            case '0':
                console.log('Saliendo...\n'.red);
            break;
        
            default:
                console.log('Opción inválida\n'.red);
            break;
        }


        guardarDB( tareas.listadoArr ); // Guardar en el archivo JSON

        await pausa();
    
    } while ( option != 0 );


}


main();


