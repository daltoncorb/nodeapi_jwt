const Exp = require('express');
const Prd = require('../Models/Produtos');
const Middle = require('../Middleware/TheMiddle')

const Router = Exp.Router();

Router.get('/products', Middle, (r, w) =>{
    Prd.findAll().then(result =>{
        if (result != undefined)
        w.json(result);
    })
})

Router.get('/products/:id', (r, w)=>{
    var id = r.params.id;

    if(id == undefined)
    return w.statusCode(400);

    if (isNaN(id))
    return w.statusCode(404);

    Prd.findByPk(id).then( respond =>{
        
        if (respond == undefined)
            return w.statusCode(404)
        else
            w.send(respond);

    }).catch(error =>{
        return w.statusCode(404)
    })
   
})

Router.post('/products',(r, w) =>{
    var title = r.body.title;
    var price = r.body.price;

    if( title != undefined && price != undefined)
        Prd.create({
            title: title,
            price: price
        }).then(respond =>{
            w.sendStatus(200);
        }).catch(error =>{
            w.sendStatus(400);
        })
})

Router.put('/products/:id',(r, w)=>{
    var title = r.body.title;
    var price = r.body.price;
    var id = r.body.id;
    var aId = r.params.id;

    if (id != aId )
    return w.sendStatus(400) 

    Prd.update(
        {
            title: title,
             price: price
            },
        {
            where:{
            "id": id
        }
        
    }).then(respond => w.sendStatus(200))
    .catch(error => w.sendStatus(400));
})

Router.delete('/products/:id',(r, w) => {

    var id = r.params.id;

    if (isNaN(id))
    return w.sendStatus(400)

    Prd.destroy({where:{id: parseInt(id)}}).then(responde => {
        return w.sendStatus(200)
    }).catch(error => { return w.sendStatus(404)});
})

module.exports = Router;