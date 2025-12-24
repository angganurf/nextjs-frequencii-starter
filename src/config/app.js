/**
 * Application configuration
 * Simple template config following bulletproof-react principles
 */
export const appConfig = {
  name: 'Frequencii',
  description: 'Modern web template for digital solutions',
  version: '1.0.0',

  // Social media links
  social: {
    twitter: 'https://twitter.com/frequencii',
    linkedin: 'https://linkedin.com/company/frequencii',
    github: 'https://github.com/frequencii',
  },

  // Contact information
  contact: {
    email: 'support@frequencii.com',
    phone: '1-800-FREQ-APP',
  },

  // Navigation items
  navigation: {
    main: [
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
    logoAlt: 'Frequencii logo',
    favicon: '/favicon.png',
  },
};

export default appConfig;