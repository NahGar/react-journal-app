
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        /*
        active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imageUrls: [],
        }*/
    },
    reducers: {
        savingNewNote: ( state, action ) => {
            state.isSaving = true
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            
            state.isSaving = true;
            state.messageSaved = '';
        },
        noteUpdated: ( state, action ) => {
            
            /*
            let newNotes = [];
            state.notes.forEach( (note) => {
                if( state.active.id === note.id ) {
                    newNotes.push(state.active);
                }
                else {
                    newNotes.push(note);
                }
            });
            state.notes = newNotes;
            */

            state.notes = state.notes.map( (note) => {
                if( action.payload.id === note.id ) {
                    return action.payload;
                }
                return note;
            });

            state.messageSaved = `La nota ha sido actualizada correctamente`;
            state.isSaving = false;
        },
        deleteNoteById: ( state, action ) => {
            state.notes.filter( (note) => { note.id !== action.payload } );
            state.isSaving = false;

        },
        setPhotosToActiveNote: ( state, action ) => {
            // con ...state.active.imageUrls mantiene las urls existentes y agrega ...action.payload (pueden ser varias)
            if(!state.active.imageUrls) {
                state.active.imageUrls = [ ...action.payload ];
            }
            else {
                state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            }
            state.isSaving = false;
        }
    },
});

// Action creators are generated for each case reducer function
export const { 
    savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, 
    noteUpdated, deleteNoteById, setPhotosToActiveNote } = journalSlice.actions;
