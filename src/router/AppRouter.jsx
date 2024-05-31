import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { loginStatusTypes } from "../types";
import { CheckingAuth } from "../ui/component";

export const AppRouter = () => {

    const { status } = useSelector( state => state.auth );

    useEffect( () => {

        onAuthStateChanged( FirebaseAuth, async( user ) => {
            
        });

    }, [])

    if( status === loginStatusTypes.Checking) {
        return <CheckingAuth />
    }

    return (
        <Routes>
            <Route path="/auth/*" element={ <AuthRoutes /> }/>
            <Route path="/*" element={ <JournalRoutes /> }/>
        </Routes>
    )
}
