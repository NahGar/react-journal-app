import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    //para mantener el estado de autenticado
    useEffect( () => {
    
        //es una función que regresa un observable (una función que emite valores cada vez que cambia)
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if( !user ) return dispatch( logout() );
            
            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }) );

            dispatch ( startLoadingNotes() );
        });
    
    }, []);

    return status;
}