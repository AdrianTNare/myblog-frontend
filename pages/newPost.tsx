import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { appConfig } from "../app/config";
import { defaultAlertDetails, defaultPost } from "../app/fixtures/fixtures";
import { AlertDetails } from "../app/types/types";
import { LoginAlert } from "../components/LoginAlert";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/Auth";

const Home: NextPage = () => {
  const { push } = useRouter();
  const { user } = useAuth();
  const [postInput, setPostInput] = useState(defaultPost);

  const [alertDetails, setAlertDetails] =
    useState<AlertDetails>(defaultAlertDetails);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    const hideAlert = async () => {
      timeoutID = setTimeout(() => {
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
      if (!user?.authToken) throw Error("you are not logged in!");
      const response = await fetch(`${appConfig.backendDomain}/posts/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: user?.authToken ?? "",
        },
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
        <title>New Post</title>
      </Head>
      <div className="px-4 mx-auto max-w-3xl overflow-auto relative">
        <Navbar title="New Post" />
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
