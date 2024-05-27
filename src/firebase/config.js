// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBSePu_4oKPBesUEnii_pv5v7gXVlQjh2s",
    authDomain: "react-cursos-18e8d.firebaseapp.com",
    projectId: "react-cursos-18e8d",
    storageBucket: "react-cursos-18e8d.appspot.com",
    messagingSenderId: "391743388963",
    appId: "1:391743388963:web:733830895f1af6a1b02096"
};


// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );