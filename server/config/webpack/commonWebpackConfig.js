// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require('shakapacker');
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const baseClientWebpackConfig = generateWebpackConfig({
  plugins: [new ForkTSCheckerWebpackPlugin()],
});

const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
  },
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseClientWebpackConfig, commonOptions);

module.exports = commonWebpackConfig;
