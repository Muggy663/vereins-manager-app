/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Diese Warnungen ignorieren, da sie von Next.js/Webpack auf Windows stammen
    // und harmlos sind. Sie betreffen die Pfadauflösung (C: vs c:).
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Resolving dependencies for build dependencies doesn't lead to an expected result/,
    ];

    return config;
  },
};

module.exports = nextConfig;