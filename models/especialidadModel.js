import { pool } from "../db/db.js";


export default class Especialidad {
    static getAllEspecialidades = async () => {
        const result = await pool.query("SELECT * FROM Especialidades");
        return result.rows;
    };
/*
    static createEspecialidad = async (
            nombre,
    ) => {
        const result = await pool.query(
            "INSERT INTO Especialidades (nombre) VALUES ($1,$2) RETURNING *",
            [nombre]
        );
        return result.rows[0];
    }; */

    static createEspecialidad = async ({ nombre }) => {
    const result = await pool.query(
        "INSERT INTO Especialidades (nombre) VALUES ($1) RETURNING *",
        [nombre]
    );
    return result.rows[0];
};


    static getEspecialidadById = async (id) => {
        const result = await pool.query(
            "SELECT * FROM Especialidades WHERE id = $1",
            [id]
        );
        return result.rows[0];
    };
    static updateEspecialidad = async (
        id,
        { nombre }
    ) => {
        const result = await pool.query(
            "UPDATE Especialidades SET nombre = $1 WHERE id = $2 RETURNING *",
            [nombre, id]
        );
        return result.rows[0];
    };
    static deleteEspecialidad = async (id) => {
        await pool.query("DELETE FROM Especialidades WHERE id = $1", [id]);
    };
}