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

const getDashboardData = async (req, res) => {
    const { userId } = req.params;
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'falta el token' });
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
            usuario: { id: usuario.id, nombre: usuario.nombre },
            metricas: { totalContactos: contactos.length, totalTransferencias: transferencias.length },
            detalles: { contactos, ultimasTransferencias: transferencias.slice(0, 5) }
        };

        return res.json(responseBFF);
    } catch (error) {
        console.error('Error crítico en el dashboard:', error);
        return res.status(500).json({ error: 'El BFF se se cayó' });
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

module.exports = { login, getDashboardData, hacerTransferencia };