/* eslint-disable no-undef */
// next.config.js
const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withSass({
  /* config options here */
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  sassLoaderOptions: {
    includePaths: ['./scss'],
    data: ' @import "style/global.scss"; @import "style/_var.scss";',
    sourceMap: true,
  },
});
