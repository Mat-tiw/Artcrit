import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
const Vote = sequelize.define(
  "ac_vote",
  {
    id_vote: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vote_type: {
      type: DataTypes.ENUM,
      values: ["up", "down"],
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
    modelName: "Vote",
    tableName: "ac_vote",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    id:"id_vote"
  }
);
export default Vote