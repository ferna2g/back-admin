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

router.get('/',
  auth,
  proyectoController.obtenerProyectos
)

module.exports = router;
