const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerCategorias, crearCategoria, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorID } = require('../helpers/db-validators');


const router = Router();

//obetener todas las categorias / publico
router.get('/', obtenerCategorias);

//obetener una categoria por ID / publico
router.get('/:id',
    [
        check('id', 'No es un id de Mongo').isMongoId(),
        check('id').custom(existeCategoriaPorID),
        validarCampos
    ], obtenerCategoria)

//Crear una categoria por ID / privado
router.post('/', [validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos], crearCategoria)

//Actualizar una categoria por ID / privado
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], actualizarCategoria)

//Borrar una categoria por ID / privado
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de Mongo').isMongoId(),
        check('id').custom(existeCategoriaPorID),
        validarCampos
    ], eliminarCategoria)

module.exports = router;