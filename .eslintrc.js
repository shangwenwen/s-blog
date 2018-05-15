module.exports = {
  extends: ['eslint-config-alloy/react'],
  rules: {
    'indent': ['error', 2, { SwitchCase: 1, flatTernaryExpressions: true }], // @fixable 一个缩进必须用两个空格替代
    'react/jsx-indent': ['error', 2], // @fixable jsx 的 children 缩进必须为两个空格
    'react/jsx-indent-props': ['error', 2], // @fixable jsx 的 props 缩进必须为两个空格
    'semi': ['error', 'never', { 'beforeStatementContinuationChars': 'always'}],
    'no-multiple-empty-lines': [2, { 'max': 1 }] // 不能有多个空行,最多1行
  }
}
