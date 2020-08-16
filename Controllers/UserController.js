const Exp = require('express');
const Usr = require('../Models/User');
const Tkn = require('jsonwebtoken');
const Middle = require('../Middleware/TheMiddle')

const keyValueEntryPoint = "Dalton06011971Luciane28011969Maggie";

const Router = Exp.Router();

Router.get('/login', (r, w) => {
    var e = r.body.email;
    var p = r.body.password;

    if (e == undefined || p == undefined) {
        return w.status(400).send("Uops! Usuários ou senha inválidos !");
    }

    if (e.trim() == '' || p.trim() == '') {
        return w.status(400).send("Usuário ou senha foram enviandos sem informações!")
    }

    Usr.findOne({
        where: {
            email: e.trim(),
            password: p.trim()
        }
    }).then(respond => {
        if (respond == undefined)
            w.status(401).send('Usuário ou senha não registrados no Sistema!')
        else {
            var n = keyValueEntryPoint;

            var tk = Tkn.sign({
                username: respond.username,
                userId: respond.id,
                role: respond.role,
                email: respond.email
            }, keyValueEntryPoint, { expiresIn: "300s" }, (error, jwt) => {
                if (error)
                    return w.status(400).send('Problemas ao gerar o token')

                return w.status(200).send({ jwt })
            })

        }
    }).catch(error => w.status(404).send('Usuário ou senhas não encontrados no Sistema !' + error))
})

Router.get('/user', Middle, (r, w) => {
    Usr.findAll().then(respond => {
        //retorna os dados de usuario vindo do middleware
        //console.log( r.userId + ' ' + r.NomeUsuario + ' ' + r.email + ' ' + r.role)
        if (respond != undefined)
            w.status(200).send(respond)
        else
            w.status(404).send('Não foram localizados usuários cadastrados no sistema!')
    }).catch(error =>{
        w.status(400).send('Um problema maior foi encontrado ! ')
    })
})


Router.post('/user', (r, w) => {
    var u = r.body.username;
    var e = r.body.email;
    var p = r.body.password;
    var r = r.body.role;

    if (e == undefined || p == undefined || u == undefined) {
        return w.status(400).send("Uops! Nome de Usuário, email ou senha não foram passados !");
    }

    if (e.trim() == '' || p.trim() == '' || u.trim() == '') {
        return w.status(400).send("Usuário, email ou senha foram enviandos sem informações!")
    }

    Usr.create({
        username: u, email: e, password: p, role: r
    }).then(respond => w.status(200).send('Dados de usuários registrados com sucesso!'))
        .catch(error => w.status(400).send('Houve um problema ao tentar registrar os dados do usuários ' + error));

})


module.exports = Router;
