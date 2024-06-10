import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, Note, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

const formValidations = {
    title: [ (value) => value.length >= 1, 'El título es obligatorio.'],
    body: [ (value) => value.length >= 1, 'El cuerpo es obligatorio.'],
}

export const NoteView = () => {

    const { active: activeNote, isSaving, messageSaved } = useSelector( state => state.journal );
    
    const dispatch = useDispatch();

    //const [formSubmitted, setFormSubmitted] = useState(false);

    const { date, title, body, titleValid, bodyValid, isFormValid,
        onInputChange, formState } = useForm( activeNote, formValidations);
        
    const dateString = useMemo( () => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const fecha = new Date(date);
        return fecha.toLocaleDateString('default', opciones);

        //const newDate = new Date(date);
        //return newDate.toUTCString();
    }, [date]);

    //lo utilizamos para que el botón de subir llame al click del input type="file"
    const fileInputRef = useRef();

    // para que los cambios en el form queden actualizados en store.active
    useEffect( () => {
        if( messageSaved !== '') { 
            Swal.fire('Nota actualizada', messageSaved, 'success' );
        }
    }, [messageSaved]);

    useEffect( () => {
        dispatch ( setActiveNote( formState ) );
    }, [formState]);

    const onSaveNote = () => {

        dispatch ( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {

        if( target.files === 0) return;

        dispatch ( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {

        dispatch ( startDeletingNote( { noteId: activeNote.id} ) );
    }

    return (
        <Grid 
            className="animate__animated animate__fadeIn"
            container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>
            <Grid item>

                <input type="file" multiple ref={ fileInputRef } onChange={ onFileInputChange } 
                    style={{ display: 'none' }}/>

                <IconButton color="primary" 
                    disabled={ isSaving } 
                    onClick={ () => fileInputRef.current.click() } >

                    <UploadOutlined />
                </IconButton>

                <Button 
                    disabled={ isSaving || !isFormValid }
                    onClick={ onSaveNote }
                    color='primary' sx={{ padding: 2 }}>

                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    onChange={ onInputChange }
                    name="title"
                    value={ title }
                    error={ !!titleValid /* && formSubmitted */ }
                    helperText={ titleValid }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió hoy?"
                    minRows={ 5 }
                    onChange={ onInputChange }
                    name="body"
                    value={ body }
                    error={ !!bodyValid /* && formSubmitted */ }
                    helperText={ bodyValid }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button onClick={ onDelete } sx={{ mt: 2 }} color='error' disabled={ isSaving }>
                    <DeleteOutline />Borrar
                </Button>
            </Grid>

            <ImageGallery images={ activeNote.imageUrls } />

        </Grid>

    )
}