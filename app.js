import express from 'express';
import userRouter from './router/userRouter.js';
import morgan from 'morgan';
import hbs from 'hbs';
import path from 'path';
import * as url from 'url';
import cors from 'cors';
const app = express();

app.use(express.json()); 
//Si no encuentra la carpeta de views le agrego el __dirname
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

console.log(__dirname);

//Middelware
//app.use(morgan());
//app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//1. Configuración de Handlebars
app.set('view engine', 'hbs');
//2. Configuración e ubicación de las vistas
app.set('views', path.join('views'));
//3. Configuración de los archivos parciales
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render('index');
});

//sólo puede existir un export default por archivo
export default app;