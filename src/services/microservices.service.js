const axios = require('axios');

const { MS_CONTACTOS_URL, MS_TRANSFERENCIAS_URL, MS_USUARIOS_URL } = process.env;

const obtenerUsuario = async (userId) => {
    try {
        const respuesta = await axios.get(`${MS_USUARIOS_URL}/api/usuarios/${userId}`);
        return respuesta.data;
    } catch (error) {
        console.error(`Error al obtener usuario ${userId}:`, error.message);
        return null;
    }
};

const obtenerContactos = async (userId) => {
    try {
        const respuesta = await axios.get(`${MS_CONTACTOS_URL}/api/contactos/${userId}`);
        return respuesta.data;
    } catch (error) {
        console.error(`Error al obtener contactos de ${userId}:`, error.message);
        return []; 
    }
};

const obtenerTransferencias = async (userId) => {
    try {
        const respuesta = await axios.get(`${MS_TRANSFERENCIAS_URL}/api/transferencias/${userId}`);
        return respuesta.data;
    } catch (error) {
        console.error(`Error al obtener transferencias de ${userId}:`, error.message);
        return []; 
    }
};

module.exports = {
    obtenerUsuario,
    obtenerContactos,
    obtenerTransferencias
};