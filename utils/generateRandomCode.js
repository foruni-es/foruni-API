const generateRandomCode = (length) => {

    const values ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let code = "";

    // math.random() devuelve un numero entre 0 y 1
    // math.floor devuelve el entero redondeado mas bajo
    // charAt extrae un caracter de una cadena a partir de una posicion indicada
    for (let i = 0; i < length; i++) code += values.charAt(Math.floor(Math.random() * values.length));

    return code;
}

module.exports = generateRandomCode;