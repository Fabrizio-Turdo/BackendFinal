const express = require('express');
const app = express();
const routesProducts = require('../routesProducts');

//Middlewares.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api/productos', routesProducts);

//Iniciando el server.
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`App escuchando en el puerto: ${PORT}`);
});
server.on('err', err=> console.log(`Codigo de error en el servidor: ${err}`));