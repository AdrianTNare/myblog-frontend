import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { defaultAlertDetails, defaultLoginInput } from "../app/fixtures/fixtures";
import { AlertDetails, LoginInput } from "../app/types/types";
import { LoginAlert } from "./LoginAlert";

export const LoginCardBody = () => {
  const { push } = useRouter();

  const [input, setInput] = useState<LoginInput>(defaultLoginInput);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((currentInput) => ({
      ...currentInput,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        window.localStorage.removeItem("token");
        throw new Error("failed to login!");
      }
      const data = await response.json();
      if (data.token) window.localStorage.setItem("token", data.token);
      push("/");
    } catch (e) {
      console.log(e);
      window.localStorage.removeItem("token");
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
        <LoginAlert success={alertDetails.success} text={alertDetails.text} />
      )}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          name="username"
          type="text"
          value={input.username}
          placeholder="username"
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
          type="text"
          value={input.password}
          placeholder="password"
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};