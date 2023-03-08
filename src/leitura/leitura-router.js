const express = require('express');
const router = express.Router();
const LeituraController = require('./leitura-controller');

router.post("/", LeituraController.salvarLeitura);
router.get("/", LeituraController.obterLeituras);

module.exports = router;