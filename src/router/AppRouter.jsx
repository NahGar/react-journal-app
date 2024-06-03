import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";

import { loginStatusTypes } from "../types";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/component";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {

    const status = useCheckAuth();
        
    if( status === loginStatusTypes.Checking) {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {
                (status === loginStatusTypes.Authenticated) 
                ? <Route path="/*" element={ <JournalRoutes /> }/>
                : <Route path="/auth/*" element={ <AuthRoutes /> }/>
            }

            <Route path="/*" element={ <Navigate to='/auth/login' /> } />
            
        </Routes>
    )
}
