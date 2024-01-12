import Post from "./Post.js";
import Image from "./Image.js";

Post.hasMany(Image, {
  foreignKey: 'post_id',
  sourceKey: 'id_post'
});


Image.belongsTo(Post, {
  foreignKey: 'post_id',
  targetKey: 'id_post'
});
