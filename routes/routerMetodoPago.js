const {Router} = require('express');
const router = Router();
const conexion = require('../config/db')

router.get('/', (req, res)=>{
    const query = `SELECT * FROM metodo_pago`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaMetodoPago = resultado;
            res.json(objeto);
        }
    });
});

router.get('/metodopagoporid', (req, res)=>{
    const id_metodo_pago = req.query.id_metodo_pago;
    const query = `SELECT * FROM metodo_pago WHERE id_metodo_pago = ${id_metodo_pago};`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        if(resultado.length >= 1){
            res.json(resultado[0]);
        }
    });
});

module.exports = router;