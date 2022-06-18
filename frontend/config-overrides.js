module.exports = function override(config, _env) {
  // Get rid of hash for js files
  config.output.filename = '[name].js';
  config.output.chunkFilename = '[name].chunk.js';

  // Get rid of hash for css files
  const cssPlugin = config.plugins.find(element => element.constructor.name === 'MiniCssExtractPlugin');
  cssPlugin.options.filename = '[name].css';
  cssPlugin.options.chunkFilename = '[name].css';

  // Get rid of hash for media files
  /* config.module.rules[1]?.oneOf.forEach(oneOf => {
    if (!oneOf.options ||  oneOf.options.name !== 'static/media/[name].[hash:8].[ext]') {
      return;
    }
    oneOf.options.name = 'static/media/[name].[ext]';
  }); */

  return config;
};
