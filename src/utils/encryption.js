import { MD5, HmacSHA1, AES, enc, mode, pad } from 'crypto-js';
import pako from 'pako/dist/pako.es5.min';
export default class {
    static getSignature(timestamp, requestId, deviceId, params, key) {
        let source = `${deviceId}${requestId}${key}${timestamp}`;
        if (params) {
            Object.keys(params)
                .sort()
                .filter(key => params[key] !== undefined && params[key] !== null)
                .map(key => `${key}${this.fdsakxm23i(params[key])}`)
                .forEach(val => (source += val));
        }
        const shakey = MD5(MD5(requestId).toString() + deviceId)
            .toString()
            .substr(0, 10);
        return HmacSHA1(source, shakey)
            .toString()
            .substr(0, 10);
    }

    static fdsakxm23i(val) {
        return encodeURIComponent(val)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    }

    static getData(data, headers, _signature) {
        if (typeof data == 'string' && _signature) {
            data = AES.decrypt(data, enc.Hex.parse(MD5(_signature).toString()), {
                mode: mode.ECB,
                padding: pad.Pkcs7
            });
            var base = enc.Base64.parse(data.toString(enc.Utf8));
            if ((headers[`en${'cr'}ypt${'-en'}c${'odi'}ng`] || headers[`En${'cr'}ypt${'-En'}c${'odi'}ng`]) == `gz${'ip'}`) {
                let hex = enc.Hex.stringify(base);
                let bys = [];
                for (let index = 0; index < hex.length; index += 2) {
                    bys.push(parseInt(hex.substr(index, 2), 16));
                }
                hex = [];
                bys = pako.inflate(bys);
                bys.forEach(val => {
                    hex.push((val >> 4).toString(16));
                    hex.push((val & 0xf).toString(16));
                });
                base = enc.Hex.parse(hex.join(''));
            }
            var str = enc.Utf8.stringify(base);
            try {
                return JSON.parse(str);
            } catch (error) {
                console.error(error);
                return {};
            }
        }
        return data;
    }

    static test() {
        // 加密
        // if (this.getSignature(1598237930270, 'bc822af0e5', '4282591533', { a: 'b', b: 3 }, '_timestamp') === '8f038eaf48') {
        //     console.log('success');
        // } else {
        //     console.log('fail');
        // }
        // 解密
        // console.log(this.getData('Kvp1CNuxz9E8zxonxUFSfXrkEiehYPr785/liwO5y4WyDVDIATUCvqrEh3hIQ4s354KKevINzKsNa2xypn8J0NWmkQHC4FskNIE7ENu2xgwp2TFIkcyuPQQ746OQ+nmeodL07bdZG42N7e0SoGdWOhgStVUNdxXO7wAgFHY2qFA=', { 'encrypt-encoding': 'gzip' }, '40b8a5fff8'));
    }
}
