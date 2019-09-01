// Importação de dependências
const express       = require('express');
const nunjucks      = require('nunjucks');
const fs            = require('fs');
const app           = express();

// Importação das rotas do projeto
const indexRouter   = require('./app/controllers/index');
const sitemapRouter = require('./app/controllers/sitemap');

// Configuração da Template engine
let env = nunjucks.configure('app/views', {
    autoescape: true,
    express: app,
    watch: true
});

// Configurações globais
app.all('*', (req, _res, next) => {
    env.addGlobal('URL_BASE', process.env.SITE_URL);
    env.addGlobal('PUBLIC_URL', process.env.PUBLIC_URL);
    env.addGlobal('URL_PATH', req.path);
    env.addGlobal('IS_AMP', req.path.includes('/amp'));
    if (process.env.IS_OFFLINE) {
        env.addGlobal('CSS_AMP', fs.readFileSync('dist/service/app/public/css/style-amp.css', 'utf8'));
    } else {
        env.addGlobal('CSS_AMP', fs.readFileSync('app/public/css/style-amp.css', 'utf8'));
    }
    next();
});

// Atribuição das rotas
app.use('/', indexRouter);
app.use('/', sitemapRouter);

// Rotas de exceção
app.use((req, res) => {
    res.status(404).render('404.html', { path: req.path });
});

// Exporta o app para o handler
module.exports = app;