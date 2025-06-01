import swaggerJSDoc from "swagger-jsdoc";
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API de Usuarios",
        version: "1.0.0",
        description: "Documentación de la API con Swagger",
    },
    servers: [
        {
            url: process.env.SERVER, 
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
