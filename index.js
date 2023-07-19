// CREANDO Y CONFIGUARANDO EL SERVIDOR DE EXPRESS
// Se extrae express del paquete npm instalado y se agrega el módulo en el package.json para que lo soporte:
import express from 'express';
import router from './routes/rutas.js';
import db from './config/db.js';

// Conectar BD:
db.authenticate()
    .then( () => console.log('Se ha conectado la base de datos'))
    .catch( error => console.log(error));



// Variable que ejecuta express:
const app = express();

// Definición del puerto, si la variable de entorno con el puerto no existe, se asigna la 4000:
const port = process.env.PORT || 3000;

// Se habilita PUG
app.set('view engine', 'pug');

// Para obtener el año actual y el nombre de la página
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Travel Seek'

    // Para pasar al sgte middleware
    next();
});

// Se agrega body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Se define 'public'
app.use(express.static('public'));

// Se agrega el router desde la pagina principal:
app.use('/', router);


// Se arranca el servidor con un callback y muestra el mensaje:
app.listen(port, () => {
    console.log(`El Servidor esta corriendo en el puerto ${port}`)
});