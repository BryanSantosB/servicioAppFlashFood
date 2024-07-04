const express = require ('express');
const bodyParser = require('body-parser');
const app = express();

const routerCategorias = require('./routes/routerCategoria');
const routerProductos = require('./routes/routerProducto');
const routerPedido = require('./routes/routerPedido');
const routerDetallePedido = require('./routes/routerDetallePedido');
const routerMetodoPago = require('./routes/routerMetodoPago');
const routerRoles = require('./routes/routerRoles');
const routerUsuarios = require('./routes/routerUsuarios')

app.use(bodyParser.json());
app.use('/categorias', routerCategorias);
app.use('/productos', routerProductos);
app.use('/pedidos', routerPedido);
app.use('/detallepedidos', routerDetallePedido);
app.use('/metodopagos', routerMetodoPago);
app.use('/roles', routerRoles);
app.use('/usuarios', routerUsuarios);

const PUERTO = 3000;

app.listen(PUERTO, ()=>{
    console.log(`El servidor se está ejecutando en el puerto ${PUERTO}...`)
});


