import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { auth, usersDb } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../store/auth-context";

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password, phone, name }) {
    try {
      setIsAuthenticating(true);
      const auth = getAuth();

      // Create user and send email verification
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);

      // Storing user info
      const { uid } = auth.currentUser;
      const userData = {
        email: auth.currentUser.email,
        phone,
        name,
      };
      await setDoc(doc(usersDb, "users", uid), userData);

      // Notify the user to check their email
      Alert.alert("Verify Email", "Please check your email for verification");

      navigation.replace("Login");
    } catch (error) {
      console.log("Sign Up Error:", error);
      Alert.alert(
        "Authentication failed",
        `Could not sign you up.  ${error.message}`
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
