import { loginStatusTypes } from "../../../src/helpers/types";
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => {
    
    test('debe regresar el estado inicial y llamarse "auth"', () => {
        
        const state = authSlice.reducer( initialState, {});

        expect( authSlice.name ).toBe('auth');

        expect( state ).toEqual( initialState );
    });

    test('debe realizar la autenticación', () => {
        
        const state = authSlice.reducer( initialState, login( demoUser ));

        //expect( state ).toEqual( authenticatedState );
        expect( state ).toEqual({
            status: loginStatusTypes.Authenticated,
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });

    });

    test('debe realizar el logout sin argumentos', () => {
        
        const state = authSlice.reducer( authenticatedState, logout( ));
        
        expect( state ).toEqual({
            status: loginStatusTypes.NotAuthenticated,
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });

    });

    test('debe realizar el logout y moestrar un mensaje de error', () => {
        
        const state = authSlice.reducer( authenticatedState, logout( 'Mensaje de error' ));
        
        //expect( state.errorMessage ).toBe('Mensaje de error');
        expect( state ).toEqual({
            status: loginStatusTypes.NotAuthenticated,
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Mensaje de error'
        });

    });

    test('debe cambiar estado a checking', () => {
        
        const state = authSlice.reducer( initialState, checkingCredentials( ));
        
        expect( state ).toEqual({
            status: loginStatusTypes.Checking,
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null
        });

    });
});