const axios = require('axios');

const { MS_CONTACTOS_URL, MS_TRANSFERENCIAS_URL, MS_USUARIOS_URL } = process.env;

const getAuthHeaders = (token) => ({
    headers: { Authorization: token }
});

const loginUsuario = async (rut, password) => {
    try {
        const respuesta = await axios.post(`${MS_USUARIOS_URL}/auth/login`, { rut, password });
        return respuesta.data;
    } catch (error) {
        console.error('Error en el login:', error.message);
        throw error;
    }
};

const obtenerUsuario = async (userId, token) => {
    try {
        const respuesta = await axios.get(`${MS_USUARIOS_URL}/api/usuarios/${userId}`, getAuthHeaders(token));
        return respuesta.data;
    } catch (error) {
        console.error(`Error al obtener usuario ${userId}:`, error.message);
        return null;
    }
};

const obtenerContactos = async (userId, token) => {
    try {
        const respuesta = await axios.get(`${MS_CONTACTOS_URL}/api/contactos/usuario/${userId}`, getAuthHeaders(token));
        return respuesta.data;
    } catch (error) {
        console.error(`Error al obtener contactos de ${userId}:`, error.message);
        return []; 
    }
};

const obtenerTransferencias = async (userId, token) => {
    try {
        const respuesta = await axios.get(`${MS_TRANSFERENCIAS_URL}/api/transferencias/${userId}`, getAuthHeaders(token));
        return respuesta.data;
    } catch (error) {
        console.error(`Error al obtener transferencias de ${userId}:`, error.message);
        return []; 
    }
};

const realizarTransferencia = async (datosTransferencia, token) => {
    try {
        const respuesta = await axios.post(`${MS_TRANSFERENCIAS_URL}/api/transferencias`, datosTransferencia, getAuthHeaders(token));
        return respuesta.data;
    } catch (error) {
        console.error('Error al realizar transferencia:', error.message);
        throw error;
    }
};

module.exports = {
    loginUsuario,
    obtenerUsuario,
    obtenerContactos,
    obtenerTransferencias,
    realizarTransferencia
};