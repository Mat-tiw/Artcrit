import Post from "./Post.js";
import Image from "./Image.js";
import User from './User.js'

User.hasMany(Post,{
  foreignKey:'user_id',
  sourceKey:'id_user'
})

Post.belongsTo(User,{
  foreignKey:'user_id',
  targetKey:'id_user'
})

Post.hasMany(Image, {
  foreignKey: 'post_id',
  sourceKey: 'id_post'
});


Image.belongsTo(Post, {
  foreignKey: 'post_id',
  targetKey: 'id_post'
});
