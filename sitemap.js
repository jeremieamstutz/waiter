module.exports = {
    siteUrl: 'https://www.waiter.so',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/dynamic-sitemap.xml', '/dashboard'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/'
            }
        ],
        additionalSitemaps: [
            'https://waiter.so/dynamic-sitemap.xml'
        ]
    }
}