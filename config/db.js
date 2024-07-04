const mysql = require('mysql');

const conexion = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'misteruser',
        database:'calidadflashfoodv1'
    }
);

conexion.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log("Conexión a la base de datos fue exitosa");
});

module.exports = conexion;