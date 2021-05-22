module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8092',
                changeOrigin: true,
                logLevel: 'debug',
            },
        }
    }
}