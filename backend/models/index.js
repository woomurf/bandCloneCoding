'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const { database, username, password, host, port, dialect } = config;
const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  port,
  dialect,
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  logging: false,
});

// read model files & define.
fs
  .readdirSync(__dirname)
  .filter(file => { 
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// defined associates.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
