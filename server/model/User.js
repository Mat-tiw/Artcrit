import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/dbconfig.js";
const User = sequelize.define(
  "user",
  {
    iduser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    u_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_email: {
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
  },
  {
    Sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    id: "iduser",
  }
);
(async () => {
  await sequelize.sync();
})();
export default User;
