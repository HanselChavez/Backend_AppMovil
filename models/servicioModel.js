import { pool } from "../db/db.js";

export default class Rol {
    static async getAllServicios() {
        const result = await pool.query(
            "SELECT * FROM Servicios ORDER BY nombre ASC"
        );
        return result.rows;
    }
}
