require('colors');


const mostrarMenu = () => {
    
    return new Promise( resolve => {

        console.clear();
        console.log('Bienvenido a la aplicación de gestión de tareas\n'.green);
        console.log('=============================='.green);
        console.log('    Seleccione una opción:'.green);
        console.log('==============================\n'.green);
        console.log(`${'1'.green} - Crear una tarea`);
        console.log(`${'2'.green} - Listar tareas`);
        console.log(`${'3'.green} - Listar tareas completadas`);
        console.log(`${'4'.green} - Listar tareas pendientes`);
        console.log(`${'5'.green} - Completar tarea(s)`);
        console.log(`${'6'.green} - Borrar tarea(s)`);
        console.log(`${'0'.green} - Salir\n`);
        console.log('=============================='.green);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (opcion) => {
            readline.close();
            resolve(opcion);
        });
    })
}

const pausa = () => {

    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${ 'ENTER'.green} para continuar:\n`, opcion => {
            readline.close();
            resolve();
        });

    })


}





module.exports = {
    mostrarMenu,
    pausa
}