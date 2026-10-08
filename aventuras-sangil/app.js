const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
    next();
});

const actividades = [
    { id: 1, nombre: 'Rafting en el río Fonce', tipo: 'agua', precio: 60000 },
    { id: 2, nombre: 'Parapente en el cañón', tipo: 'aire', precio: 180000 },
    { id: 3, nombre: 'Caminata Camino Real a Barichara', tipo: 'tierra', precio: 0 },
    { id: 4, nombre: 'Torrentismo en cascada', tipo: 'agua', precio: 70000 }
];

app.get('/', (req, res) => {
    res.send('API Aventuras San Gil funcionando');
});

app.get('/actividades', (req, res) => {
console.log('query:', req.query);
const { tipo } = req.query;
if (!tipo) {
return res.json(actividades);
}
const filtradas = actividades.filter((a) => a.tipo === tipo);
res.json(filtradas);
});

app.get('/actividades/gratis', (req, res) => {
    const gratuitas = actividades.filter(
        (actividad) => actividad.precio === 0
    );

    res.json(gratuitas);
});

app.get('/actividades/:id', (req, res) => {
    const id = Number(req.params.id);

    const actividad = actividades.find(
        (actividad) => actividad.id === id
    );

    if (!actividad) {
        return res.status(404).json({
            mensaje: `No existe la actividad con id ${req.params.id}`
        });
    }

    res.json(actividad);
});

app.post('/actividades', (req, res) => {
    const { nombre, tipo, precio } = req.body;

    if (!nombre || !tipo) {
        return res.status(400).json({
            mensaje: 'El nombre y el tipo son obligatorios'
        });
    }

    if (typeof precio !== 'number' || precio < 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un número mayor o igual a cero'
        });
    }

    const nueva = {
        id: actividades.length + 1,
        nombre,
        tipo,
        precio
    };

    actividades.push(nueva);

    res.status(201).json(nueva);
});

app.get('/estado', (req, res) => {
    res.json({
        servidor: 'ok',
        hora: new Date(),
        totalActividades: actividades.length
    });
});

app.use((req, res) => {
    res.status(404).json({
        mensaje: `No existe la ruta ${req.method} ${req.url}`
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});