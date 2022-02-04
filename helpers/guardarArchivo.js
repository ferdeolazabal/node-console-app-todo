const fs = require('fs');
const archivo = 'db/data.json';



const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify( data,null, 2 )), (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    };
};

const leerDB = ( data ) => {
        
    if ( !fs.existsSync( archivo ) ){
        return null
    }
    let dataJSON = fs.readFileSync( archivo, 'utf-8' );
    
    return JSON.parse( dataJSON );

}



module.exports = {
    guardarDB,
    leerDB
};


