import { useRouter } from "next/router";
import { Post } from "../app/types/types";

interface Props {
  post: Post;
}

export const HomePost = ({ post }: Props) => {
  const { push } = useRouter();
  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl mx-auto mb-4 rounded-md">
      <div className="card-body gap-0 px-4 pb-5">
        <h2
          className="card-title mb-2 cursor-pointer"
          onClick={() => push(`/post/${post.id}`)}
        >
          {post.title
            ? post.title.charAt(0).toUpperCase() + post.title.slice(1)
            : ""}
        </h2>
        <h5 className="mb-0 text-lg">{post.user?.username} </h5>
        <h6 className="font-light text-primary text-sm mb-2">
          {`${new Date(post.dateCreated ?? "").toLocaleDateString()}`}
        </h6>
        <p>
          {post.body.length > 160 ? post.body.slice(0, 159) + "..." : post.body}
        </p>
        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => push(`/post/${post.id}`)}
          >
            comment
          </button>
        </div>
      </div>
    </div>
  );
};
