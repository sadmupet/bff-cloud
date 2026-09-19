const microservices = require('../services/microservices.service');

const login = async (req, res) => {
    const { rut, password } = req.body;
    try {
        const data = await microservices.loginUsuario(rut, password);
        return res.json(data);
    } catch (error) {
        return res.status(401).json({ error: 'Credenciales inválidas, perrito' });
    }
};

const register = async (req, res) => {
    const datos = { ...req.body, permisos: "Usuario" };
    try {
        const data = await microservices.registrarUsuario(datos);
        return res.json(data);
    } catch (error) {
        console.error('Error real al registrar:', error.response?.data || error.message);
 
        const mensajeJava = error.response?.data?.message || '';
 
        let mensajeAmigable = 'Fallo al registrar. Revisa los datos.';
        if (mensajeJava.includes('GMAIL')) {
            mensajeAmigable = 'Ese correo ya está registrado.';
        } else if (mensajeJava.includes('RUT')) {
            mensajeAmigable = 'Ese RUT ya está registrado.';
        }
 
        const status = error.response?.status || 400;
        return res.status(status).json({ error: mensajeAmigable });
    }
};

const getDashboardData = async (req, res) => {
    const { userId } = req.params;
    const token = req.headers.authorization;

     if (!token) {
         return res.status(401).json({ error: 'Alto ahí loca, falta el token' });
     }

     try {
         const [usuario, contactos, transferencias] = await Promise.all([
             microservices.obtenerUsuario(userId, token),
             microservices.obtenerContactos(userId, token),
             microservices.obtenerTransferencias(userId, token)
         ]);

         if (!usuario) {
             return res.status(404).json({ error: 'Usuario no encontrado' });
         }

         const responseBFF = {
             usuario: { id: usuario.id, nombre: usuario.nombre, rut: usuario.rut },
             metricas: { totalContactos: contactos.length, totalTransferencias: transferencias.length },
             detalles: { contactos, ultimasTransferencias: transferencias.slice(0, 5) }
         };

         return res.json(responseBFF);
     } catch (error) {
         console.error('Error crítico en el dashboard:', error);
         return res.status(500).json({ error: 'El BFF se fue a la B' });
     }
};

const hacerTransferencia = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Sin token no hay plata' });

    try {
        const resultado = await microservices.realizarTransferencia(req.body, token);
        return res.json(resultado);
    } catch (error) {
        return res.status(500).json({ error: 'Falló la transferencia' });
    }
};

const buscarUsuario = async (req, res) => {
    const { rut, gmail } = req.query;
    const token = req.headers.authorization;
 
    if (!rut && !gmail) {
        return res.status(400).json({ error: 'Debes mandar un rut o un gmail' });
    }
 
    try {
        const usuario = await microservices.buscarUsuario({ rut, gmail }, token);
        return res.json(usuario);
    } catch (error) {
        return res.status(404).json({ error: 'No se encontró ningún usuario con ese dato' });
    }
};
 
const crearContacto = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Sin token no se puede agregar contactos' });
 
    try {
        const contacto = await microservices.crearContacto(req.body, token);
        return res.json(contacto);
    } catch (error) {
        return res.status(400).json({ error: 'No se pudo guardar el contacto' });
    }
};

module.exports = { login, getDashboardData, hacerTransferencia, register };