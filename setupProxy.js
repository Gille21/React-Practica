const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/computers', // La ruta que deseas redirigir
    createProxyMiddleware({
      target: 'http://www.impulsotemporal.com/api', // La URL de tu servidor backend
      changeOrigin: true,
    })
  );
};
