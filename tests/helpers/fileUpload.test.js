import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dzxkeidxx',
    api_key: '591147753968845',
    api_secret: 'vz1CjGgNp6G3vKtfrBUzMiuUCtY',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe subir el archivo correctamente a cloudinary', async () => {
        
        const imageURL = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';

        const resp = await fetch( imageURL );

        const blob = await resp.blob();

        const file = new File([blob], 'imagen.png');

        const url = await fileUpload( file );

        expect( typeof url ).toBe("string");

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1].replace('.png','');

        await cloudinary.api.delete_resources([ imageId ]);
    });

    test('debe retornar null', async () => {
        
        const file = new File([], 'imagen.png');

        const url = await fileUpload( file );

        expect( url ).toBe( null );
    });
});