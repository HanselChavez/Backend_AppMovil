import { pool } from "../db/db.js";

export default class Sede {
    static async getAll() {
        const result = await pool.query("SELECT * FROM Sedes ORDER BY id");
        return result.rows;
    }

    static async create({ nombre, direccion }) {
        const result = await pool.query(
            "INSERT INTO Sedes (nombre, direccion) VALUES ($1, $2) RETURNING *",
            [nombre, direccion]
        );
        return result.rows[0];
    }
}