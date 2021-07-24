export default {
    // 检查文字是否全是空格或制表符
    checkAllSpace(text) {
        let flag = false;
        if (text.match(/^\s+$/)) {
            flag = true;
        }
        return flag;
    },
    // 深拷贝
    deepCopy(p, c) {
        c = c || (p.constructor === Array ? [] : {});
        for (var i in p) {
            if (p[i] && p[i].constructor) {
                if (p[i].constructor === Date) {
                    c[i] = new Date(p[i]);
                } else if (p[i].constructor === Array) {
                    c[i] = [];
                    this.deepCopy(p[i], c[i]);
                } else if (p[i].constructor === Function) {
                    c[i] = p[i];
                } else if (p[i] instanceof Object) {
                    c[i] = {};
                    this.deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                }
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }
}
