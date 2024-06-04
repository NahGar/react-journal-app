import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async ( uid = '' ) => {

    if( !uid ) throw new Error('El UId del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
    const docs = await getDocs( collectionRef );

    const notes = [];

    //se obtiene la data ejecutando la función data de lo que retorna firebase
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() })
    });

    return notes;
}