import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import User from "./User.js";
import Image from "./Image.js";
const Post = sequelize.define("ac_post", {
  id_post: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  post_badge: {
    type: DataTypes.STRING,
    allowNull: true,
  },created_at: {
    type: DataTypes.DATE,
    allowNull: true,
},
updated_at: {
  type: DataTypes.DATE,
  allowNull: true,
},
},{
    Sequelize,
    modelName: "Post",
    tableName: "ac_post",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    id: "id_post",
});
  Post.belongsTo(User,{
    foreignKey:'user_id',
    targetKey:'id_user'
  })
export default Post;
