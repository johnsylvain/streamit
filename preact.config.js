export default (config, env, helpers) => {
  let babel = helpers.getLoadersByName(config, 'babel-loader')[0].rule.options;
  let uglify = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];

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
