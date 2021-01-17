const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  creador: {
    //cada usuario tiene su id, como una referencia
    type: mongoose.Schema.Types.ObjectId,
    //nombre del modelo al que se ha relacionado
    ref: 'Usuario'
  },
  creado: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
