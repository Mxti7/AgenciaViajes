import {Testimonial} from '../models/Testimoniales.js';

const enviarTestimonio = async (req, res) => {

    // Validación si los campos están vacíos:
    const { nombre, correo, mensaje } = req.body;

    // Se crea un arreglo para enviar los errores ahí y mostrarlos en la vista:
    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje : 'El Nombre está vacío!'});
    }


    // if(correo.trim() === ''){
    //     errores.push({mensaje : 'El Correo esta vacío!'});
    // }

    // Función que valida que el correo se escriba en el formato correcto:
    function validarFormatoCorreo(correo) {
        const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formatoValido.test(correo);
      }
      
      if (correo.trim() === '') {
        errores.push({ mensaje: 'El Correo está vacío!' });
      } else if (!validarFormatoCorreo(correo)) {
        errores.push({ mensaje: 'El Correo tiene un formato inválido!' });
      }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje esta vacío!'});
    }

    if(errores.length > 0){

        // Verificar si ya hay testimoniales:
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }
    // Si todo esta bien, se guarda en la BD:
    else{
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje,
            });

            res.redirect('/testimoniales');

        } catch (error) {
            console.log(error)
        }
    }


}

export {
    enviarTestimonio
}