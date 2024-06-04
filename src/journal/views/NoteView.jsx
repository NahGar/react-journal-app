import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import { setActiveNote, startSaveNote } from "../../store/journal";

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

    return (
        <Grid 
            className="animate__animated animate__fadeIn"
            container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>
            <Grid item>
                <Button 
                    disabled={ isSaving }
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

            <ImageGallery />

        </Grid>

    )
}