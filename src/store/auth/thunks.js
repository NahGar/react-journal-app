import { registerUserWithEmailPassword, signInWidthEmailAndPassword, signInWidthGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = ( email, password ) => {

    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = ( ) => {

    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );

        const result = await signInWidthGoogle();      
        if( result.ok ) { 
            dispatch( login(result) );
        }
        else {
            dispatch( logout(result.errorMessage) );
        }
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({ email, password, displayName });      
        
        if( result.ok ) { 
            dispatch( login(result) );
        }
        else {
            dispatch( logout(result.errorMessage) );
        }
    }
}

export const startSignInWidthEmailAndPassword = ({ email, password }) => {

    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );

        const result = await signInWidthEmailAndPassword({ email, password });      
        /*
        if( result.ok ) { 
            dispatch( login(result) );
        }
        else {
            dispatch( logout(result.errorMessage) );
        }
        */
    }
}