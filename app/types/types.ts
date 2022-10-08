export type AuthView = "login" | "signup";

export interface Post {
  id?: string;
  title: string;
  body: string;
  dateCreated?: string;
  user?: User;
}

export interface User {
  name: string;
  surname: string;
  username: string;
  authToken: string| null;
}

export interface LoginInput {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

export interface AlertDetails {
  showAlert: boolean;
  success: boolean;
  text: string;
}
