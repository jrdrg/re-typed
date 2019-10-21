import bucklescript from "rollup-plugin-bucklescript";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/Demo.re",
  output: {
    compact: true,
    file: "dist/main.js",
    format: "cjs"
  },
  plugins: [bucklescript(), uglify()]
};
