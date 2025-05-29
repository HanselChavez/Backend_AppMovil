import { pool } from "../db/db.js";
import bcrypt from "bcrypt";

export default class Usuario {
    static getAllUsuarios = async () => {
        const result = await pool.query("SELECT * FROM Usuarios");
        return result.rows;
    };
    static createUsuario = async ({
        nombre,
        apellido,
        correo,
        contrasena,
        telefono,
        foto_perfil,
        rol_id,
    }) => {
        const saltRounds = 10;
        console.log("CONTRASEÑA:", contrasena, saltRounds);
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        const result = await pool.query(
            "INSERT INTO Usuarios (nombre, apellido, correo, contraseña,telefono,foto_perfil,rol_id) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *",
            [
                nombre,
                apellido,
                correo,
                hashedPassword,
                telefono,
                foto_perfil,
                rol_id,
            ]
        );
        return result.rows[0];
    };
    static getUsuarioById = async (id) => {
        const result = await pool.query(
            "SELECT * FROM Usuarios WHERE id = $1",
            [id]
        );
        return result.rows[0];
    };
    static updateUsuario = async (
        id,
        { nombre, apellido, correo, contraseña, telefono, foto_perfil, rol_id }
    ) => {
        const result = await pool.query(
            "UPDATE Usuarios SET nombre = $1, apellido = $2 WHERE id = $3 RETURNING *",
            [nombre, apellido, id]
        );
        return result.rows[0];
    };
    static deleteUsuario = async (id) => {
        await pool.query("DELETE FROM Usuarios WHERE id = $1", [id]);
    };
    static findUserByEmail = async (correo) => {
        const query =
            "SELECT id, correo, contraseña, rol_id FROM Usuarios WHERE correo = $1";
        const { rows } = await pool.query(query, [correo]);
        return rows[0] || null;
    };

    static comparePassword = async (plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    };
}
