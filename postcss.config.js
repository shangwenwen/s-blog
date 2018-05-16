const config = (target) => {
  const plugins = [
    require('postcss-import'), // 引入CSS文件 @import
    require('postcss-mixins'), // 混合宏
    require('postcss-nesting'), // 嵌套
    require('postcss-simple-vars'), // 变量
    require('postcss-calc'), // 属性值计算
    require('postcss-custom-selectors'), // 选择器
    require('postcss-custom-media'), // 响应式设计
    require('postcss-media-minmax'), // 响应式设计
    require('postcss-image-set-polyfill'), // 响应式图片
    require('autoprefixer') // 自动添加 CSS3 前缀
  ];

  if (target === 'production') {
    plugins.push(require('cssnano')({ reduceIdents: false }));
  }

  return plugins;
};

module.exports = config;
