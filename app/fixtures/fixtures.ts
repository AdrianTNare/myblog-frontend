import { AlertDetails, LoginInput } from "../types/types";

export const defaultAlertDetails: AlertDetails = {
  showAlert: false,
  success: false,
  text: "Operation failed",
};


export const defaultLoginInput: LoginInput = {
  username: "",
  password: ""
}