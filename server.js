//1. recordar la extensión de los archivos para import en ES6
//2. Podemos cambiar el nombre a la hora de importar con el export default app;
//import miapp from './app.js'
import app from './app.js'
import dotev from 'dotenv';
//dotev.config(path: {'./config/.env'});
dotev.config();

const PORT = process.env.PORT || 8080;

//nos conectamos a la database
//import './database/conexion.js';

//levantamos el servidor 
//const server = miapp.listen(PORT, () => { 
const server = app.listen(PORT, () => { 
    console.log(`Servidor run in Port http://localhost:${PORT}`)
});

server.on('error', (err) => { 
    console.log(`Error en servidor ${err}`)
});




