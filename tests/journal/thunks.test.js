import { startNewNote } from "../../src/store/journal";

describe('Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe crear una nueva nota en blanco', async() => {

        getState.mockReturnValue({ auth: { uid: 'TEST-UID' } })
        await startNewNote()( dispatch, getState );

        console.log(getState);
    });
});