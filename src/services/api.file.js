import request from './request.js';

export default {
    // 上传文件
    uploadFile(data) {
        return request.post('/api/file', data);
    },
    // 上传多个
    uploadFileMulti(files) {
        var promises = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            promises.push(this.uploadImage(file));
        }
        return Promise.all(promises);
    },
    getBase64(img) {
        let promise = null;
        // #ifdef H5
        const reader = new FileReader();
        promise = new Promise(resolve => {
            reader.addEventListener('load', () => {
                resolve(reader.result);
            });
            reader.readAsDataURL(img);
        });
        // #endif
        // #ifdef MP-WEIXIN
        promise = new Promise(resolve => {
            uni.getFileSystemManager().readFile({
                filePath: img.path,
                encoding: 'base64',
                success: res => {
                    let base64 = 'data:image/jpeg;base64,' + res.data;
                    resolve(base64);
                }
            });
        });
        // #endif
        // #ifdef APP-PLUS
        promise = new Promise(resolve => {
            // eslint-disable-next-line
            plus.io.resolveLocalFileSystemURL(img.path, entry => {
                entry.file(file => {
                    // eslint-disable-next-line
                    var fileReader = new plus.io.FileReader();
                    fileReader.onloadend = evt => {
                        resolve(evt.target.result);
                    };
                    fileReader.readAsDataURL(file);
                });
            });
        });
        // #endif
        return promise;
    },
    async getImgId(file) {
        try {
            let img = await this.getBase64(file);
            let contentType = file.type;
            // #ifdef MP-WEIXIN
            let ls = (file.path || '').split('.');
            if (ls.length) {
                contentType = 'image/' + ls[ls.length - 1];
            }
            // #endif
            let data = {
                name: file.name || 'file',
                contentType: contentType,
                content: img.slice(img.indexOf(',') + 1)
            };
            let res = await this.uploadFile(data);
            return Promise.resolve(res.data);
        } catch (e) {
            return Promise.reject();
        }
    }
};
