import { signInWidthGoogle } from "../../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn } from "../../../../src/store/auth/thunks";
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
        
        const logoutData = { ok: false, errorMessage: 'Error xxx en Google' };
        //es un mock por el mock completo creado
        await signInWidthGoogle.mockResolvedValue( logoutData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( logoutData.errorMessage ) );
    });

});