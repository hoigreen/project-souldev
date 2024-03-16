const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl({
  experimental: {
    optimizePackageImports: [
      '@codefixlabs/hooks',
      '@codefixlabs/lib',
      '@codefixlabs/ui',
    ],
  },
});
