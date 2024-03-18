const db = require('../../database/db');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const { ERROR_500, PRODUCTION } = require('../../constants');
const { DOMAIN_AVAILABLE, REGISTER_USER } = require('../../database/queries/userQueries');
const generateRandomCode = require('../../utils/generateRandomCode');

const register = async (req, res) => {

    try {
        // Cortafuegos para impedir el registro de nuevos usuarios
        // return res.json({ message: 'La creación de nuevas cuentas está desactivada temporalmente. '});

        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ message: result.array()[0].msg });

        // id de la universidad vinculada al correo. Se ha comprobado en el middle que el dominio es válido
        const { id: universityId } = await db.one(DOMAIN_AVAILABLE, [req.body.email, req.body.email]);
        
        // Código que el usuario necesitará para verificar el correo
        const verificationCode = generateRandomCode(30);
       
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        const userId = await db.one(REGISTER_USER, [req.body.name, req.body.email, universityId, encryptedPassword, verificationCode]);

        if (process.env.NODE_ENV === PRODUCTION) {
            // Envio del correo para la validacion del email
            let transporter = nodemailer.createTransport({
                host: "smtp.eu.mailgun.org",
                secure: true,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.PASSWORD_EMAIL 
                }
            });
    
            await transporter.sendMail({
                from: '"Soporte foruni" <soporte@foruni.es>', 
                to: email, 
                subject: "Validación de cuenta", 
                text: `Bienvenid@ a foruni`,
                html: // Usando table podemos centrar todo el contenido
                    `
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">

                            <h3 style="text-align:center;">Gracias por registrarte</h3> 
                                        
                            <p style="text-align:center;">Verifica tu dirección de email para acceder a FORUNI</p>
                            
                            <a 
                                style="text-align:center; padding:5px 10px; background-color:#1585E0; color:white; font-size:21px; text-decoration:none; border-radius:3px;" 
                                href="https://foruni.es/verificacion/email/id/${userId}/codigo/${verificationCode}"
                            >
                                Verificar email
                            </a>
                            
                            <hr style="margin-top:20px;">
                            
                            <p style="text-align:center; font-size:14px;">¿No te has registrado en FORUNI?</p>
    
                            <p style="text-align:center; font-size:14px;">Ponte en contacto con nuestro equipo de soporte a través de soporte@foruni.es</p>

                        </td>
                    </tr>
                    </table>
                    `
                });

        }

        res.json({ message: 'Tu cuenta ha sido creada correctamente.' });

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = register;