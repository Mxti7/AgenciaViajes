// Se importa el modelo de los viajes de la BD
import {Viaje} from '../models/Viaje.js';

// Se importa el modelo de testimoniales de la BD
import { Testimonial } from '../models/Testimoniales.js';


// Pagina Inicio
const paginaInicial = async (req, res) =>{

    // Se consultan 3 viajes del modelo viaje:

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('Inicio', 
    {
        pagina: 'Inicio',
        clase:'home',
        viajes: resultado[0],
        testimoniales: resultado[1]
    });
    } catch (error) {
        console.log(error)
    }
}


// Pagina Nosotros
const paginaNosotros = (req, res) =>{
    res.render('Nosotros',{
        pagina: 'Nosotros'
    });
}


// Pagina Viajes
const  paginaViajes = async (req, res) =>{
    // Consultar BD:
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('Viajes',{
        pagina: 'Próximos Viajes',
        viajes,
    });
}


// Pagina Testimonios
const paginaTestimonios = async (req, res) =>{
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('Testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });

    } catch (error) {
        console.log(error)
    }
    
}

// Pagina Más Información de cada viaje visitado:
const paginaInformacionViaje = async (req, res) => {

    //console.log ('Mas información de', req.params.viaje);

    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where: {slug}});

        res.render('infoviaje', {
            pagina: 'Información Viaje',
            viaje
        })

    } catch (error) {
        console.log('Error al consultar la BD')
    }
}

export {
    paginaInicial,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaInformacionViaje
}
