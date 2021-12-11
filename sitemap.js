module.exports = {
    siteUrl: process.env.NEXTAUTH_URL,
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/dynamic-sitemap.xml', '/account/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/'
            }
        ],
        additionalSitemaps: [
            process.env.NEXTAUTH_URL + '/dynamic-sitemap.xml'
        ]
    }
}