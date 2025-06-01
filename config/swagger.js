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
            url: "http://localhost:3000", // cambia si tu API está en otro puerto o dominio
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], // aquí deben estar tus rutas documentadas
};

export const swaggerSpec = swaggerJSDoc(options);
