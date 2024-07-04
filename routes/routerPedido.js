const {Router} = require('express');
const router = Router();
const conexion = require('../config/db')

router.get('/', (req, res)=>{
    const query = `SELECT * FROM pedido`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaPedidos = resultado;
            res.json(objeto);
        }
    });
});

router.post('/insertarpedidoretornarid', (req, res) => {
    const id_usuario = req.query.id_usuario;
    const id_metodo_pago = req.query.id_metodo_pago;
    const estado = req.query.estado;
    const direccion = req.query.direccion;

    const queryCall = `CALL InsertarPedidoRetornarID(?, ?, ?, ?, @id_pedido)`;
    const querySelect = `SELECT @id_pedido AS id_pedido`;

    conexion.query(queryCall, [id_usuario, id_metodo_pago, estado, direccion], (error) => {
        if (error) {
            console.error(error.message);
            return res.json({ id: 0, mensaje: 'Error al insertar el pedido' });
        }

        conexion.query(querySelect, (error, results) => {
            if (error) {
                console.error(error.message);
                return res.json({ id: 0, mensaje: 'Error al obtener el ID del pedido' });
            }

            const idPedido = results[0].id_pedido;
            res.json({ id: idPedido, mensaje: 'Se insertó correctamente' });
        });
    });
});

router.get('/obtenerpedidosusuario', (req, res)=>{
    const idUsuario = req.query.id_usuario;
    console.log("Llama al método obtenerpedidosusuarios")
    const query = `SELECT * FROM pedido WHERE id_usuario = ${idUsuario};`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaPedidos = resultado;
            res.json(objeto);
        }
    });
});

module.exports = router;