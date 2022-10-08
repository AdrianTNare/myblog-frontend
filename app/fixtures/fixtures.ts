import { AlertDetails, LoginInput, Post, User } from "../types/types";

export const defaultAuthUser: User = {
  name: "",
  surname: "",
  username: "",
  authToken: null,
};
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
