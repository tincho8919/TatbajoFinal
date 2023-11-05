import { Router } from 'express';
import { check } from 'express-validator'
import {deleteCustomer,eliminarProducto, userLogin, userRegister, userCreate, userFormLogin, formProducto, createProducto, ventasProductos,EspacioEjemplo0, EspacioEjemplo} from '../controller/userController.js';

const router = Router();

router.get('/login', userFormLogin);

router.get('/registro', userRegister);

router.get('/productos', formProducto);

router.get('/ventas', ventasProductos);

router.get('/computadoras', EspacioEjemplo0);

router.get('/articulos', EspacioEjemplo);

router.post('/productos', createProducto);

router.delete('/eliminar-producto/:productoId', eliminarProducto);


router.get("/delete/:id", deleteCustomer);

router.post('/create', 
    [
        check('nombre').isLength({ min: 4 }),
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    userCreate
);

router.post('/login', 
    [
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    userLogin
);

//crear un formulario con nombre, email y password
//router.get('/user', userRegister);
export default router;