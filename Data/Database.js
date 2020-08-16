
const Sqlz = require('sequelize');

const Database = new Sqlz('jwtapp', 'postgres', '@Senha100%VD', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = Database;