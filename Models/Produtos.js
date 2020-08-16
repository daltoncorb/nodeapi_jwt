const Sqlz = require('sequelize');
const DataB = require('../Data/Database');

const Products = DataB.define('Products',{
    title:{
        type: Sqlz.STRING,
        allowNull: false
    },
    price:{
        type: Sqlz.DECIMAL,
        allowNull: false
    }
});

//DataB.sync(Products);
module.exports = Products;