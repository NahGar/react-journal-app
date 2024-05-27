import { signInWidthGoogle } from "../../firebase/providers";
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