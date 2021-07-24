const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    hack: `true; @import "${resolve('src/styles/variables.less')}";`
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'cloudfunctions'),
                    to: path.join(
                        __dirname,
                        'dist',
                        process.env.NODE_ENV === 'production' ? 'build' : 'dev',
                        process.env.UNI_PLATFORM,
                        'cloudfunctions'
                    )
                }
            ])
        ]
    }
};
