const usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');


exports.crearUsuario = async (req, res) => {

  //extraer email y password
  const { email, password } = req.body;

  try {
    //revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if(usuario) {
      return res.status(400).json({ msg: 'El usuari ya existe'})
    }

    //crea el nuevo usuario
    usuario = new Usuario(req.body);

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    //mensaje de confirmacion
    res.json({ msg: 'Usuario creado correctament' })
  } catch (e) {
    console.log(e);
    res.status(400).send('Hubo un error');
  }
}
