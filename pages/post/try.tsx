import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="bg-base-300">
      <Head>
        <title>Blog Home</title>
      </Head>
      <div className="px-4 mx-auto max-w-3xl overflow-auto">
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
          <div className="w-full min-h-screen pt-14 pb-14 px-6 mb-8 bg-base-100">
            <h1 className="mb-5 font-bold text-4xl">
              This is the title of the post
            </h1>
            <h5 className="font-semibold"> Author Name</h5>
            <h6 className="mb-10 font-light text-gray-500"> post date</h6>
            <p className="mb-3">
              This is the content of the post that i have just made up right
              now. This content will be very long or short within the actual
              post depending on what the user actually wanted to post when
              he/she was writing the post.
            </p>
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
