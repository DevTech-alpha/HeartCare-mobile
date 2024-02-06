import Post from "../model/Post";

interface PostItemProps {
  item: Post & { username: string; userPhoto: string };
  sharePost: (title: string, content: string) => void;
}

export default PostItemProps;
