const Leitura = require('./leitura-model');
const moment = require('moment');

module.exports.salvarLeitura = async (req, res, next) => {
    try {
        let leitura = new Leitura(req.body);
        leitura = await leitura.save();
        res.status(200).send(leitura);
    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

module.exports.obterLeituras = async (req, res, next) => {
    try {
        let dtIni = moment(new Date()).subtract(1, 'Days').utc();
        let dtFim = moment(new Date()).utc();

        if (req.query.dataInicio != '' && req.query.dataFim != '' && req.query.dataInicio != undefined && req.query.dataFim != undefined) {
            dtIni = moment(req.query.dataInicio).utc();
            dtFim = moment(req.query.dataFim).utc();
        }

        const leituras = await Leitura
            .find({ data: { $gte: dtIni, $lte: dtFim } })
            .select('-_id temperatura umidade data')
            .sort('data');

        const temperaturaMaxima = Math.max(...leituras.map(f => f.temperatura));
        const umidadeMaxima = Math.max(...leituras.map(f => f.umidade));

        const temperaturaMinima = Math.min(...leituras.map(f => f.temperatura));
        const umidadeMinima = Math.min(...leituras.map(f => f.umidade));

        res.status(200).send({
            temperatura: {
                maxima: temperaturaMaxima,
                minima: temperaturaMinima
            },
            umidade: {
                maxima: umidadeMaxima,
                minima: umidadeMinima
            },
            leituras: leituras
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}