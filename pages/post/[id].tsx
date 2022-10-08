import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VscHome } from "react-icons/vsc";
import { defaultAlertDetails, defaultPost } from "../../app/fixtures/fixtures";
import { AlertDetails, Post } from "../../app/types/types";
import { LoginAlert } from "../../components/LoginAlert";
import { useAuth } from "../../contexts/Auth";

const Home: NextPage = () => {
  const { push, query } = useRouter();
  const { logout } = useAuth();
  const { id } = query;

  const [post, setPost] = useState<Post>(defaultPost);

  const [alertDetails, setAlertDetails] =
    useState<AlertDetails>(defaultAlertDetails);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    const hideAlert = async () => {
      timeoutID = await setTimeout(() => {
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
        const response = await fetch(`http://127.0.0.1:8080/posts/id?id=${id}`);
        if (!response.ok) throw Error("failed to get post");
        const data = await response.json();
        console.log("data:", data); //Reove
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

  return (
    <div className="bg-base-300">
      <Head>
        <title>Post</title>
      </Head>
      <div className="px-4 mx-auto max-w-3xl overflow-auto relative">
        <div className="navbar bg-base-100 rounded-lg mt-5 mb-8 shadow-xl ">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={() => push("/user/try")}>My Blog</a>
                </li>
                <li>
                  <a onClick={() => push("/newPost")}>New Post</a>
                </li>
                <li>
                  <a onClick={() => logout()}>Log Out</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl">Blog Post</a>
          </div>
          <div className="navbar-end">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => push("/")}
            >
              <VscHome className="text-2xl" />
            </button>
          </div>
        </div>
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
              <button className="btn btn-primary">Comment</button>
            </div>
            <h3 className="mb-7 font-bold text-xl">Comments</h3>
            <div className="mb-4">
              <textarea
                className="w-full mb-3 textarea textarea-primary"
                placeholder="Add Comment..."
              ></textarea>
              <div className="flex justify-end gap-3">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex mb-2 gap-4">
                <h5 className="font-semibold">Author</h5>
                <h6 className="font-light text-gray-500">date</h6>
              </div>
              <div className="inline-block px-4 py-2 border border-slate-300 rounded-md bg-base-200">
                <p>This is the content of the comment</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex mb-2 gap-4">
                <h5 className="font-semibold">Author</h5>
                <h6 className="font-light text-gray-500">date</h6>
              </div>
              <div className="inline-block px-4 py-2 border border-slate-300 rounded-md bg-base-200">
                <p>
                  This is the content of the comment that the other users would
                  have left under the current post
                </p>
              </div>
            </div>
            <div className="flex mt-8 justify-center">
              <button className="btn btn-outline btn-sm loading">
                loading
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
