import { pool } from "../db/db.js";

export default class Rol {
    static getAllRoles = async () => {
        const result = await pool.query("SELECT * FROM Roles");
        return result.rows;
    };
    static createRol = async ({ nombre }) => {
        const result = await pool.query(
            "INSERT INTO Roles (nombre) VALUES ($1) RETURNING *",
            [nombre]
        );
        return result.rows[0];
    };
    static getRolById = async (id) => {
        const result = await pool.query("SELECT * FROM Roles WHERE id = $1", [
            id,
        ]);
        return result.rows[0];
    };
    static updateRol = async (id, { nombre }) => {
        const result = await pool.query(
            "UPDATE Roles SET nombre = $1 WHERE id = $3 RETURNING *",
            [nombre, id]
        );
        return result.rows[0];
    };
    static deleteRol = async (id) => {
        await pool.query("DELETE FROM Roles WHERE id = $1", [id]);
    };
    static findRoleById = async (rol_id) => {
        const query = "SELECT nombre FROM Roles WHERE id = $1";
        const { rows } = await pool.query(query, [rol_id]);
        return rows[0]?.nombre || "usuario";
    };
}
