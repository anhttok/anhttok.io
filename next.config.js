const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.resolve.alias['@'] = __dirname;

    return config;
  },
}

module.exports = nextConfig