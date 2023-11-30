import { StatusBar } from "expo-status-bar";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import StackNavigator from "./StackNavigator";
import { getAuth } from "firebase/auth";

SplashScreen.preventAutoHideAsync();

function Root({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [authUser, setAuthUser] = useState(false);

  const authCtx = useContext(AuthContext);
  const auth = getAuth();
  const uid = authCtx.uid;

  useEffect(() => {
    async function prepare() {
      const uid = await AsyncStorage.getItem("uid");

      if (uid) {
        setAuthUser(true);
        setAppIsReady(true);
      }
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
      onLayout={onLayoutRootView}
    >
      <StackNavigator authUser={authUser} />
    </View>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
