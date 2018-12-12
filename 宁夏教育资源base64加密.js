//http://yun.nxeduyun.com/#
//宁夏教育资源公共服务平台
//base64加密
function getEncrypt(username,password){
	var userId=_encrypt._string(username);
    var userPsw=_encrypt._string(password);
    return "账号："+userId+"----密码："+userPsw;
}
/**
 * base64加密解密
 */
var _base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = _base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else {
                if (isNaN(i)) {
                    a = 64
                }
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    _decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = _base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else {
                if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else {
                if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
        }
        return t
    }
};

/**
 * 请求通讯加密
 */
var _encrypt = {
    _string:function(str) {//通讯加密
        var key       = 'tPhCyUsKpXlHsEgSyHoEkLdQpLkOsLcYhErFkWxJsFeVhLiQrHqFbYbNyEvClEwUfQmEgUnEfJiHfPtLuEdDbIiIqUqLoTzOmYqA';
        var key_login = '95a1446a7120e4af5c0c8878abb7e6d2';
        var string    = _base64._encode(str);
        var len       = key.length;
        var code      = '';
        var newcode   = '';
        for (var i = 0; i < string.length; i++) {
            k = i % len;
            code += String.fromCharCode(string.charCodeAt(i) ^ key.charCodeAt(k));
        }
        code = _base64._encode(code);
        var code_arr = code.split('');
        var key_arr = key.split('');

        for (var j = 0; j < code.length; j++) {
            var t1 = '', t2 = '';
            t1 = code_arr[j].toString();
            if(key_arr[j] != undefined && key_arr[j] != null){
                t2 = key_arr[j].toString();
            }
            newcode += (t1+t2);
        }

        newcode = newcode.replace(/\//g,"6666cd76f96956469e7be39d750cc7d9");
        newcode = newcode.replace(/=/g,"43ec3e5dee6e706af7766fffea512721");
        newcode = newcode.replace(/\+/g,"26b17225b626fb9238849fd60eabdf60");
        newcode = key_login + newcode;

        return newcode;
    },
    _url:function (str) {//url加密
        var string = _base64._encode(str);
        string = string.replace(/\//g,"-");
        string = string.replace(/=/g,"_");
        string = string.replace(/\+/g,"!");
        return string;
    }
};
