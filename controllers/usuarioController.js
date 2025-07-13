import Usuario from "../models/usuarioModel.js";

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAllUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al crear usuario" });
    }
};

export const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.getUsuarioById(req.params.id);

        if (!usuario)
            return res.status(404).json({ mensaje: "Usuario no encontrado" });

        if (!usuario.foto_perfil || usuario.foto_perfil.trim() === "Sin imagen") {
            const randomNum = Math.floor(Math.random() * 9); 
            usuario.foto_perfil = `https://randomuser.me/api/portraits/lego/${randomNum}.jpg`;
        }

        res.json(usuario);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener usuario" });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.updateUsuario(req.params.id, req.body);
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al actualizar usuario" });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        await Usuario.deleteUsuario(req.params.id);
        res.json({ mensaje: "Usuario eliminado" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al eliminar usuario" });
    }
};
