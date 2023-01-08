import { Comment } from "../app/types/types";

interface Props {
  comment: Comment;
}

export const PostComment = ({comment}: Props) => {
  return (
    <div className="mb-4">
      <div className="flex mb-2 gap-4">
        <h5 className="font-semibold">{comment.user?.username}</h5>
        <h6 className="font-light text-gray-500">{new Date(comment.dateCreated).toLocaleDateString()}</h6>
      </div>
      <div className="inline-block px-4 py-2 border border-slate-300 rounded-md bg-base-200">
        <p>{comment.body}</p>
      </div>
    </div>
  );
};
