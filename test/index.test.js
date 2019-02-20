const path = require("path");
const babel = require("@babel/core");

const pluginPath = path.resolve(__dirname, "..");

it("transforms @expo/vector-icons to react-native-vector-icons", () => {
  const code_before = 'import { MaterialIcon } from "@expo/vector-icons"';
  const code_after =
    'import MaterialIcon from "react-native-vector-icons/dist/MaterialIcon"';

  const actual = babel.transform(code_before, {
    plugins: [pluginPath]
  }).code;

  const expected = babel.transform(code_after).code;

  expect(actual).toBe(expected);
});

it("transforms multiple imports", () => {
  const code_before =
    'import { MaterialIcon, Ionicon } from "@expo/vector-icons"';
  const code_after =
    'import MaterialIcon from "react-native-vector-icons/dist/MaterialIcon";import Ionicon from "react-native-vector-icons/dist/Ionicon"';

  const actual = babel.transform(code_before, {
    plugins: [pluginPath]
  }).code;

  const expected = babel.transform(code_after).code;

  expect(actual).toBe(expected);
});
