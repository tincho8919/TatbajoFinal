import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


//1. Creación de una conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.HOSTDATA,
    user: process.env.USERDATA,
    password: process.env.PASSDATA,
    port: process.env.PORTDATA,
    database: process.env.DATABASE
});

//2. Creación de una database utndata
// sólo podemos ejecutar una vez la creación de la database y tablas
connection.connect((err)=>{
    if(err) throw err;
    console.log(`Conexión a la Database ${ process.env.DATABASE } correcta!!`);
});

export default connection;