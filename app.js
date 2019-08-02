'use strict';

const express       = require('express');
const cors          = require('cors');
const nunjucks      = require('nunjucks');
const consign       = require('consign');

const app = express();

app.use(cors());

let env = nunjucks.configure('app/views', {
    autoescape: true,
    express: app,
    watch: true
});

app.all('*', (req, _res, next) => {
    env.addGlobal('URL_BASE', process.env.SITE_URL);
    env.addGlobal('URL_PATH', req.path);
    env.addGlobal('IS_AMP', req.path.includes('/amp'));
    next();
});

consign()
    .include('app/controllers')
    .into(app);

app.use((req, res) => {
    res.status(404).render('404.html', { path: req.path });
});

module.exports = app;
