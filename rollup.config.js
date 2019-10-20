import bucklescript from "rollup-plugin-bucklescript";

export default {
  input: "src/Demo.re",
  output: {
    file: "dist/main.js",
    format: "cjs"
  },
  plugins: [bucklescript()]
};
