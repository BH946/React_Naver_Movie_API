const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/proxy", // 이 문자열을 찾으면
    createProxyMiddleware({
      target: "http://localhost:5000", // 프록시가 맨앞을 이 문자열로 우선으로 경로 지정하고
      changeOrigin: true,
      pathRewrite: { "^/proxy/": "/" }, // 처음 찾았던 "/proxy/..." 부분은 "/" 로 경로 수정한다.
    })
  );
};
