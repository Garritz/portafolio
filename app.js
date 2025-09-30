const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// Configurar el motor de vistas con express-handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        getCurrentYear: function() {
            return new Date().getFullYear();
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const projects = [
    { title: 'Casa GA', description: 'Ampliación y remodelación de una casa en San Antonio.', details: 'Modifiqué una antigua casa de un piso para construir un espacio acogedor en dos pisos, con una imponente doble altura en el área principal.' },
    { title: 'ASM2731', description: 'Remodelación de un departamento en Santiago.', details: 'Trabajo en progreso, en donde proyecté una envolvente aislada, ventanas de PVC con doble vidrio hermético, y un sistema de extracción/inyección de aire fresco con recuperación de calor.' },
{ title: 'S.O.S. Pets', description: 'Diseño UX/UI.', details: 'Junto a mi equipo disenamos la interfaz de una aplicación para adoptar mascotas, usando técnicas de investigación UX y herramientas de diseño UI como Figma.' }
];

app.get('/', (req, res) => {
    res.render('home', {
        name: 'Jorge Garrido',
        description: 'Diseñador UX/UI, Diseñador arquitectónico.',
        projects: projects
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre mí',
        history: 'Migrante del diseño físico al diseño digital, comenzando por el diseño UX/UI y continuando con el desarrollo Full Stack.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        projects: projects
    });
});

app.use((req, res, next) => {
    res.status(404).render('404', { 
        url: req.originalUrl,
        layout: false
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});