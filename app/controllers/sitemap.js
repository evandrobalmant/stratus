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
            url: `${process.env.SITE_URL}`,
            changefreq: 'daily',
            priority: 0.8
        });
        sm.add({
            url: `${process.env.SITE_URL}/foo`,
            changefreq: 'weekly',
            priority: 0.5
        });
        sm.add({
            url: `${process.env.SITE_URL}/bar`,
            changefreq: 'monthly',
            priority: 0.3
        });

        res.header('Content-Type', 'application/xml');
        res.send(sm.toString());
    });

};
