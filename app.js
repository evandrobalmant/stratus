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


consign()
    .include('app/controllers')
    .into(app);

module.exports = app;
