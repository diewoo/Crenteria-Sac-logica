const nodemailer = require('nodemailer');
const config = require('../config/config.json');
const mode = config.mode;
const mail = config[mode].mail;
const smtp = mail.mail;
const pwd = mail.pwd;
const dominio = config[mode].link;
const Mailgen = require('mailgen');
let transporter = nodemailer.createTransport({
    service: "Gmail", // sets automatically host, port and connection security settings,
    auth: {
        user: "diegoalonso.renteria@gmail.com",
        pass: "webcamdelima123"
    }
});

function confirm(data, done) {
    let mailGenerator = new Mailgen({
        theme: 'salted',
        product: {
            name: 'Crenteria S.A.C',
            link: 'htpp://crenteria.com/',
            copyright: '© 2017 Crenteria - Peru'
        }
    });

    let email = {
        body: {
            greeting: 'Contacto',
            signature: 'Contacto por la web',
            title: 'ALGUIEN TE QUIERE CONTACTAR',
            name: data.name,
            apellido = data.apellido,
            empresa = data.empresa,
            cargo = data.cargo,
            correo = data.correo,
            telefono = data.telefono,
            pais = data.pais,
            ruc = data.pais,
            mensaje = data.mensaje,

            intro: "Alguien",
            accion: {

            }
        }
    };

    let emailBody = mailGenerator.generate(email);
    let emailOptions = {
        from: '"Crenteria S.A.C" <diegoalonso.renteria@gmail.com>',
        to: 'shikichaos@gmail.com',
        subject: "Contacto",
        text: 'text',
        html: emailBody
    };
    transporter.sendMail(emailOptions, function(error, info) {
        if (error) {
            console.log(error);
            done(error);
        } else {
            console.log('Message sent: ' + info.response);
            done(null, {
                cod: 1,
                msg: "Mensaje enviado correctamente"
            });
        }
    });


}
module.exports = {
    confirm
}