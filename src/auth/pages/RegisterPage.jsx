import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { loginStatusTypes } from '../../types';

const formData = {
    displayName: '',
    email: '',
    password: ''
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe tener una @.'],
    password: [ (value) => value.length >= 6, 'El password debe mínimo 6 caracteres.'],
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === loginStatusTypes.Checking, [status]);

    const { displayName, email, password, displayNameValid, emailValid, passwordValid, isFormValid,
        onInputChange, formState } = useForm(formData, formValidations);

    
    const onSubmit = ( event ) => {
        event.preventDefault();

        setFormSubmitted(true);

        if( !isFormValid ) return;

        dispatch ( startCreatingUserWithEmailPassword(formState) );
    }

    return (
        <AuthLayout title='Crear cuenta'>
            <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Nombre completo" type="text" 
                        placeholder="Fulanito De Tal"
                        fullWidth
                        name='displayName' 
                        value={ displayName }
                        onChange={ onInputChange }
                        //error={ displayNameValid ? true : false }
                        error={ !!displayNameValid && formSubmitted }
                        helperText={ displayNameValid }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Correo" type="email" 
                        placeholder="correo@dominio.com"
                        fullWidth
                        name='email' 
                        value={ email }
                        onChange={ onInputChange }
                        error={ !!emailValid && formSubmitted }
                        helperText={ emailValid }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Contraseña" type="password" 
                        placeholder="contraseña"
                        fullWidth
                        name='password' 
                        value={ password }
                        onChange={ onInputChange }
                        error={ !!passwordValid && formSubmitted}
                        helperText={ passwordValid }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={ 2 } sx={{ mb:2, mt: 1}}>

                    <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                        <Alert severity='error'>{ errorMessage }</Alert>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Button disabled={ isCheckingAuthentication } type='submit' variant="contained" fullWidth>
                            Crear cuenta
                        </Button>
                    </Grid>

                    <Grid container direction='row' justifyContent='end' sx={{ mt: 1 }}>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={ RouterLink } color='inherit' to='/auth/login'>
                            ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
