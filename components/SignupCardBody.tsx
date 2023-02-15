import { ChangeEvent, useEffect, useState } from "react";
import { appConfig } from "../app/config";
import {
  defaultAlertDetails,
  defaultLoginInput,
} from "../app/fixtures/fixtures";
import { AlertDetails, LoginInput } from "../app/types/types";
import { LoginAlert } from "./LoginAlert";

export const SignupCardBody = () => {
  const [input, setInput] = useState<LoginInput>({
    ...defaultLoginInput,
    email: "",
    confirmPassword: "",
  });

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((currentInput) => ({
      ...currentInput,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${appConfig.backendDomain}/users/register`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(input),
        }
      );
      if (!response.ok) {
        throw new Error("failed to signup!");
      }
      setAlertDetails({
        showAlert: true,
        success: true,
        text: "Signup successful, please login",
      });
    } catch (e) {
      console.log(e);
      setAlertDetails({
        showAlert: true,
        success: false,
        text: "Signup unsuccessful",
      });
    }
  };

  return (
    <div className="card-body static">
      {alertDetails.showAlert && (
        <LoginAlert
          success={alertDetails.success}
          text={alertDetails.text}
          className="top-28"
        />
      )}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          name="username"
          value={input.username}
          type="text"
          placeholder="username"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          name="email"
          value={input.email}
          type="text"
          placeholder="email"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          name="password"
          value={input.password}
          type="text"
          placeholder="password"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          name="confirmPassword"
          value={input.confirmPassword}
          type="text"
          placeholder="confirm password"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
};
