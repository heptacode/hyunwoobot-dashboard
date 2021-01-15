const MangleCssClassPlugin = require("mangle-css-class-webpack-plugin");

module.exports = {
  devServer: {
    compress: true,
    disableHostCheck: true,
  },
  pwa: {
    name: "HyunwooBot Dashboard",
    themeColor: "#094A7F",
    msTileColor: "#5CBBF6",
    manifestOptions: {
      background_color: "#5CBBF6",
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js",
    },
  },
  configureWebpack: {
    plugins: [
      new MangleCssClassPlugin({
        classNameRegExp: "app-[a-z][a-zA-Z0-9_]*",
        log: true,
      }),
    ],
  },
};
