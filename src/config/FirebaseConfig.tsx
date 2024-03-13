// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// const firebaseConfig = {
//   apiKey: FB_API_KEY,
//   authDomain: FB_AUTH_DOMAIN,
//   projectId: FB_PROJECT_ID,
//   storageBucket: FB_STORAGE_BUCKET,
//   messagingSenderId: FB_MSG_SENDER_ID,
//   appId: FB_APP_ID,
//   measurementId: FB_MEASUREMENT_ID,
//   databaseURL: FB_DB_URL,
// };

const firebaseConfig = {

  apiKey: "AIzaSyCLdCxgYj7t41GGoFIiNjwQ6oqQWE7BN3I",
  authDomain: "social-media-f0705.firebaseapp.com",
  projectId: "social-media-f0705",
  storageBucket: "social-media-f0705.appspot.com",
  messagingSenderId: "696581084685",
  appId: "1:696581084685:web:95de8a33b224459f956744",
  measurementId: "G-9LYQNZJ4LR",
  databaseURL: "https://social-media-f0705-default-rtdb.firebaseio.com/"
};
let ath;

let app: any;
// Initialize Firebase
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    ath = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  ath = getAuth(app);
}
const auth = getAuth(app)
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)
export default auth;