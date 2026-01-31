const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Exclude node_modules/.bin from file map watcher to avoid EACCES on Windows
// (npm bin stubs can cause permission errors when Metro's walker stats them)
config.resolver.blockList = [
  /node_modules[\\/]\.bin([/\\]|$)/,
  ...(Array.isArray(config.resolver.blockList) ? config.resolver.blockList : [config.resolver.blockList]),
].filter(Boolean);

module.exports = withNativeWind(config, { input: './global.css' });
