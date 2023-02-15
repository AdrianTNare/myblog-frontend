import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { appConfig } from "../../app/config";
import { defaultAlertDetails, defaultPost } from "../../app/fixtures/fixtures";
import { AlertDetails, Comment, Post } from "../../app/types/types";
import { CommentInput } from "../../components/CommentInput";
import { LoginAlert } from "../../components/LoginAlert";
import { Navbar } from "../../components/Navbar";
import { PostComment } from "../../components/PostComment";
import { useAuth } from "../../contexts/Auth";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { user } = useAuth();
  const { id } = query;

  const [post, setPost] = useState<Post>(defaultPost);

  const [comments, setComments] = useState<Comment[]>([]);

  const [showCommentInput, setShowCommentInput] = useState(false);

  const [commentsPage, setCommentsPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [hasMoreComments, setHasMoreComments] = useState(false);

  const [alertDetails, setAlertDetails] =
    useState<AlertDetails>(defaultAlertDetails);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    const hideAlert = () => {
      timeoutID = setTimeout(() => {
        setAlertDetails(defaultAlertDetails);
      }, 2500);
    };
    if (alertDetails.showAlert) {
      hideAlert();
    }
    return () => clearTimeout(timeoutID);
  }, [alertDetails.showAlert]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `${appConfig.backendDomain}/posts/id?id=${id}`
        );
        if (!response.ok) throw Error("failed to get post");
        const data = await response.json();
        if (Boolean(data)) {
          setPost(data);
        } else {
          throw Error("post not found!");
        }
      } catch (e: any) {
        console.log(e.message);
        setAlertDetails({
          showAlert: true,
          success: false,
          text: "Failed to load post",
        });
      }
    };
    if (id) {
      getPost();
    }
  }, [id]);

  const getComments = async (reset: boolean = false) => {
    setIsLoading(true);
    let pageToRequest = 1;
    if (!reset) {
      pageToRequest = commentsPage + 1;
      setCommentsPage((current) => current + 1);
    }
    try {
      const response = await fetch(
        `${appConfig.backendDomain}/comments/post?id=${id}&page=${pageToRequest}`
      );
      if (!response.ok) throw Error("failed to get comments");
      const data = await response.json();
      if (!Boolean(data)) throw Error("comments not found!");

      setComments((currentComments) =>
        reset
          ? data.comments.content
          : [...currentComments, ...data.comments.content]
      );
      setHasMoreComments(data.hasNext);
    } catch (e: any) {
      console.log(e.message);
      setAlertDetails({
        showAlert: true,
        success: false,
        text: "Failed to load comments",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      getComments(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleShowCommentInput = () => {
    if (!user?.authToken) {
      setAlertDetails({
        showAlert: true,
        success: false,
        text: "Please login first",
      });
      return;
    }
    setShowCommentInput(true);
  };

  const handleHideCommentInput = () => {
    setShowCommentInput(false);
  };

  return (
    <div className="bg-base-300">
      <Head>
        <title>Post</title>
      </Head>
      <div className="px-4 mx-auto max-w-3xl overflow-auto relative">
        <Navbar title="Post" />
        <div className="w-full min-h-screen">
          {alertDetails.showAlert && (
            <LoginAlert
              success={alertDetails.success}
              text={alertDetails.text}
              className="left-0 right-0 mx-auto top-26"
            />
          )}
          <div className="w-full min-h-screen pt-14 pb-14 px-6 mb-8 bg-base-100">
            <h1 className="mb-5 font-bold text-4xl">{post.title}</h1>
            <h5 className="font-semibold">{post.user?.username}</h5>
            <h6 className="mb-10 font-light text-gray-500">
              {post.dateCreated
                ? new Date(post.dateCreated).toLocaleDateString()
                : ""}
            </h6>
            <p className="mb-3">{post.body}</p>
            <div className="flex mb-3 justify-end">
              {!showCommentInput && (
                <button
                  className="btn btn-primary"
                  onClick={handleShowCommentInput}
                >
                  Comment
                </button>
              )}
            </div>
            <h3 className="my-7 font-bold text-xl">Comments</h3>
            {showCommentInput && (
              <CommentInput
                postId={id as string | undefined}
                getComments={getComments}
                setAlertDetails={setAlertDetails}
                handleHideCommentInput={handleHideCommentInput}
              />
            )}
            <div>
              {comments.map((comment) => (
                <PostComment key={comment.id} comment={comment} />
              ))}
            </div>
            <div className="flex mt-8 justify-center">
              <button
                className={`btn btn-outline btn-sm ${isLoading && "loading"}`}
                onClick={() => getComments()}
                disabled={!hasMoreComments}
              >
                {isLoading ? "loading" : "Load more ..."}
              </button>
            </div>
          </div>
        </div>
        <footer className="footer footer-center p-4 mt-5 bg-base-300 text-base-content">
          <div>
            <p>Copyright © 2022 - All right reserved by Adrian</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
