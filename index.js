const Exp = require('express');
const BParser = require('body-parser');
const Cors = require('cors');
const Db = require('./Data/Database');

const api = Exp();
api.use(Cors());

api.use(BParser.urlencoded({ extended: false }));
api.use(BParser.json());

const Prod = require('./Models/Produtos');
const Usr = require('./Models/User');

const ProductsCtrl = require('./Controllers/ProductController')
api.use('/',ProductsCtrl);

const UserCtrl = require('./Controllers/UserController');
api.use('/', UserCtrl);


// var DB = {
//     Produtos: [
//         { id: 1, title: "Coca-Cola", price: 2.50 },
//         { id: 2, title: "Sonho de Valsa", price: 1.20 },
//         { id: 3, title: "Pastel de Banana", price: 4.80 },
//         { id: 4, title: "Café Preto Pequeno", price: 2.45 }
//     ]
// }

// api.get("/products", (r, w) => {
//     w.json(DB.Produtos);
// })

// api.get("/products/:id", (r, w) => {
//     let p = r.params.id;
//     if (isNaN(p))
//         w.sendStatus(400);
//     else {

//         let cid = parseInt(p);
//         let prodd = DB.Produtos.find(p => p.id == cid);

//         if (prodd == undefined)
//             w.sendStatus(404);
//         else {
//             w.json(prodd);
//             w.sendStatus(200);
//         }
//     }
// })

// api.post("/products", (r, w) => {
//     let idr = r.body.id;
//     let titler = r.body.title;
//     let pricer = r.body.price;
//     let pr = {
//         id: parseInt(idr),
//         title: titler,
//         price: Number(pricer)
//     }

//     DB.Produtos.push(pr);
//     w.sendStatus(200);
// })

// api.delete("/products/:id", (r, w) => {
//     let vId = parseInt(r.params.id);

//     if (isNaN(vId))
//         w.sendStatus(404);
//     else{

//         let p = DB.Produtos.findIndex(g => g.id == vId);
//         //console.log(p)

//         if (p <= -1)
//         w.sendStatus(404)
//         else {
//             DB.Produtos.splice(p, 1);
//             w.sendStatus(200);
//         }
//     }
// })

// api.put("/products/:id", (r, w)=>{
//     let vId = parseInt(r.params.id);
//     var {id, title, price } = r.body

//     if (isNaN(vId))
//     w.sendStatus(400)
//     else{
//         if (vId != id)
//         w.sendStatus(400)
//         else {
            
//             DB.Produtos.forEach(u =>{
//                 if (u.id == vId)
//                 {
//                     u.title = title
//                     u.price = price
//                     w.sendStatus(200)
//                 }
//             })

//         }

//     }
// })

Db
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

api.listen(4200, () => {
    console.log("rodando !")
})