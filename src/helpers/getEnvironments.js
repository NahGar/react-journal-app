/*
Requiere:
jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));
en jest.setup.js
*/

export const getEnvironments = () => {

    import.meta.env;

    return {
        ...import.meta.env
    }
}