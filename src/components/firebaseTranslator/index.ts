import { AuthError } from "firebase/auth";
import { firebaseErrors } from "../../utils/firebase-error";

export const localizeErrorMap = (e: Error) => {
    if (typeof (e as AuthError).code === 'string' && (e as AuthError).code in firebaseErrors) {
      (e as AuthError).message = (firebaseErrors as any)[(e as AuthError).code];
    }
  };