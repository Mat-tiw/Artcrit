import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

const Image = sequelize.define(
  "ac_image",
  {
    id_image: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_email: {
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
    modelName: "Image",
    tableName: "ac_image",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    id: "id_image",
  }
);
export default Image;