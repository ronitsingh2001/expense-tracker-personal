// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuJ7-VgwnDcvGMJLzpMK_Z3qJwt6F4Ri8",
    authDomain: "expense-tracker-774d1.firebaseapp.com",
    projectId: "expense-tracker-774d1",
    storageBucket: "expense-tracker-774d1.appspot.com",
    messagingSenderId: "525832976612",
    appId: "1:525832976612:web:94d0a48f75e3cc38ced4f1",
    measurementId: "G-LZ70HRK914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const auth = getAuth();