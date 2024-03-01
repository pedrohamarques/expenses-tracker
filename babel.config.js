module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@screens": "./src/screens",
            "@routes": "./src/routes",
            "@constants": "./src/constants",
            "@components": "./src/components",
          },
        },
      ],
    ],
  };
};
