const inquirer = require('inquirer');
require('colors');

const menuOpt = [
    {
        type: 'list',
        name: 'option',
        message: `¿Qué deseas hacer?`,
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea(s)`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]


const inquireMenu = async () => {
        
        console.clear();
        console.log('Bienvenido a la aplicación de gestión de tareas\n'.bgWhite.black);
        console.log('=============================='.green);
        console.log('    Seleccione una opción:'.red);
        console.log('==============================\n'.green);
        
        const { option } = await inquirer.prompt(menuOpt);

        return option;

};


const pausa = async () => {

    const questions = {

        type: 'input',
        name: 'enter',
        message: `\nPresione ${ 'ENTER'.green} para continuar:\n`,
    
    }

    console.log('\n');
    await inquirer.prompt(questions);

}

const leerInput = async ( message ) => {

        const questions = {
            type: 'input',
            name: 'descripcion',
            message,
            validate: ( value ) => {
                if ( value.length === 0 ) {
                    return 'Por favor, ingrese un valor..';
                }
                return true;
            }
        }

        console.log('\n');
        const { descripcion } = await inquirer.prompt(questions);

        return descripcion;
    
}

const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( ( tarea, index ) => {

        const idx = `${index + 1} - `.green;
        const descripcion = tarea.descripcion;
        const completado = tareas.completado ? 'Completada'.green : 'Pendiente'.red;

        return {
            value: tarea.id,
            name: `${idx}${descripcion} - Estado: ${completado}`
        }
    })
    choices.unshift({
        value: '0',
        name:  '0 - '.green + 'Cancelar'
    })

    const preguntas = {
        type: 'list',
        name: 'id',
        message: 'Seleccione la tarea que desea borrar:',
        choices,
    }

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirm = async (message) => {

    const questions = {
        type: 'confirm',
        name: 'ok',
        message,
    }

    const { ok } = await inquirer.prompt(questions);
    return ok;
}

const mostrarListadoChecklist = async ( tareas = [] ) => {

    console.log('\n');
    const choices = tareas.map( ( tarea, index ) => {

        const idx = `${index + 1} - `.green;
        const descripcion = tarea.descripcion;
        // const completado = tareas.completadoEn ? 'Completada'.green : 'Pendiente'.red;
        // console.log(completado)
        return {
            value: tarea.id,
            name: `${idx}${descripcion}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    })

    const preguntas = {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione la(s) tarea(s):',
        choices,
    }

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}


module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirm,
    mostrarListadoChecklist
}