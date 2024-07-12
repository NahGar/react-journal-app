import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, startLoadingNotes, startNewNote } from "../../src/store/journal";
import { loadNotes } from "../../src/helpers/loadNotes";

describe('Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe crear una nueva nota en blanco', async() => {

        getState.mockReturnValue({ auth: { uid: 'TEST-UID' } });
        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            "body": "",
            "title": "",
            id: expect.any( String ),
            date: expect.any( Number ),
        }));
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            "body": "",
            "title": "",
            id: expect.any( String ),
            date: expect.any( Number ),
        }));

        //borrar de firebase
        //const collectionRef = collection( FirebaseDB, `TEST-UID/journal/notes`);
        //const docs = await getDocs( collectionRef );

        //const deletePromises = [];
        //docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ));

        //await Promise.all( deletePromises );
    });

    test('startLoadingNotes debe cargar notas', async() => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } });

        await startLoadingNotes()( dispatch, getState );

        //await waitFor( () => expect(dispatch).toHaveBeenCalledWith( loadNotes({ uid: 'TEST-UID'}) ))
        //expect( dispatch ).toHaveBeenCalledWith( await loadNotes( uid ) );
        //expect( dispatch ).toHaveBeenCalled( await loadNotes( uid ));
        //expect( loadNotes ).toHaveBeenCalled();
        //expect( dispatch ).toHaveBeenCalled( loadNotes( uid ) );
        
    });


});