import Usuario from "../models/usuarioModel.js";
import { supabase } from "../config/supabaseClient.js";
import fs from "fs";
const formatearFechaIso = (fechaIso) => {
    const fecha = new Date(fechaIso);
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAllUsuarios();
        res.json(usuarios);
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        console.error("Error al crear usuario:", err);
        res.status(500).json({ mensaje: "Error al crear usuario" });
    }
};

export const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.getUsuarioById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        if (usuario.fechanacimiento) {
            usuario.fechanacimiento = formatearFechaIso(
                usuario.fechanacimiento
            );
        }

        if (
            !usuario.foto_perfil ||
            usuario.foto_perfil.trim() === "Sin imagen"
        ) {
            const randomNum = Math.floor(Math.random() * 9);
            usuario.foto_perfil = `https://randomuser.me/api/portraits/lego/${randomNum}.jpg`;
        }

        res.json(usuario);
    } catch (err) {
        console.error("Error al obtener usuario:", err);
        res.status(500).json({ mensaje: "Error al obtener usuario" });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        console.log("DATOS RECIBIDOS:", req.body);

        const file = req.file;
        const { clave, ...userDataSinClave } = req.body;

        // Validar y normalizar sexo
        if (userDataSinClave.sexo) {
            const sexo = userDataSinClave.sexo.toLowerCase();
            if (sexo === "masculino") {
                userDataSinClave.sexo = "M";
            } else if (sexo === "femenino") {
                userDataSinClave.sexo = "F";
            } else {
                return res.status(400).json({
                    mensaje: "Sexo inválido, debe ser 'Masculino' o 'Femenino'",
                });
            }
        }

        if (file) {
            const fileBuffer = fs.readFileSync(file.path);
            const nombreArchivo = `usuarios/${
                userDataSinClave.apellidos.trim() + userDataSinClave.dni
            }`;
            console.log(nombreArchivo)
            console.log("RES",await supabase.storage.from("avatars").remove([nombreArchivo]));

            const { data, error } = await supabase.storage
                .from("avatars")
                .upload(nombreArchivo, fileBuffer, {
                    contentType: file.mimetype,
                    upsert: true, 
                });

            fs.unlinkSync(file.path); 

            if (error) {
                console.error("Error al subir imagen:", error.message);
                return res.status(500).json({ error: error.message });
            }

            const { data: urlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(nombreArchivo);

            userDataSinClave.foto_perfil = urlData.publicUrl;
        }

        const usuario = await Usuario.updateUsuario(
            req.params.id,
            userDataSinClave
        );

        console.log("USUARIO ACTUALIZADO:", usuario);
        res.json(usuario);
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ mensaje: "Error al actualizar usuario" });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        await Usuario.deleteUsuario(req.params.id);
        res.json({ mensaje: "Usuario eliminado" });
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ mensaje: "Error al eliminar usuario" });
    }
};
