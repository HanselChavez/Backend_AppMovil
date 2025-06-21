import { pool } from "../db/db.js";

class ResenaService {
    static async getAll() {
        const { rows } = await pool.query(`
      SELECT r.*, u.nombres AS paciente_nombre, u.apellidos AS paciente_apellidos
      FROM Reseñas r
      JOIN Citas c ON r.cita_id = c.id
      JOIN Usuarios u ON c.usuario_id = u.id
    `);
        return rows;
    }

    static async getByDoctorId(doctorId) {
        const { rows } = await pool.query(
            `
      SELECT r.*, u.nombres AS paciente_nombre, u.apellidos AS paciente_apellidos
      FROM Reseñas r
      JOIN Citas c ON r.cita_id = c.id
      JOIN Usuarios u ON c.usuario_id = u.id
      WHERE c.doctor_id = $1
    `,
            [doctorId]
        );
        return rows;
    }

    static async getByPacienteId(pacienteId) {
        const { rows } = await pool.query(
            `
      SELECT r.*, c.doctor_id
      FROM Reseñas r
      JOIN Citas c ON r.cita_id = c.id
      WHERE c.usuario_id = $1
    `,
            [pacienteId]
        );
        return rows;
    }

    static async crear({ cita_id, calificacion, comentario }) {
        const { rows } = await pool.query(
            `
      INSERT INTO Reseñas (cita_id, calificacion, comentario)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
            [cita_id, calificacion, comentario]
        );
        return rows[0];
    }
}

export default ResenaService;
