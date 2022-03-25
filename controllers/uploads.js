const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');

const cargarArchivo = async (req, res) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No hay archivos en la peticion.');
        return;
    }

    try {

        const extensionesValidas = ['txt', 'md'];
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        });

    } catch (error) {

        res.status(400).json({ msg: error });


    }

}


const actualizarImagen = async (req, res) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El usuario no existe con ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El producto no existe con ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });



    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);

};


module.exports = { cargarArchivo, actualizarImagen };