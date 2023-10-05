import { useContext, useEffect, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const auth = getAuth();

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // Reset the navigation stack to the Home screen
          navigation.replace("Main");
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        }
      });

      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logged in
        const user = userCredential._tokenResponse.email;
        const uid = auth.currentUser.uid;
        authCtx.storeUid(uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(
          "Authentication failed",
          "Could not log you in. login Please check your credentails or try again later!"
        );
        setIsAuthenticating(false);
      });
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Loggin User in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
