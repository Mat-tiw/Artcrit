import Post from "./Post.js";
import Image from "./Image.js";
import User from './User.js'
import Comment from "./Comment.js";


User.hasMany(Post,{
  foreignKey:'user_id',
  sourceKey:'id_user'
})
User.hasMany(Image,{
  foreignKey:'user_id',
  sourceKey:'id_user'
})
User.hasMany(Comment,{
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
Post.hasMany(Comment,{
  foreignKey: 'post_id',
  sourceKey: 'id_post'
})


Image.belongsTo(Post, {
  foreignKey: 'post_id',
  targetKey: 'id_post'
});
Image.belongsTo(User,{
  foreignKey:'user_id',
  targetKey: 'id_user'
})


Comment.belongsTo(Post,{
  foreignKey: 'post_id',
  targetKey: 'id_post'
})
Comment.belongsTo(User,{
  foreignKey:'user_id',
  targetKey: 'id_user'
})