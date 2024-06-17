import { loginStatusTypes } from "../../src/helpers/types"

export const initialState = {
    status: loginStatusTypes.Checking,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: loginStatusTypes.Authenticated,
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: loginStatusTypes.NotAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
}