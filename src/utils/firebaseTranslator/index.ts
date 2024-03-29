import { AuthError } from "firebase/auth";
import { firebaseErrors } from "./firebase-error";

export const localizeErrorMap = (e: Error) => {
  if (typeof (e as AuthError).code === "string") {
    const errorMap = firebaseErrors;

    if (errorMap.hasOwnProperty((e as AuthError).code)) {
      (e as AuthError).message = errorMap[(e as AuthError).code];
    }
  }
};
