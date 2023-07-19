import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Testimonial = db.define('usuarios', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    contraseña: {
        type: Sequelize.STRING
    },
    
});