const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// Configurar el motor de vistas con express-handlebars
app.engine('hbs', engine({
    extname: 'hbs',                                      // Extensión de archivos
    defaultLayout: 'layout',                             // Layout por defecto (sin .hbs)
    layoutsDir: path.join(__dirname, 'views/layouts'),   // Directorio de layouts
    partialsDir: path.join(__dirname, 'views/partials'), // Directorio de parciales
    helpers: {
        // Helper personalizado para el año actual
        getCurrentYear: function() {
            return new Date().getFullYear();
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Servir contenido estático desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Datos dinámicos: Arreglo de proyectos
const projects = [
    { title: 'Proyecto 1', description: 'Descripción breve del proyecto 1.', details: 'Detalles completos: Tecnologías usadas, desafíos, etc.' },
    { title: 'Proyecto 2', description: 'Descripción breve del proyecto 2.', details: 'Detalles completos: Tecnologías usadas, desafíos, etc.' },
    { title: 'Proyecto 3', description: 'Descripción breve del proyecto 3.', details: 'Detalles completos: Tecnologías usadas, desafíos, etc.' }
];

// Ruta principal: Home
app.get('/', (req, res) => {
    res.render('home', {
        name: 'Tu Nombre',
        description: 'Una breve descripción personal.',
        projects: projects
    });
});

// Ruta: About
app.get('/about', (req, res) => {
    res.render('about', {
        history: 'Mi historia personal: Nacimiento, educación, intereses, etc.'
    });
});

// Ruta: Projects
app.get('/projects', (req, res) => {
    res.render('projects', {
        projects: projects
    });
});

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).render('404', { 
        url: req.originalUrl,
        layout: false // Opcional: puedes usar un layout diferente o ninguno para errores
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});