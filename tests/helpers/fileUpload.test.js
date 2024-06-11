import { fileUpload } from "../../src/helpers/fileUpload";

describe('Pruebas en fileUpload', () => {

    test('debe subir el archivo correctamente a cloudinary', async () => {
        
        const imageURL = '    https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';

        const resp = await fetch( imageURL );

        const blob = await resp.blob();

        const file = new File([blob], 'imagen.png');

        const url = await fileUpload( file );

        expect( typeof url ).toBe("string");
    });

    test('debe retornar null', async () => {
        
        const file = new File([], 'imagen.png');

        const url = await fileUpload( file );

        expect( url ).toBe( null );
    });
});