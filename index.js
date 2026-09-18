
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./src/routes/dashboard.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'BFF Operativo', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`Servicio BFF inicializado en el puerto ${PORT}`);
    console.log(`Pruebalo en: http://localhost:${PORT}/api/dashboard/1`);
});