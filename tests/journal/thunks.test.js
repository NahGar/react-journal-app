import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../src/firebase/config";
import { addNewEmptyNote, journalSlice, noteUpdated, savingNewNote, setActiveNote, setNotes, setSaving, startLoadingNotes, startNewNote, startSaveNote } from "../../src/store/journal";
import { loadNotes } from "../../src/helpers/loadNotes";

describe('Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe crear una nueva nota en blanco', async() => {

        getState.mockReturnValue({ auth: { uid: 'TEST-UID' } })
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
        const collectionRef = collection( FirebaseDB, `TEST-UID/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ));

        await Promise.all( deletePromises );
    },10000);


    test('startLoadingNotes debe cargar las notas', async() => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid } });
 
        //Creamos una nueva nota a ese usuario
        await startNewNote()(dispatch, getState);
 
        //luego traemos las notas que tiene dicho usuario
        const resp = await loadNotes(uid);
 
        //Llamamos al thunk de journalSlice
        await startLoadingNotes()(dispatch, getState);
 
        expect(dispatch).toHaveBeenCalledWith(setNotes( resp ));

    },10000);

    test('startSaveNote debe llamar noteUpdated', async() => {

        const uid = 'TEST-UID';
        const activeNote = { id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imageUrls: []
        }
        const mockState = {
            auth: {
                uid
            },
            journal: {
                active: activeNote
            }
        }
        getState.mockReturnValue( mockState );
         
        await startSaveNote()(dispatch, getState);
 
        expect(dispatch).toHaveBeenCalledWith(setSaving());

        expect(dispatch).toHaveBeenCalledWith(noteUpdated( activeNote ));

    },10000);

    test('startDeletingNote debe llamar noteUpdated', async() => {

        const uid = 'TEST-UID';
        const activeNote = { id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imageUrls: []
        }
        const mockState = {
            auth: {
                uid
            },
            journal: {
                active: activeNote
            }
        }
        getState.mockReturnValue( mockState );
         
        await startSaveNote()(dispatch, getState);
 
        expect(dispatch).toHaveBeenCalledWith(setSaving());

        expect(dispatch).toHaveBeenCalledWith(noteUpdated( activeNote ));

    },10000);
});