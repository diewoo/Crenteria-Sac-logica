const nodemailer=require('nodemailer');
const config=require('../config/config.json');
const mode = config.mode;
const mail = config[mode].mail;	
const smtp=mail.mail;
const pwd=mail.pwd;
const dominio=config[mode].link;
const Mailgen=require('mailgen');
let transporter=nodemailer.createTransport({
	service: "Gmail", // sets automatically host, port and connection security settings,
	auth:{
			user:"diegoalonso.renteria@gmail.com",
			pass:"webcamdelima123"
	}
});

function confirm(data,done){
	let mailGenerator=new Mailgen({
		theme:'salted',
		product:{
				name:'Crenteria S.A.C',
				link:'htpp://crenteria.com/',
				 copyright: '© 2017 Crenteria - Peru'
		}		
	});

	let email={
		body:{
			greeting:'Hola',
			signature:'Saludos',
			title:'GRACIAS POR CONTACTARNOS',
			name:data.name,
			intro:"hola",
			accion:{

			},
			outro:'Cualquier consulta o inconveniente comunicarse al siguiente correo:  '
		}		
	};

	let emailBody=mailGenerator.generate(email);
	let emailOptions={
		from: '"Crenteria S.A.C" <diegoalonso.renteria@gmail.com>',
        to: data.email,
        subject: "Contacto",
        text: 'text',
        html: emailBody			
	};
	 transporter.sendMail(emailOptions, function (error, info) {
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