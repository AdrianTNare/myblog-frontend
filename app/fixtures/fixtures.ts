import { AlertDetails, Comment, LoginInput, Post, User } from "../types/types";

export const defaultAuthUser: User = {
  name: "",
  surname: "",
  username: "",
  authToken: null,
};
export const defaultPost: Post = {
  id: "",
  title: "",
  body: "",
  dateCreated: new Date().toISOString(),
  user: null,
};

export const defaultComment: Comment = {
  id: "",
  body: "",
  dateCreated: new Date().toISOString(),
  user: null,
  post: null,
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
