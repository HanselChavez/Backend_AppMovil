import { pool } from "../db/db.js";
class Historial {
    static async getAll() {
        const { rows } = await pool.query(`
      SELECT h.*, p.nombres AS paciente_nombre, p.apellidos AS paciente_apellido,
             d.id AS doctor_id, u.nombres AS doctor_nombre, u.apellidos AS doctor_apellido
      FROM HistorialClinico h
      JOIN Usuarios p ON h.paciente_id = p.id
      JOIN Doctores d ON h.doctor_id = d.id
      JOIN Usuarios u ON d.usuario_id = u.id
      ORDER BY h.fecha DESC
    `);
        return rows;
    }

    static async getByPaciente(pacienteId) {
        const { rows } = await pool.query(
            `
      SELECT h.*, d.id AS doctor_id, u.nombres AS doctor_nombre, u.apellidos AS doctor_apellido
      FROM HistorialClinico h
      JOIN Doctores d ON h.doctor_id = d.id
      JOIN Usuarios u ON d.usuario_id = u.id
      WHERE h.paciente_id = $1
      ORDER BY h.fecha DESC
    `,
            [pacienteId]
        );
        return rows;
    }

    static async getByDoctor(doctorId) {
        const { rows } = await pool.query(
            `
      SELECT h.*, p.nombres AS paciente_nombre, p.apellidos AS paciente_apellido
      FROM HistorialClinico h
      JOIN Usuarios p ON h.paciente_id = p.id
      WHERE h.doctor_id = $1
      ORDER BY h.fecha DESC
    `,
            [doctorId]
        );
        return rows;
    }

    static async crear({
        paciente_id,
        doctor_id,
        cita_id,
        diagnostico,
        tratamiento,
        recomendaciones,
    }) {
        const { rows } = await pool.query(
            `
      INSERT INTO HistorialClinico (paciente_id, doctor_id, cita_id, diagnostico, tratamiento, recomendaciones)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
            [
                paciente_id,
                doctor_id,
                cita_id,
                diagnostico,
                tratamiento,
                recomendaciones,
            ]
        );
        return rows[0];
    }
}

export default Historial;
