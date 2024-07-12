// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


const env = getEnvironments();

// Your web app's Firebase configuration
/*
const firebaseConfig = {
    apiKey: "AIzaSyBSePu_4oKPBesUEnii_pv5v7gXVlQjh2s",
    authDomain: "react-cursos-18e8d.firebaseapp.com",
    projectId: "react-cursos-18e8d",
    storageBucket: "react-cursos-18e8d.appspot.com",
    messagingSenderId: "391743388963",
    appId: "1:391743388963:web:733830895f1af6a1b02096"
};
*/
// Testing
/*
const firebaseConfig = {
    apiKey: "AIzaSyDC3Ww-I64Xz7DQg81WXwbNFTxcK17dq0c",
    authDomain: "react-cursos-testing-f379a.firebaseapp.com",
    projectId: "react-cursos-testing-f379a",
    storageBucket: "react-cursos-testing-f379a.appspot.com",
    messagingSenderId: "825125432984",
    appId: "1:825125432984:web:b0df347be29c36223baaed"
};
*/

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_APIKEY,
    authDomain: env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: env.VITE_FIREBASE_PROJECTID,
    storageBucket: env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: env.VITE_FIREBASE_APPID
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );