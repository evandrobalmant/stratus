'use strict';

module.exports = app => {

    app.get('/', (req, res) => {
        res.status(200).render('index.html');
    });

    app.get('/foo', (req, res) => {
        res.status(200).send({message: 'Foo'});
    });

    app.get('/bar', (req, res) => {
        res.status(200).send({message: 'Bar'});
    });

};
