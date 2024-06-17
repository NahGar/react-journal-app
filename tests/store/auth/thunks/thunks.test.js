import { checkingAuthentication } from "../../../../src/store/auth/thunks";

jest.mock("../../../../src/firebase/providers");

describe('Pruebas en AuthThunks', () => { 
    
    test('debe invocar checkingAuthentication', () => { 
        checkingAuthentication();
    });
});