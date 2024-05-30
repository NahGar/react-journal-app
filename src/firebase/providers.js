import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWidthGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } 
    catch (error) {
        
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const registerUserWithEmailPassword = async ( { email, password, displayName } ) => {

    try {
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        //actualiza displayName del usuario
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } 
    catch (error) {

        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const signInWidthEmailAndPassword = async({ email, password }) => {

    try {
        const result = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        console.log(result);
        /*
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        */
    } 
    catch (error) {
        
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}