'use strict';
const storage = require("../storage/api");


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


module.exports = {
    getMaquinas
}