import React, { useContext, useEffect, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const auth = getAuth();

  const isEmailVerified = () => {
    const user = getAuth().currentUser;
    return user && user.emailVerified;
  };

  const redirectToMainScreen = () => {
    navigation.replace("Main");
  };

  // Automatically redirect if the user is already authenticated and their email is verified
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && isEmailVerified()) {
        redirectToMainScreen();
      }
    });

    return unsubscribe;
  }, [auth]);

  async function loginHandler({ email, password }) {
    try {
      setIsAuthenticating(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the user's email is verified
      if (user && isEmailVerified()) {
        authCtx.isAuthenticated = true;
        await authCtx.storeUid(user?.uid);
      } else {
        // If not verified, send another email verification
        await sendEmailVerification(user);
        Alert.alert("Verify Email", "Please check your email for verification");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging User in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
