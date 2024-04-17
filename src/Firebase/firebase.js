// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDC8lBt83dqFysGFygQYAdpcYNoCQWwfXM",
//   authDomain: "netflixgpt-a9836.firebaseapp.com",
//   projectId: "netflixgpt-a9836",
//   storageBucket: "netflixgpt-a9836.appspot.com",
//   messagingSenderId: "202209939956",
//   appId: "1:202209939956:web:b0f446f01b39e2b161a9a1",
//   measurementId: "G-60M7G2EQWX"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDpeIw9iREpm1kwP3QcQIuX5C5W39TUULQ",
  authDomain: "netflixgpt-e3c64.firebaseapp.com",
  projectId: "netflixgpt-e3c64",
  storageBucket: "netflixgpt-e3c64.appspot.com",
  messagingSenderId: "655800983224",
  appId: "1:655800983224:web:1efd7766dd9e74fcbcde4d",
  measurementId: "G-K11H44F7HC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

//To deploy
//firebase login
//firebase init
//firebase deploy
