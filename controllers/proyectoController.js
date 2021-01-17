const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {

  //validar si hay errores
  const errores = validationResult(req);
  if ( !errores.isEmpty() ) {
    return res.status(400).json({errores: errores.array() })
  }

  try {
      //crear un nuevo proyecto
      const proyecto = new Proyecto(req.body);

      //guardar el creador via JWT
      proyecto.creador = req.usuario.id

      //guardamos el proyecto
      proyecto.save();
      res.json(proyecto);

  } catch (e) {
    console.log(e);
    res.status(500).send('Hubo un error');
  }
}
