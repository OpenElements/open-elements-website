module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === "next" && pkg.dependencies && pkg.dependencies.postcss) {
        pkg.dependencies.postcss = "8.5.12";
      }
      return pkg;
    },
  },
};
