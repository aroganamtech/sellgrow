import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/sg-superadmin/'],
    },
    sitemap: 'https://sellgrow.co/sitemap.xml',
  };
}
