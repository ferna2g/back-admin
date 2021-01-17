const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

//Crea una nueva tarea
exports.crearTarea = async (req, res) => {

  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array() })
  }

  //extraer el proyecto y comprobar is existe
  const { proyecto } = req.body;

  try {

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    //Revisar si el proyecto acutal pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id ) {
        return res.status(401).json({msg: 'No autorizado'});
    }

    //creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });

  } catch (e) {
    console.log(e);
    res.status(500).send('Hubo un error')
  }
}

//obtiene las tareas por proeyecto
exports.obtenerTareas = async (req, res) => {

  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    //Revisar si el proyecto acutal pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id ) {
        return res.status(401).json({msg: 'No autorizado'});
    }

    //obtener tareas por proyecto
    const tareas = await Tarea.find({ proyecto  });
    res.json(tareas)

  } catch (e) {
    console.log(e);
    res.status(500).send('Hubo un error')
  }
}
