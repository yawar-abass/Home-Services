import { useContext, useEffect, useLayoutEffect, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, usersDb } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password, phone, name }) {
    setIsAuthenticating(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const email = userCredential._tokenResponse.email;
        const uid = auth.currentUser.uid;

        // Storing User Info
        setDoc(doc(usersDb, "users", `${uid}`), {
          email: email,
          phone: phone,
          name: name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(
          "Authentication failed",
          "Could not log you in. Please check your input and try again later."
        );

        setIsAuthenticating(false);
      });
  }

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.replace("Welcome");
        }
      });

      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
