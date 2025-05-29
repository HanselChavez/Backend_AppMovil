import { pool } from "../db/db.js";
export default class Doctor {
    static getAllDoctores = async () => {
        const result = await pool.query("SELECT * FROM Doctores");
        return result.rows;
    };

    static createDoctor = async ({
        usuario_id,
        especialidad_id,
        descripcion,
    }) => {
        const result = await pool.query(
            "INSERT INTO Doctores (usuario_id, especialidad_id, descripcion) VALUES ($1, $2, $3) RETURNING *",
            [usuario_id, especialidad_id, descripcion]
        );
        return result.rows[0];
    };
}
