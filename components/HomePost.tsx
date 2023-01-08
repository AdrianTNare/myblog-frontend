import { useRouter } from "next/router";
import { Post } from "../app/types/types";

interface Props {
  post: Post;
}

export const HomePost = ({ post }: Props) => {
  const { push } = useRouter();
  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl mx-auto mb-4">
      <div className="card-body gap-0">
        <h2
          className="card-title mb-2"
          onClick={() => push(`/post/${post.id}`)}
        >
          {post.title}
        </h2>
        <h5 className="mb-0 text-lg">{post.user?.username} </h5>
        <h6 className="font-light text-primary text-sm mb-2">
          {`${new Date(post.dateCreated ?? "").toLocaleDateString()}`}
        </h6>
        <p>{post.body}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">comment</button>
        </div>
      </div>
    </div>
  );
};
