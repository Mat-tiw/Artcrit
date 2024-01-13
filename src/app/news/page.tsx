"use client"
import axios from "axios"
import { Posts } from "../components/ui/posts"
import { useEffect,useState } from "react"
interface Image {
  id_image: number;
  image_path: string;
}

interface Post {
  id_post: number;
  post_title: string;
  post_badge: string;
  created_at: string;
  user_id: number;
  ac_images: Image[];
}

// In your News component, you can use these types/interfaces
const News = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/post");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Posts
          key={post.id_post}
          title={post.post_title}
          badge={post.post_badge}
          userName={String(post.user_id)} // Convert user_id to string or use the actual username property if available
          date={post.created_at}
          images={post.ac_images}
        />
      ))}
    </>
  );
};

export default News;
