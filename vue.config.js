module.exports = {
    publicPath: '/tenth-project/',
    // publicPath: '',
    outputDir: 'docs',
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
            swDest: 'service-worker.js',
            // globDirectory: path.join(__dirname, '/docs/'),
            globPatterns: ['*.{js,css,json}'],
            // runtimeCaching: [
            //     {
            //       urlPattern: /.*firebase.*/,
            //       handler: 'networkFirst',
            //       options: {
            //         cacheName: 'api',
            //       }
            //     },
            //     {
            //       urlPattern: /\.(png|svg|woff|ttf|eot)/,
            //       handler: 'cacheFirst',
            //       options: {
            //         cacheName: 'assets',
            //       }
            //     }        
            //   ]    
        }
      }
}
