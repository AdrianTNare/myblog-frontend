import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { defaultComment } from "../app/fixtures/fixtures";
import { AlertDetails } from "../app/types/types";
import { useAuth } from "../contexts/Auth";

interface Props {
  postId?: string;
  getComments: (reset: boolean) => void;
  setAlertDetails: Dispatch<SetStateAction<AlertDetails>>;
  handleHideCommentInput: () => void;
}

export const CommentInput = ({
  postId,
  getComments,
  setAlertDetails,
  handleHideCommentInput,
}: Props) => {
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState(defaultComment);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setCommentInput((currentInput) => ({
      ...currentInput,
      body: value,
    }));
  };

  const handleCancel = () => {
    handleHideCommentInput();
  };

  const handleSubmit = async () => {
    try {
      if (!user?.authToken) throw Error("you are not logged in!");
      if (!postId) throw Error("postid unavailable");
      const response = await fetch(
        `http://127.0.0.1:8080/comments/create?postId=${postId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: user?.authToken ?? "",
          },
          body: JSON.stringify({ body: commentInput.body }),
        }
      );
      if (!response.ok) {
        throw new Error("failed to create comment!");
      }
      getComments(true);
    } catch (e) {
      console.log(e);
      setAlertDetails({
        showAlert: true,
        success: false,
        text: "Failed to post comment",
      });
    }
  };

  return (
    <div className="mb-4">
      <textarea
        name="body"
        value={commentInput.body}
        className="w-full mb-3 textarea textarea-primary"
        placeholder="Add Comment..."
        onChange={handleChange}
      ></textarea>
      <div className="flex justify-end gap-3">
        <button className="btn btn-ghost" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
