import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sellgrow.co';
  
  const publicRoutes = [
    '',
    '/about',
    '/pricing',
    '/contact',
    '/services',
    '/products',
    '/register',
    '/login',
    '/faq',
    '/testimonials',
    '/terms',
    '/privacy-policy',
    '/documentation',
    '/knowledge-base',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/pricing') || route.startsWith('/services') ? 0.9 : 0.7,
  }));
}
