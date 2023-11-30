import { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  uid: "",
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  userData: {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [uid, setUid] = useState();
  const [userData, setUserData] = useState();

  function authenticate(token) {
    setAuthToken(token);
    // AsyncStorage.setItem("token", token);
  }

  function storeUid(uid) {
    setUid(uid);
    AsyncStorage.setItem("uid", uid);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  function userProfile(data) {
    setUserData(data);
  }

  const value = {
    uid: uid,
    token: authToken,
    isAuthenticated: !!authToken,
    userData: userData,
    authenticate: authenticate,
    logout: logout,
    storeUid: storeUid,
    userProfile: userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
