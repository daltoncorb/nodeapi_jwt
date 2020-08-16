const Sqlz = require('sequelize');
const DataB = require('../Data/Database')

const User = DataB.define('Users', {
    username:{
        type: Sqlz.STRING,
        allowNull: false
    },
    email: {
        type: Sqlz.STRING,
        allowNull: false
    },
    password:{
        type: Sqlz.STRING,
        allowNull: false
    },
    role: {
        type: Sqlz.STRING,
        allowNull: false
    }
})

module.exports = User ;