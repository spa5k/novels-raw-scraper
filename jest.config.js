module.exports = {
  transform: {
    "\\.[jt]sx?$": ["@swc-node/jest"],
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/types/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
};
