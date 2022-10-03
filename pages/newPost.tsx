import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { defaultAlertDetails, defaultPost } from "../app/fixtures/fixtures";
import { AlertDetails } from "../app/types/types";
import { LoginAlert } from "../components/LoginAlert";

const Home: NextPage = () => {
  const { push } = useRouter();
  const [postInput, setPostInput] = useState(defaultPost);

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostInput((currentInput) => ({
      ...currentInput,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    push("/");
  };

  const handleSubmit = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) throw Error("you are not logged in!");
      const response = await fetch("http://127.0.0.1:8080/posts/create", {
        method: "POST",
        headers: { "Content-type": "application/json", authorization: token },
        body: JSON.stringify(postInput),
      });
      if (!response.ok) {
        throw new Error("failed to create post!");
      }
      const data = await response.json();
      console.log(data); //remove
      setAlertDetails({
        showAlert: true,
        success: true,
        text: "Post created successfully,",
      });
      push(`/post/${data.id}`);
    } catch (e) {
      console.log(e);
      setAlertDetails({
        showAlert: true,
        success: false,
        text: "Failed to create post",
      });
    }
  };

  return (
    <div className="bg-base-300">
      <Head>
        <title>Blog Home</title>
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
                  <a>Homepage</a>
                </li>
                <li>
                  <a>Portfolio</a>
                </li>
                <li>
                  <a>About</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl">Blog Post</a>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
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
            <h1 className="mb-5 font-bold text-4xl">New Post</h1>
            <p className="mb-3">
              Enter the title and body of your post here...
            </p>
            <input
              name="title"
              type="text"
              value={postInput.title}
              placeholder="Add Title..."
              className="input input-bordered input-primary w-full mb-8"
              onChange={handleChange}
            />
            <div className="mb-4">
              <textarea
                name="body"
                value={postInput.body}
                placeholder="Add Content..."
                className="w-full mb-3 h-48 textarea textarea-primary"
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
