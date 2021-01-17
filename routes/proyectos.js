const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')

//crea proyectos
// api/proyectos
router.post('/',
  auth,
  [
    check('nombre', 'el nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.crearProyecto
);

//obtener todos los proyectos
router.get('/',
  auth,
  proyectoController.obtenerProyectos
)

//actualizar proyectos via ID
router.put('/:id',
  auth,
  [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.actualizarProyecto
  )

module.exports = router;
