const argv = require('yargs').argv;
const path = require('path');
let version = argv.version || '1.0.0';
let desc = argv.desc || '';
let robot = argv.robot || 1;
const ci = require('miniprogram-ci');
(async () => {
    const project = new ci.Project({
        appid: 'wx6db2e40f820b9c1d',
        type: 'miniProgram',
        projectPath: path.join(__dirname, 'dist/build/mp-weixin'),
        privateKeyPath: path.join(__dirname, 'unpackage/res/mpp/private.wx6db2e40f820b9c1d.key'),
        ignores: []
    });
    if (robot != 1) {
        await ci.preview({
            project,
            version,
            desc,
            robot,
            setting: {},
            onProgressUpdate() {}
        });
    } else {
        await ci.upload({
            project,
            version,
            desc,
            setting: {},
            onProgressUpdate() {}
        });
    }
    console.log('上传成功！');
})();
