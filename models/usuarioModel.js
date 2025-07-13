import { pool } from "../db/db.js";
import bcrypt from "bcrypt";

export default class Usuario {
    static getAllUsuarios = async () => {
        const result = await pool.query("SELECT * FROM Usuarios");
        return result.rows;
    };
    static createUsuario = async ({
        dni,
        nombres,
        apellidos,
        correo,
        clave,
        telefono,
        direccion,
        fechaNacimiento,
        foto_perfil,
        sexo,
        rol_id,
    }) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(clave, saltRounds);
        const result = await pool.query(
            "INSERT INTO Usuarios ( dni, nombres, apellidos, correo, clave, telefono, direccion, fechanacimiento, sexo, foto_perfil, rol_id) " +
                "VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
            [
                dni,
                nombres,
                apellidos,
                correo,
                hashedPassword,
                telefono,
                direccion,
                fechaNacimiento,
                sexo,
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
        {
            nombres,
            apellidos,
            telefono,
            direccion,
            fechaNacimiento,
            sexo,
            foto_perfil,
        }
    ) => {
        const result = await pool.query(
            `UPDATE Usuarios SET 
            nombres = $1,
            apellidos = $2,
            telefono = $4,
            direccion = $5,
            fechaNacimiento = $6,
            sexo = $7,
            foto_perfil = $8
         WHERE id = $10
         RETURNING *`,
            [
                nombres,
                apellidos,
                telefono,
                direccion,
                fechaNacimiento,
                sexo,
                foto_perfil,
                id,
            ]
        );
        return result.rows[0];
    };
    static deleteUsuario = async (id) => {
        await pool.query("DELETE FROM Usuarios WHERE id = $1", [id]);
    };
    static findUserByEmail = async (correo) => {
        const query = "SELECT * FROM Usuarios WHERE correo = $1";
        const { rows } = await pool.query(query, [correo]);
        return rows[0] || null;
    };

    static comparePassword = async (plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    };
}
