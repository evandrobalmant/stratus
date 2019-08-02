'use strict';

const express       = require('express');
const cors          = require('cors');
const nunjucks      = require('nunjucks');
const consign       = require('consign');

const app = express();

app.use(cors());

var env = nunjucks.configure('app/views', {
    autoescape: true,
    express: app,
    watch: true
});

env.addGlobal('URL_BASE', process.env.SITE_URL);
// env.addGlobal('URL_PATH', req.path);

consign()
    .include('app/controllers')
    .into(app);

app.use((req, res) => {
    res.status(404).render('404.html', { path: req.path });
});

module.exports = app;
