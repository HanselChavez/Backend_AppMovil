import { pool } from "../db/db.js";

export default class Cita {
    static async updateEstadoCita(id, estado) {
        const query = `UPDATE Citas SET estado = $1 WHERE id = $2 RETURNING *`;
        const result = await pool.query(query, [estado, id]);
        return result.rows[0];
    }
    static async addCita({
        usuario_id,
        doctor_id,
        servicio_id,
        fecha,
        sede_id,
        hora,
        nota,
    }) {
        const query = `
            INSERT INTO Citas (usuario_id, doctor_id,sede_id, servicio_id, fecha, hora, nota)
            VALUES ($1, $2, $3, $4, $5, $6,$7)
            RETURNING id
        `;
        const values = [
            usuario_id,
            doctor_id,
            sede_id,
            servicio_id,
            fecha,
            hora,
            nota,
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    static async getCitasPorDoctor(doctorId, fechaInicio, fechaFin) {
        let query = `
            SELECT c.*, u.nombres AS paciente_nombre, u.apellidos AS paciente_apellidos
            FROM Citas c
            INNER JOIN Usuarios u ON c.usuario_id = u.id
            WHERE c.doctor_id = $1`;

        const params = [doctorId];
        if (fechaInicio && fechaFin) {
            query += " AND c.fecha BETWEEN $2 AND $3";
            params.push(fechaInicio, fechaFin);
        }

        const result = await pool.query(query, params);
        return result.rows;
    }
    static async getCitasPorPaciente(pacienteId) {
        const query = `
        SELECT c.*, 
             d.id AS doctor_id, 
             u.nombres AS doctor_nombre, 
             u.apellidos AS doctor_apellido
        FROM Citas c
        INNER JOIN Doctores d ON c.doctor_id = d.id
        INNER JOIN Usuarios u ON d.usuario_id = u.id
        WHERE c.usuario_id = $1
        ORDER BY c.fecha DESC, c.hora DESC;
    `;
        const { rows } = await pool.query(query, [pacienteId]);
        return rows;
    }
    static async getCitas() {
        const query = `
        SELECT *
        FROM Citas ;
    `;
        const { rows } = await pool.query(query);
        return rows;
    }
}
