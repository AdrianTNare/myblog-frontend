import { useState } from "react";
import { LoginCardBody } from "./LoginCardBody";
import { SignupCardBody } from "./SignupCardBody";

export const LoginCard = () => {
  const [loginView, setLoginView] = useState(false);
  const handleTabChange = (mode: boolean) => {
    if (mode !== loginView) setLoginView(mode);
  };

  return (
    <div className="mt-28 mx-auto w-full max-w-sm">
      <div className="tabs ">
        <a
          className={` tab tab-lifted ${loginView && "tab-active"}`}
          onClick={() => handleTabChange(true)}
        >
          Log In
        </a>
        <a
          className={` tab tab-lifted ${!loginView && "tab-active"}`}
          onClick={() => handleTabChange(false)}
        >
          Sign Up
        </a>
      </div>
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 rounded-tl-none static">
        {!loginView ? <SignupCardBody /> : <LoginCardBody />}
      </div>
    </div>
  );
};
