const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeituraSchema = new Schema({
    temperatura: {
        type: Number,
        required: true
    },
    umidade: {
        type: Number,
        require: true
    },
    data: {
        type: Date,
        require: true
    }
});

const Leitura = mongoose.model('Leitura', LeituraSchema);

module.exports = Leitura;