import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, providerGoogle } from "../../config/firebase";

/**
 * Logs out the user.
 * @returns A promise that resolves to a ResponseFirebase object.
 */
const logoutUser = async () => {
  return auth
    .signOut()
    .then(() => {
      return {
        msg: "Logout successfully",
        status: 200,
      };
    })
    .catch((error) => {
      return {
        msg: "Error to logout",
        status: 404,
        error: error.message,
      };
    });
};

/**
 * Sign in with Google.
 * @returns A promise that resolves to a ResponseFirebase object.
 */
const signInGoogle = async () => {
  return signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential) {
        throw new Error("Error al obtener credenciales de google");
      }
      const token = credential.accessToken;

      return {
        msg: "Usuario logueado correctamente con google",
        data: { token, user: result.user },
        status: 200,
      };
    })
    .catch((error) => {
      return {
        msg: "Usuario no logueado con google",
        error: error.message,
        status: 404,
      };
    });
};

/**
 * Signs up a user with the provided email and password.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns A Promise that resolves to a ResponseFirebase object.
 */
const signUpWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      const token = null;

      // sendEmailVerification(auth.currentUser);

      return {
        msg: "User register successfully",
        data: { token, user },
        status: 200,
      };
    })
    .catch((error) => {
      return {
        msg: "User no logged",
        error: error.message,
        status: 404,
      };
    });
};

/**
 * Sign in with email and password.
 *
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves to a ResponseFirebase object containing the login result.
 */
const signInWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      const token = null;

      return {
        msg: "Usuario logueado correctamente",
        data: { token, user },
        status: 200,
      };
    })
    .catch((error) => {
      return {
        msg: "Credenciales incorrectas",
        error: error.message,
        status: 404,
      };
    });
};

const verifyEmail = () => {
  if (!auth.currentUser) return;

  return sendEmailVerification(auth.currentUser)
    .then(() => {
      return {
        msg: "Correo enviado correctamente",
        data: {},
        status: 200,
      };
    })
    .catch((error) => {
      return {
        msg: "Error al enviar el correo de verificación",
        error: error.message,
        status: 404,
      };
    });
};

/**
 * Sends a password reset email to the specified email address.
 * @param email - The email address to send the password reset email to.
 * @returns A Promise that resolves to a ResponseFirebase object containing the status and data of the operation.
 */
const resetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      return {
        msg: "Correo enviado correctamente",
        data: null,
        status: 200,
      };
    })
    .catch((error) => {
      return {
        msg: "Error: El correo no se pudo enviar",
        error: error.message,
        status: 404,
      };
    });
};

export {
  logoutUser,
  resetPassword,
  signInGoogle,
  signInWithEmail,
  signUpWithEmailAndPassword,
  verifyEmail,
};
