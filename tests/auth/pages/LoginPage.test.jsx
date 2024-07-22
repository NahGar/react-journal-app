import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { authSlice } from "../../../src/store/auth";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { startGoogleSignIn, startSignInWidthEmailAndPassword } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from '../../fixtures/authFixtures';


const mockStartGoogleSignIn = jest.fn();
const mockStartSignInWidthEmailAndPassword = jest.fn();
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startSignInWidthEmailAndPassword: ({ email, password}) => {
        return () => {
            mockStartSignInWidthEmailAndPassword( {email, password} )
        }
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //hay que cargarle status del auth para que el botón de google esté habilitado para fireEvent
    preloadedState: {
        auth: notAuthenticatedState
    }
});


//Nota: Tuve errores con @testing-library/dom
//Solucion: yarn add --dev @testing-library/dom

describe('Pruebas en <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrar el componente correctamente', () => {

        render( 
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getAllByText("Login").length ).toBeGreaterThanOrEqual(1);
        
    });

    test('botón de google debe llamar startGoogleSignIn', () => {

        render( 
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const btnGoogle = screen.getByLabelText('btnGoogle');
        fireEvent.click(btnGoogle);

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
    });

    test('submit debe llamar startLoginWithEmailPassword', () => {

        const email = 'pepe@pepe.com';
        const password = '123456';

        render( 
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } });

        //hay que cargar inputProps en el button en LoginPage
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });

        fireEvent.submit( screen.getByLabelText ("submitForm") );

        expect( mockStartSignInWidthEmailAndPassword ).toHaveBeenCalledWith({ email, password});
    });
});
