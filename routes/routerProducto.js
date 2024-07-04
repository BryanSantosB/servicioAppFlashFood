const {Router} = require('express');
const router = Router();
const conexion = require('../config/db')

router.get('/', (req, res)=>{
    const query = `SELECT * FROM producto`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaProductos = resultado;
            res.json(objeto);
        }
    });
});

router.get('/porcategoria', (req, res)=>{
    const id_categoria = req.query.id_categoria;
    const query = `SELECT * FROM producto WHERE id_categoria = ${id_categoria}`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        if(resultado.length >= 1){
            let objeto = {}
            objeto.listaProductosCategoria = resultado;
            res.json(objeto);
        }
    });
});

router.get('/productoporid', (req, res)=>{
    const id_producto = req.query.id_producto;
    const query = `SELECT * FROM producto WHERE id_producto = ${id_producto}`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        if(resultado.length >= 1){
            res.json(resultado[0]);
        }
    });
});

module.exports = router;