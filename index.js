module.exports = function(babel) {
  const { types: t } = babel;
  return {
    name: "babel-plugin-expo-vector-icon-storybook",
    visitor: {
      ImportDeclaration({ node, parent }) {
        if (
          node.source.type !== "StringLiteral" ||
          !node.source.value.includes("@expo/vector-icons")
        ) {
          return;
        }
        const index = parent.body.indexOf(node);
        const importDeclarations = node.specifiers.map(({ imported }) => {
          const specifier = t.ImportDefaultSpecifier(imported);
          return t.ImportDeclaration([specifier], {
            ...node.source,
            value: "react-native-vector-icons" + imported.name
          });
        });
        parent.body.splice(index, 1, ...importDeclarations);
      }
    }
  };
};
