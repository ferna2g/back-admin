const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) => {
  try {
      //crear un nuevo proyecto
      const proyecto = new Proyecto(req.body);
      proyecto.save();
      res.json(proyecto);

  } catch (e) {
    console.log(e);
    res.status(500).send('Hubo un error');
  }
}
