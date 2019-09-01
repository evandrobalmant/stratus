const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).render('index.html', {
        message: 'Index'
    });
});

router.get('/foo', (_req, res) => {
    res.status(200).send({message: 'Foo'});
});

router.get('/bar', (_req, res) => {
    res.status(200).send({message: 'Bar'});
});

module.exports = router;