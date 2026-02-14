const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:2323',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove '/api' from the request path
      },
    })
  );
  app.use(
    '/zenquote-api',
    createProxyMiddleware({
      target: 'https://zenquotes.io',
      changeOrigin: true,
      pathRewrite: {
        '^/zenquote-api': '', // remove /zenquote-api from the request path
      },
    })
  );
};
