import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const [ formValidation, setFormValidation ] = useState({});

    useEffect( () => {

        createValidators();

    }, [formState])

    const isFormValid = useMemo( () => {
        
        //la primera vez se llama con formValidation = {}
        //if( Object.keys( formValidation ).length === 0) return false;

        for ( const formValue of Object.keys( formValidation )) {
            
            if( formValidation[formValue] !== null ) {
                return false;
            }
        }
        return true;

    },[formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for ( const formField of Object.keys( formValidations )) {

            const [ fn, errorMessage ] = formValidations[ formField ];

            //se crea una propiedad por ejemplo displayNameValid y ejecuta la función pasando el valor
            //obtenido del formState
            formCheckedValues[`${ formField }Valid`] = fn( formState[ formField ] ) ? null : errorMessage;

        }
        setFormValidation( formCheckedValues );
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}