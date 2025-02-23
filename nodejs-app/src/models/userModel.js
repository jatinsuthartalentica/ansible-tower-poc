const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
