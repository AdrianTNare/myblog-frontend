import { useState } from "react";
import { LoginCardBody } from "./LoginCardBody";
import { SignupCardBody } from "./SignupCardBody";

export const LoginCard = () => {
  const [loginView, setLoginView] = useState(true);
  const handleTabChange = (mode: boolean) => {
    if (mode !== loginView) setLoginView(mode);
  };

  // add a useEffect to check if the user clicked on log in or signup
  // and change loginview accordingly

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
