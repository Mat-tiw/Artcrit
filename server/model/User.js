import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
const User = sequelize.define(
  "ac_user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_bio:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_points:{
      type:DataTypes.INTEGER
    }
  },
  {
    Sequelize,
    modelName: "User",
    tableName: "ac_user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    id: "id_user",
  }
);

export default User;
