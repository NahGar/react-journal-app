import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWidthEmailAndPassword, signInWidthGoogle } from "../../../../src/firebase/providers";
import { checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startLogoutFirebase, startSignInWidthEmailAndPassword } from "../../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn } from "../../../../src/store/auth/thunks";
import { cleanOnLogout } from "../../../../src/store/journal";
import { demoUser } from "../../../fixtures/authFixtures";

//mock completo a todos los providers
jest.mock("../../../../src/firebase/providers");

describe('Pruebas en AuthThunks', () => { 
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe invocar checkingCredentials', async () => { 
        
        //()=llamdo de la función ()=parámetros para la función que devuelve
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe invocar checkingCredentials y login - Exito', async () => { 
        
        const loginData = { ok: true, ...demoUser };
        //es un mock por el mock completo creado
        await signInWidthGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe invocar checkingCredentials y logout - Error', async () => { 
        
        const loginData = { ok: false, errorMessage: 'Error xxx en Google' };
        //es un mock por el mock completo creado
        await signInWidthGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startSignInWidthEmailAndPassword debe invocar checkingCredentials y login - Exito', async () => { 
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await signInWidthEmailAndPassword.mockResolvedValue( loginData );
        await startSignInWidthEmailAndPassword( formData )(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startSignInWidthEmailAndPassword debe invocar checkingCredentials y logout - Error', async () => { 
        
        const loginData = { ok: false, errorMessage: 'Error xxx con email y password' };
        const formData = { email: demoUser.email, password: '123456' };
        
        await signInWidthEmailAndPassword.mockResolvedValue( loginData );
        await startSignInWidthEmailAndPassword( formData )(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startCreatingUserWithEmailPassword debe invocar checkingCredentials, registerUserWithEmailPassword y login - Exito', async () => { 
        
        const registerData = { ok: true, ...demoUser };
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };
        
        await registerUserWithEmailPassword.mockResolvedValue( registerData );
        await startCreatingUserWithEmailPassword( formData )(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startCreatingUserWithEmailPassword debe invocar checkingCredentials, registerUserWithEmailPassword y logout - Error', async () => { 
        
        const registerData = { ok: false, errorMessage: 'Error al registrar' };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };
        
        await registerUserWithEmailPassword.mockResolvedValue( registerData );
        await startCreatingUserWithEmailPassword( formData )(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( registerData.errorMessage ) );
    });

    test('startLogout debe invocar logoutFirebase, logout y cleanOnLogout', async () => { 
        
        // con () ejecuta startLogoutFirebase, con los segundos paréntesis ejecuta el dispatch
        await startLogoutFirebase()(dispatch);

        
        expect( logoutFirebase ).toHaveBeenCalled();
        //expect( dispatch ).toHaveBeenCalled( logoutFirebase() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        expect( dispatch ).toHaveBeenCalledWith( cleanOnLogout() );
    });

});