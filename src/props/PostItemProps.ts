import { User } from "firebase/auth";
import Post from "../models/Post";

interface PostItemProps {
  item: Post & {
    username: string;
    userPhoto: string;
  };

  sharePost: (title: string, content: string) => void;
  onLikePress: (postId: string) => void;
  user: User;
}

export default PostItemProps;
