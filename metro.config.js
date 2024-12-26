const { getDefaultConfig } = require('expo/metro-config');

// Get the default configuration from Expo
const defaultConfig = getDefaultConfig(__dirname);

// Add `.glb` to the list of asset extensions
defaultConfig.resolver.assetExts.push('glb');

// Export the modified configuration
module.exports = defaultConfig;
