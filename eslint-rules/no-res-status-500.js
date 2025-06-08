export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Prohibit the direct usage of res.status(500) and suggest logErrorWithResponse',
      category: 'Best Practices',
    },
    schema: [],
    messages: {
      noResStatus500:
        'Direct usage of res.status(500) is not allowed. Use logErrorWithResponse instead.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.object &&
          node.callee.object.name === 'res' &&
          node.callee.property.name === 'status'
        ) {
          const argument = node.arguments[0];
          if (argument && argument.value === 500) {
            context.report({
              node,
              messageId: 'noResStatus500',
            });
          }
        }
      },
    };
  },
};
