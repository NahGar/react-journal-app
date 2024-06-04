import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startSignInWidthEmailAndPassword } from '../../store/auth';
import { loginStatusTypes } from '../../types';

const initialForm = {
    email: '',
    password: ''
}

export const LoginPage = () => {
    
    const { status, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm(initialForm);

    const isAuthenticating = useMemo( () => status === loginStatusTypes.Checking, [status]);

    const onSubmit = async ( event ) => {
        event.preventDefault();
        
        dispatch( startSignInWidthEmailAndPassword({ email, password }) );
    }

    const onGoogleSigIn = () => {
        
        dispatch( startGoogleSignIn() );
    }

    return (
        <AuthLayout title='Login'>

            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Correo" type="email" 
                        placeholder="correo@dominio.com"
                        fullWidth 
                        name='email' 
                        value={ email}
                        onChange={ onInputChange }
                        InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Contraseña" type="password" 
                        placeholder="contraseña"
                        fullWidth 
                        name="password"
                        value={ password }
                        onChange={ onInputChange }
                        InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={ 2 } sx={{ mb:2, mt: 1}}>

                    <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                        <Alert severity='error'>{ errorMessage }</Alert>
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <Button disabled={isAuthenticating} type='submit' variant="contained" fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <Button disabled={isAuthenticating} onClick={ onGoogleSigIn } variant="contained" fullWidth>
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>

                    <Grid container direction='row' justifyContent='end' sx={{ mt: 1 }}>
                        <Link component={ RouterLink } color='inherit' to='/auth/register'>
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
