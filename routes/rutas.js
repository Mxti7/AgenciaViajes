import express from 'express';

// Se importan las vistas del controlador
import { paginaInicial, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimonios, 
    paginaInformacionViaje } 
from '../controllers/control.js';

import {
    enviarTestimonio
}

from '../controllers/testimonialController.js';

// Router:
const router = express.Router();

// A continuación se definen las rutas de las vistas que tendra el sitio web.

// INICIO:
router.get('/', paginaInicial);

// NOSOTROS:
router.get('/nosotros', paginaNosotros );

// VIAJES:
router.get('/viajes', paginaViajes);

// SLUG VIAJES
router.get('/viajes/:slug', paginaInformacionViaje);

// TESTIMONIOS:
router.get('/testimoniales', paginaTestimonios);
router.post('/testimoniales', enviarTestimonio);


// Se exporta el router para importarlo en la app (archivo principal)
export default router;