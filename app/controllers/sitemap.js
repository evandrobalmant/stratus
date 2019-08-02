'use strict';

const sitemap = require('sitemap');

module.exports = app => {

    app.get('/sitemap.xml', (req, res) => {

        let sitemaps_urls = [
            `${process.env.SITE_URL}/sitemap-posts.xml`
        ];

        let smi = sitemap.buildSitemapIndex({
            urls: sitemaps_urls
        });

        res.header('Content-Type', 'application/xml');
        res.send(smi.toString());
    });

    app.get('/sitemap-posts.xml', (req, res) => {

        let sm = sitemap.createSitemap({
            hostname: `${process.env.SITE_URL}/`
        });

        sm.add({
            url: `${process.env.SITE_URL}/`,
            changefreq: 'monthly',
            priority: 0.6
        });

        res.header('Content-Type', 'application/xml');
        res.send(sm.toString());
    });

};
