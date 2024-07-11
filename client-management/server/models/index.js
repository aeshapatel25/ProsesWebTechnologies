const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Client = require('./client')(sequelize, Sequelize);
db.Customer = require('./customer')(sequelize, Sequelize);

module.exports = db;
