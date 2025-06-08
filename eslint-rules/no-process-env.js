export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prohibit direct usage of process.env',
      category: 'Best Practices',
    },
    schema: [],
    messages: {
      noProcessEnv:
        'Direct usage of process.env is not allowed. Use the environment module instead.',
    },
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (node.object.name === 'process' && node.property.name === 'env') {
          context.report({
            node,
            messageId: 'noProcessEnv',
          });
        }
      },
    };
  },
};
