const {Router} = require('express');
const router = Router();
const conexion = require('../config/db')

router.get('/', (req, res)=>{
    const query = `SELECT * FROM detalle_pedido`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaDetallePedido = resultado;
            res.json(objeto);
        }
    });
});

router.post('/insertardetallepedido', (req, res)=>{
    const detallePedido = {
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad
    }
    const query = `INSERT INTO detalle_pedido SET ?`;
    conexion.query(query, detallePedido, (error)=> {
        if(error){
            return console.error(error.message)
        }
        res.json("Se registró con éxito.")
    });
});

router.get('/detallepedidoporpedido', (req, res)=>{
    const id_pedido = req.query.id_pedido;
    const query = `SELECT * FROM detalle_pedido WHERE id_pedido = ${id_pedido};`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaDetallePedido = resultado;
            res.json(objeto);
        }
    });
});

module.exports = router;