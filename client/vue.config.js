module.exports = {
  devServer: {
    proxy: {
      "/result": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
