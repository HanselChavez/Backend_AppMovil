import jwt from "jsonwebtoken";
import Usuario from "../models/usuarioModel.js";
import Rol from "../models/rolModel.js";
import { supabase } from "../config/supabaseClient.js";
import fs from "fs";
import { formatearFecha } from "../config/formatDate.js";
export const login = async (req, res) => {
  const { correo, clave } = req.body;

  if (!correo || !clave) {
    return res.status(400).json({ error: "Correo y contraseña son requeridos" });
  }

  try {
    const user = await Usuario.findUserByEmail(correo);
    if (!user) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    const isMatch = await Usuario.comparePassword(clave, user.clave);
    if (!isMatch) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    const rolNombre = await Rol.findRoleById(user.rol_id);

    const token = jwt.sign(
      { userId: user.id, rol: rolNombre },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      auth_token: token,
      user_id: user.id,
      user_role: rolNombre,
      user_name: `${user.nombres} ${user.apellidos}`,
      user_email: user.correo,
      user_photo: user.foto_perfil || null,
      is_logged_in: true
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const register = async (req, res) => {
    const {
        dni,
        nombres,
        apellidos,
        correo,
        clave,
        telefono,
        direccion,
        fechaNacimiento,
        sexo,
    } = req.body;
    const file = req.file;
    if (!correo || !clave) {
        return res
            .status(400)
            .json({ error: "Correo y contraseña son requeridos" });
    }
    try {
        const user = await Usuario.findUserByEmail(correo);
        if (user) {
            return res
                .status(401)
                .json({ error: "Este correo ya esta en uso." });
        }
        let imagenUrl = null;
        if (file) {
            const fileBuffer = fs.readFileSync(file.path);

            const { data, error } = await supabase.storage
                .from("avatars")
                .upload(`usuarios/${apellidos.trim() + dni}`, fileBuffer, {
                    contentType: file.mimetype,
                    upsert: true,
                });
            fs.unlinkSync(file.path);

            if (error) return res.status(500).json({ error: error.message });

            const { data: urlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(`usuarios/${apellidos.trim() + dni}`);

            imagenUrl = urlData.publicUrl;
        }

        const userNuevo = await Usuario.createUsuario({
            dni,
            nombres,
            apellidos,
            correo,
            clave,
            telefono,
            direccion,
            fechaNacimiento: formatearFecha(fechaNacimiento),
            sexo,
            foto_perfil: imagenUrl,
            rol_id: 3,
        });
        res.json(userNuevo);
    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
