import axios from "axios";
import { getDatabase, ref, child, get } from "firebase/database";

const API_KEY = "AIzaSyDv8PIPVCsDUmMSWDH_Iqd4rtll7Jwn1FE";

export async function fetchImageURL(starsRef) {
  try {
    const url = await getDownloadURL(starsRef);
    return url;
  } catch (error) {
    // Handle different storage error codes here
    switch (error.code) {
      case "storage/object-not-found":
        // File doesn't exist
        break;
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        break;
      case "storage/canceled":
        // User canceled the upload
        break;
      case "storage/unknown":
        // Unknown error occurred, inspect the server response
        break;
      default:
        // Handle other error cases
        console.error("Error fetching image URL:", error);
        break;
    }
    return null;
  }
}

export async function getServiceProviders() {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `services/servicesProviders`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("These Services can't be provided at your location");
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  refToken = response.data.refreshToken;
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

// export async function getServices(token) {
//   const response = await axios.get(
//     "https://login-9c0eb-default-rtdb.firebaseio.com/services.json?auth=" +
//       token
//   );
//   console.log(response.data);
// }

// async function refreshToken() {
//   try {
//     const response = await axios.post(
//       "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
//       {
//         grant_type: "refresh_token",
//         refresh_token: refToken,
//       }
//     );
//     console.log(response.data);
//     console.log("hello");
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//   }
// }

// refreshToken();
