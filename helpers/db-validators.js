const categoria = require('../models/categoria');
const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async (role = '') => {

    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El role ${role} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}


const existeUsuarioPorId = async (id) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}
const existeCategoriaPorID = async (id) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}
const existeProductoPorID = async (id) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Validar colecciones permitidas
 */

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no está permitida, ${colecciones}`);
    }
    return true;

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
}

