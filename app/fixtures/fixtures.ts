import { AlertDetails, LoginInput, Post } from "../types/types";

export const defaultPost: Post = {
  title: "",
  body: "",
};

export const defaultAlertDetails: AlertDetails = {
  showAlert: false,
  success: false,
  text: "Operation failed",
};

export const defaultLoginInput: LoginInput = {
  username: "",
  password: "",
};
