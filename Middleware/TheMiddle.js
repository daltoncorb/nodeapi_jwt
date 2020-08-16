const Jwt = require('jsonwebtoken');
const Keypass = require('../KeyValueData')
//const keyValueEntryPoint = "Dalton06011971Luciane28011969Maggie";

function MyMidlle(r, w, next) {
    const getToken = r.headers['authorization'];

    if (getToken == undefined)
        return w.status(401).send('Token inválido! Acesso não autorizado')
    else {
        //return w.status(200).send('Usuário autorizado')
        var getParts = getToken.split(' ');
        Jwt.verify(getParts[1], Keypass.keyValueEntryPoint, (error, token) => {
            if (error)
                return w.status(401).send('Usuário não autorizado, tente reconectar fazendo o login')
            else {
                //console.log(token)
                r.NomeUsuario = token.username
                r.userId = token.userId
                r.role = token.role
                r.email = token.email

                next();
            }
        })

    }
}

module.exports = MyMidlle;