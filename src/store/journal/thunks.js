import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, noteUpdated, savingNewNote, setActiveNote, setNotes, setSaving, setPhotosToActiveNote, deleteNoteById } from "./";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {

    //en getState está todo el store
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;
        
        if( !uid ) throw new Error('El UId del usuario no existe');

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        
        await setDoc( newDoc, newNote );

        //copia id que le puse firebase
        newNote.id = newDoc.id;

        dispatch ( addNewEmptyNote( newNote ) );

        dispatch ( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        if( !uid ) throw new Error('El UId del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch ( setNotes( notes ) );
    }
}

export const startSaveNote = () => {

    return async( dispatch, getState ) => {

        dispatch ( setSaving() );
        
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        //elimina el id del objeto para Firestore
        const noteToFireStore = { ...note }; //se copia
        delete noteToFireStore.id; //elimina la propiedad

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        //merge = true se para que si hay campos en destino que no van aquí, se mantienen
        await setDoc( docRef, noteToFireStore, { merge: true } );
        
        dispatch ( noteUpdated( note ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {

        dispatch ( setSaving() );

        const fileUploadPromises = [];

        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        //dispara todas las carga simultáneamente y devuelve las respuestas en un array
        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) );

    }
}

export const startDeletingNote = ({ noteId }) => {
    /*
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ noteId }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById( noteId ) );
    }
    */
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );
    }
}