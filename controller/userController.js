import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt';
import connection from '../database/conexion.js';
import nodemailer from 'nodemailer';


//sing in
const userLogin = (req, res) => {

    const { email, password } = req.body;

    console.log(`1. Los datos son: ${email}, ${password}`)

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        console.log(errores);
        return res.send(`<h1 style="color: red">Errores en los datos ingresados</h1>`)
    }


    let sql = `SELECT * FROM USUARIOS WHERE email = '${email}'`;

    //buscamos en la database al usuario 
    connection.query(sql, (error, result) => {

        if(result.length === 0){
            return res.send(`<h1 style="color: red">Usuario no encontrado</h1>`)
        }

        if(error) {
            console.log(error);
            return res.send(`<h1 style="color: red">Cayó nuestra database</h1>`)
            //throw error;
        }else{
            console.log(result[0].password);
            return res.json({
                mensaje: 'estás logueado',
                email,
                password
            })
        }
    });


}

const userFormLogin = (req, res) => {
    res.render('login')
}

const userRegister = (req, res) => {
    res.render('registro')
}

const formProducto = (req, res) => {
    res.render('productos')
}

const EspacioEjemplo0 = (req, res) => {
    res.render('computadoras')
}
const EspacioEjemplo = (req, res) => {
    res.render('articulos')
}

// sing up
const userCreate = (req, res) => {

    const { nombre, email, password } = req.body;

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        console.log(errores);
        return res.send(`<h1 style="color: red">Errores en los datos ingresados</h1>`)
    }

    console.log('=======================================================');
    
    //1. creamos una sal de encriptación
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);

    console.log('=======================================================');
    
    //2. Mezclamos la salt con el password del usuario
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    
    console.log('=======================================================');

    const data = {
        nombre: nombre,
        email: email,
        password: hash
    }

    //Creamos una función para envío de Mail desde nuestra cuenta de Gmail

    const envioMail = async () =>{

        //1. creamos un transportador - configuración
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure:true,
            auth: {
                user: process.env.USEREMAIL, //'bernalpas@gmail.com', //process.env.USEREMAIL,
                pass: process.env.PASSGMAIL //process.env.PASSEMAIL
            }
        });

        //2. Configuramos el email con el contenido
        let mail = await transporter.sendMail({
            from: process.env.USEREMAIL,
            to: email,
            subject: "Bienvenido a mi App",
            html: `
        <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; text-align: center;">
            <h1 style="color: #0077b6;">¡Bienvenido a mi App!</h1>
            <p style="font-size: 16px;">Gracias por registrarte, ${nombre}.</p>
            <p style="font-size: 16px;">A partir de este momento, te encuentras registrado para recibir toda la información sobre nuestras actividades.</p>
            <h2 style="font-size: 16px;">Felicidades!!!</h2>
            <p style="font-size: 16px;">"Te has registrado con los datos":</p>
            <p style="font-size: 16px;">Email de registro: <strong>${email}</strong></p>
            <p style="font-size: 16px;">Password de registro: <strong>${password}</strong></p>
        </div>
    `
        })
    }


    //3. Conexión a la database
    connection.query('INSERT INTO USUARIOS SET ?', {nombre: nombre, email: email, password: hash }, (error, result) => {
        if(error) {
            console.log(error);
            return res.send(`<h1 style="color: red">Error en la inserción</h1>`)
            //throw error;
        }else{
            
            //3. Enviamos el mail
            envioMail().catch(console.error);

            return res.render('index')
        }
    });
}


const createProducto = (req, res) => {

    const { nombre, imagen, precio } = req.body;

    console.log(`1. Los datos son: ${nombre}, ${imagen}, ${precio}`);

    const data = {
        nombre: nombre,
        imagen: imagen,
        precio: precio
    }

    try {
        connection.query('INSERT INTO PRODUCTOS SET ?', data, (result) => {
            //console.log(result);
            return res.render('index')
        });
    } catch (error) {
        console.log(error);
        return res.json({
            mensaje: 'Error en la inserción',
            error
        })
    }

}

const ventasProductos = (req, res) => {

    let sql = `SELECT * FROM PRODUCTOS`;

    //buscamos en la database al usuario 
    connection.query(sql, (error, result) => {

        if(result.length === 0){
            return res.json({
                mensaje: 'No hay productos'
            });
        }

        if(error) {
            console.log(error);
            return res.json({
                mensaje: 'Cayó nuestra database',
                error
            });
        }else{
            return res.render('ventas',{
                dato: result
            })
        }   
        

    });

}

const eliminarProducto = (req, res) => {
    const productoId = req.params.productoId; // Obtén el productoId de los parámetros de la URL

    // Realiza una consulta SQL para eliminar el producto de la base de datos utilizando el productoId
    const sql = 'DELETE FROM productos WHERE idProductos = ?';

    connection.query(sql, [productoId], (error, result) => {
        if (error) {
            console.error('Error al eliminar el producto', error);
            res.status(500).json({ mensaje: 'Error al eliminar el producto' });
        } else {
            if (result.affectedRows > 0) {
                // La consulta tuvo éxito y el producto se eliminó
                res.json({ mensaje: 'Producto eliminado con éxito' });
            } else {
                // No se encontró ningún producto con el productoId proporcionado
                res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
        }
    });
};

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    if (result.affectedRows === 1) {
        res.json({ message: "productos borrado" });
    }
    res.redirect("/");
};

export {
    userLogin,
    userRegister,
    userFormLogin, 
    userCreate,
    formProducto,
    createProducto,
    ventasProductos,
    EspacioEjemplo,
    EspacioEjemplo0,
    eliminarProducto
    
    
    
    
    
}