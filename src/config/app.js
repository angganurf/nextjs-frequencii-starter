/**
 * Application configuration
 * Simple template config following bulletproof-react principles
 */
export const appConfig = {
  name: 'Editin Foto',
  description: 'Modern web template for digital solutions',
  version: '1.0.0',

  // Social media links
  social: {
    twitter: 'https://twitter.com/editinfoto',
    linkedin: 'https://linkedin.com/company/editinfoto',
    github: 'https://github.com/editinfoto',
  },

  // Contact information
  contact: {
    email: 'support@editinfoto.site',
    phone: '1-800-EDITINFOTO',
  },

  // Navigation items
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    auth: [
      { name: 'Login', href: '/login' },
      { name: 'Get Started', href: '/register' },
    ],
  },

  // Branding
  branding: {
    logo: '/images/editin-logo.png',
    logoAlt: 'Editin Foto logo',
    favicon: '/favicon.png',
  },
};

export default appConfig;