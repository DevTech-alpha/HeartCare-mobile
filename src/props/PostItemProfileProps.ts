import Post from "../model/Post";

interface PostItemProfileProps {
  item: Post & { username: string; userPhoto: string };
  toggleLike: (postId: string) => void;
  userUid: string | null;
  deletePost: (postId: string) => void;
}

export default PostItemProfileProps;
