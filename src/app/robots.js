export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/sg-superadmin/'],
        },
        sitemap: 'https://sellgrow.io/sitemap.xml',
    };
}
