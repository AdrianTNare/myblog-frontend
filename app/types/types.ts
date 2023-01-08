export type AuthView = "login" | "signup";

export type LinkView = "user" | "newPost" | "post";

export interface Post {
  id: string;
  title: string;
  body: string;
  dateCreated: string;
  user: User | null;
}

export interface Comment {
  id: string;
  body: string;
  dateCreated: string;
  user: User | null;
  post: Post | null;
}

export interface User {
  name: string;
  surname: string;
  username: string;
  authToken: string | null;
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
