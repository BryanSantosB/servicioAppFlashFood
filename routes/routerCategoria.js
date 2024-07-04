const {Router} = require('express');
const router = Router();
const conexion = require('../config/db')

router.get('/', (req, res)=>{
    const query = `SELECT * FROM categoria WHERE status = 1`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaCategorias = resultado;
            res.json(objeto);
        }
    });
});

module.exports = router;