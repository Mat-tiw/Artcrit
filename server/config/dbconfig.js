import { Sequelize } from 'sequelize';
import db from './db.js';

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
});

export default sequelize;
