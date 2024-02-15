import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

const Comment = sequelize.define("ac_comment", {
  id_comment: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_content: {
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
  vote_points:{
    type: DataTypes.INTEGER,
  }
},{
    Sequelize,
    modelName:"Comment",
    tableName:"ac_comment",
    timestamps:true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    id: "id_comment",
});
export default Comment
