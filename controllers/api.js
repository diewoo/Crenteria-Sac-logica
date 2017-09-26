'use strict';
const storage = require("../storage/api");
const sendMail = require("../suport/sendemail");

function getMaquinas(req, res) {
    var tipo = req.query.tipo;
    storage.getMaquinas(tipo, (err, docs) => {
        if (err) {
            res.status(500).send({
                msg: "Error bd"
            });
            return;
        }
        if (!docs) {
            res.send({
                cod: 0,
                msg: "No hay maquinas"
            });
        }
        res.send({
            cod: 1,
            data: docs
        });
    });
}

function sendChange(req, res) {
    var email = req.body.correo;
    var name = req.body.nombres;
    var lastname = req.body.apellidos;
    var empresa = req.body.empresa;
    var cargo = req.body.cargo;
    var correo = req.body.correo;
    var telefono = req.body.telefono;
    var pais = req.body.pais;
    var ruc = req.body.ruc;
    var mensaje = req.body.mensaje;
    var user = {
        email: email,
        name: name,
        lastname: lastname,
        empresa: empresa,
        cargo: cargo,
        correo: correo,
        telefono: telefono,
        pais: pais,
        ruc: ruc,
        mensaje: mensaje
    }

    // user.name="Sr(a)"
    sendMail.confirm(user, (err, data) => {
        console.log(data);
        res.status(200).jsonp(data);
    })

};


module.exports = {
    getMaquinas,
    sendChange
}