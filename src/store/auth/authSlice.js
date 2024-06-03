import { createSlice } from '@reduxjs/toolkit';
import { loginStatusTypes } from '../../types';

const initialState = {
  value: 0,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: loginStatusTypes.Checking, // 'ckecking', 'authenticated' , 'not authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {
            state.status = loginStatusTypes.Authenticated;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, action ) => {
            state.status = loginStatusTypes.NotAuthenticated;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = action.payload;
        },
        checkingCredentials: ( state ) => {
            state.status = loginStatusTypes.Checking;
        }
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;