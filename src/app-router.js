const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        title: 'UMIDADE API',
        version: '1.0.0',
    });
});

module.exports = router;