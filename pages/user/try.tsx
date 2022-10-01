import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="bg-base-300">
      <Head>
        <title>Profile</title>
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
            <h1 className="mb-5 font-bold text-4xl">Johnny Harris</h1>
            <h5 className="font-semibold">Blog Posts: 5</h5>
            <h6 className="mb-10 font-light text-primary">
              Date Joined : 2/5/2022
            </h6>
            <h3 className="mb-4 font-bold text-xl">About</h3>
            <p className="mb-8">
              This is a small description about the user and his/her interests
              in general, as well as what kind of content to expect from the
              user.
            </p>
            <h3 className="mb-7 font-bold text-2xl">Posts</h3>
            <div className="mb-4 ">
              <h3 className=" font-bold text-xl">Post Title</h3>
              <h6 className="mb-4 font-light text-primary">
                Date Posted : 2/5/2022
              </h6>
              <p className="">
                This is the content of the post that i have just made up right
                now. This content will be very long or short within the actual
                post depending on what the user actually wanted to post when
                he/she was writing the post.
              </p>
            </div>
            <div className="divider" />
            <div className="mb-4 ">
              <h3 className=" font-bold text-xl">Post Title</h3>
              <h6 className="mb-4 font-light text-primary">
                Date Posted : 2/5/2022
              </h6>
              <p className="">
                This is the content of the post that i have just made up right
                now. This content will be very long or short within the actual
                post depending on what the user actually wanted to post when
                he/she was writing the post.
              </p>
            </div>
            <div className="divider" />
          </div>
        </div>
        <div className="btn-group mx-auto  mt-7 w-fit">
          <button className="btn btn-sm">«</button>
          <button className="btn btn-sm">Page 22</button>
          <button className="btn btn-sm">»</button>
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