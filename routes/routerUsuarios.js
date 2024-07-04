const {Router} = require('express');
const router = Router();
const conexion = require('../config/db')

router.get('/', (req, res)=>{
    const query = `SELECT * FROM usuario`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        var objeto = {};
        if(resultado.length >= 1){
            objeto.listaUsuarios = resultado;
            res.json(objeto);
        }
    });
});

router.get("/login", (req, res)=>{
    const correo = req.query.correo;
    const pass = req.query.pass;
    const query = `SELECT * FROM usuario WHERE '${correo}' = correo AND '${pass}' = pass`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message);
        let autenticado;
        if(resultado.length >= 1){
            res.json({autenticado: true, usuario: resultado[0]});
        }else{
            res.json({autenticado: false, usuario: null});
        }
    });
});

router.post("/registrar", (req, res)=>{
    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nacimiento: req.body.fecha_nacimiento,
        correo: req.body.correo,
        telefono: req.body.telefono,
        tipousuario: null,
        pass: req.body.pass,
        estado: 1
    };

    console.log(usuario);

    const query = "INSERT INTO usuario SET ?";
    conexion.query(query, usuario, (error)=> {
        if(error){
            return console.error(error.message)
        }
        res.json("Se registró con éxito.")
    });
});

module.exports = router;