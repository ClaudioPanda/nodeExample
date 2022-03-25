const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeProductoPorID, existeCategoriaPorID } = require('../helpers/db-validators');


const router = Router();

//obetener todas las productos / publico
router.get('/', obtenerProductos);

//obetener una producto por ID / publico
router.get('/:id',
    [
        check('id', 'No es un id de Mongo').isMongoId(),
        check('id').custom(existeProductoPorID),
        validarCampos
    ], obtenerProducto)

//Crear una producto por ID / privado
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], crearProducto)

//Actualizar una producto por ID / privado
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorID),
    check('id', 'No es un ID Mongo').isMongoId(),
    validarCampos
], actualizarProducto)

//Borrar una producto por ID / privado
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de Mongo').isMongoId(),
        check('id').custom(existeProductoPorID),
        validarCampos
    ], eliminarProducto)

module.exports = router;