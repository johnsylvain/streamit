export default (config, env, helpers) => {
  let babel = helpers.getLoadersByName(config, 'babel-loader')[0].rule.options;
  let uglify = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
  let html = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0].plugin
    .options;

  html.template = require('html-webpack-template');
  html.googleAnalytics = {
    trackingId: 'UA-60696638-6',
    pageViewOnLoad: true
  };
  html.meta = [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ];

  babel.presets[0][1].exclude.push(
    'transform-async-to-generator',
    'transform-regenerator'
  );

  babel.plugins.push([
    'fast-async',
    {
      env: {
        log: true
      },
      compiler: {
        promises: true,
        noRuntime: true
      }
    }
  ]);

  if (uglify) {
    config.plugins.splice(uglify.index, 1);
  }
};
