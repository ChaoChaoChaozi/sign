var window = window;

function getSignature(phone,shuju){

    var n = getRandomStr(),
        o = getTimestampStr(),
        r = "www.foundgame.com",
        a = shuju,
   s = sign(n, o, r, a),
//s = sign("769909", "1526973919", r, a),
    l = "|",
    u = s + l + n + l + o + l + r;
    return u;

}

getRandomStr = function() {
    return Math.ceil(1e5 + 9e5 * Math.random()).toString()
}
getTimestampStr = function() {
    return (Date.parse((new Date).toString()) / 1e3).toString()
}

sign = function(e, i, n, o) {
    var r = e + i + "8e0e9f59c08904c13229c1b03de3e2bc" + o + n,
        a = r.split("").sort().join("");
    return getMd5(a)
},
getMd5 = function(t) {
    return (new md5).hex_md5(t).toUpperCase()
}
appSecret = "T0dVd1pUbG1OVGxqTURnNU1EUmpNVE15TWpsak1XSXdNMlJsTTJVeVltTT0="
var __reflect = this && this.__reflect || function(t, r, h) {
        t.__class__ = r,
        h ? h.push(r) : h = [r],
        t.__types__ = t.__types__ ? h.concat(t.__types__) : h
    }, md5 = function() {
        function t() {
            this.hexcase = 0,
            this.b64pad = ""
        }
        return t.prototype.hex_md5 = function(t) {
            return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)))
        },
        t.prototype.b64_md5 = function(t) {
            return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)))
        },
        t.prototype.any_md5 = function(t, r) {
            return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), r)
        },
        t.prototype.hex_hmac_md5 = function(t, r) {
            return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r)))
        },
        t.prototype.b64_hmac_md5 = function(t, r) {
            return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r)))
        },
        t.prototype.any_hmac_md5 = function(t, r, h) {
            return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(r)), h)
        },
        t.prototype.md5_vm_test = function() {
            return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc").toLowerCase()
        },
        t.prototype.rstr_md5 = function(t) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(t), 8 * t.length))
        },
        t.prototype.rstr_hmac_md5 = function(t, r) {
            var h = this.rstr2binl(t);
            h.length > 16 && (h = this.binl_md5(h, 8 * t.length));
            for (var i = Array(16), s = Array(16), _ = 0; 16 > _; _++)
            i[_] = 909522486 ^ h[_],
            s[_] = 1549556828 ^ h[_];
            var d = this.binl_md5(i.concat(this.rstr2binl(r)), 512 + 8 * r.length);
            return this.binl2rstr(this.binl_md5(s.concat(d), 640))
        },
        t.prototype.rstr2hex = function(t) {
            try {
                this.hexcase
            } catch (r) {
                this.hexcase = 0
            }
            for (var h, i = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", s = "", _ = 0; _ < t.length; _++)
            h = t.charCodeAt(_),
            s += i.charAt(h >>> 4 & 15) + i.charAt(15 & h);
            return s
        },
        t.prototype.rstr2b64 = function(t) {
            try {
                this.b64pad
            } catch (r) {
                this.b64pad = ""
            }
            for (var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "", s = t.length, _ = 0; s > _; _ += 3)
            for (var d = t.charCodeAt(_) << 16 | (s > _ + 1 ? t.charCodeAt(_ + 1) << 8 : 0) | (s > _ + 2 ? t.charCodeAt(_ + 2) : 0), n = 0; 4 > n; n++)
            i += 8 * _ + 6 * n > 8 * t.length ? this.b64pad : h.charAt(d >>> 6 * (3 - n) & 63);
            return i
        },
        t.prototype.rstr2any = function(t, r) {
            var h, i, s, _, d, n = r.length,
                e = Array(Math.ceil(t.length / 2));
            for (h = 0; h < e.length; h++)
            e[h] = t.charCodeAt(2 * h) << 8 | t.charCodeAt(2 * h + 1);
            var o = Math.ceil(8 * t.length / (Math.log(r.length) / Math.log(2))),
                m = Array(o);
            for (i = 0; o > i; i++) {
                for (d = Array(),
                _ = 0,
                h = 0; h < e.length; h++)
                _ = (_ << 16) + e[h],
                s = Math.floor(_ / n),
                _ -= s * n, (d.length > 0 || s > 0) && (d[d.length] = s);
                m[i] = _,
                e = d
            }
            var f = "";
            for (h = m.length - 1; h >= 0; h--)
            f += r.charAt(m[h]);
            return f
        },
        t.prototype.str2rstr_utf8 = function(t) {
            for (var r, h, i = "", s = -1; ++s < t.length;)
            r = t.charCodeAt(s),
            h = s + 1 < t.length ? t.charCodeAt(s + 1) : 0,
            r >= 55296 && 56319 >= r && h >= 56320 && 57343 >= h && (r = 65536 + ((1023 & r) << 10) + (1023 & h),
            s++),
            127 >= r ? i += String.fromCharCode(r) : 2047 >= r ? i += String.fromCharCode(192 | r >>> 6 & 31, 128 | 63 & r) : 65535 >= r ? i += String.fromCharCode(224 | r >>> 12 & 15, 128 | r >>> 6 & 63, 128 | 63 & r) : 2097151 >= r && (i += String.fromCharCode(240 | r >>> 18 & 7, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | 63 & r));
            return i
        },
        t.prototype.str2rstr_utf16le = function(t) {
            for (var r = "", h = 0; h < t.length; h++)
            r += String.fromCharCode(255 & t.charCodeAt(h), t.charCodeAt(h) >>> 8 & 255);
            return r
        },
        t.prototype.str2rstr_utf16be = function(t) {
            for (var r = "", h = 0; h < t.length; h++)
            r += String.fromCharCode(t.charCodeAt(h) >>> 8 & 255, 255 & t.charCodeAt(h));
            return r
        },
        t.prototype.rstr2binl = function(t) {
            for (var r = Array(t.length >> 2), h = 0; h < r.length; h++)
            r[h] = 0;
            for (var h = 0; h < 8 * t.length; h += 8)
            r[h >> 5] |= (255 & t.charCodeAt(h / 8)) << h % 32;
            return r
        },
        t.prototype.binl2rstr = function(t) {
            for (var r = "", h = 0; h < 32 * t.length; h += 8)
            r += String.fromCharCode(t[h >> 5] >>> h % 32 & 255);
            return r
        },
        t.prototype.binl_md5 = function(t, r) {
            t[r >> 5] |= 128 << r % 32,
            t[(r + 64 >>> 9 << 4) + 14] = r;
            for (var h = 1732584193, i = -271733879, s = -1732584194, _ = 271733878, d = 0; d < t.length; d += 16) {
                var n = h,
                    e = i,
                    o = s,
                    m = _;
                h = this.md5_ff(h, i, s, _, t[d + 0], 7, -680876936),
                _ = this.md5_ff(_, h, i, s, t[d + 1], 12, -389564586),
                s = this.md5_ff(s, _, h, i, t[d + 2], 17, 606105819),
                i = this.md5_ff(i, s, _, h, t[d + 3], 22, -1044525330),
                h = this.md5_ff(h, i, s, _, t[d + 4], 7, -176418897),
                _ = this.md5_ff(_, h, i, s, t[d + 5], 12, 1200080426),
                s = this.md5_ff(s, _, h, i, t[d + 6], 17, -1473231341),
                i = this.md5_ff(i, s, _, h, t[d + 7], 22, -45705983),
                h = this.md5_ff(h, i, s, _, t[d + 8], 7, 1770035416),
                _ = this.md5_ff(_, h, i, s, t[d + 9], 12, -1958414417),
                s = this.md5_ff(s, _, h, i, t[d + 10], 17, -42063),
                i = this.md5_ff(i, s, _, h, t[d + 11], 22, -1990404162),
                h = this.md5_ff(h, i, s, _, t[d + 12], 7, 1804603682),
                _ = this.md5_ff(_, h, i, s, t[d + 13], 12, -40341101),
                s = this.md5_ff(s, _, h, i, t[d + 14], 17, -1502002290),
                i = this.md5_ff(i, s, _, h, t[d + 15], 22, 1236535329),
                h = this.md5_gg(h, i, s, _, t[d + 1], 5, -165796510),
                _ = this.md5_gg(_, h, i, s, t[d + 6], 9, -1069501632),
                s = this.md5_gg(s, _, h, i, t[d + 11], 14, 643717713),
                i = this.md5_gg(i, s, _, h, t[d + 0], 20, -373897302),
                h = this.md5_gg(h, i, s, _, t[d + 5], 5, -701558691),
                _ = this.md5_gg(_, h, i, s, t[d + 10], 9, 38016083),
                s = this.md5_gg(s, _, h, i, t[d + 15], 14, -660478335),
                i = this.md5_gg(i, s, _, h, t[d + 4], 20, -405537848),
                h = this.md5_gg(h, i, s, _, t[d + 9], 5, 568446438),
                _ = this.md5_gg(_, h, i, s, t[d + 14], 9, -1019803690),
                s = this.md5_gg(s, _, h, i, t[d + 3], 14, -187363961),
                i = this.md5_gg(i, s, _, h, t[d + 8], 20, 1163531501),
                h = this.md5_gg(h, i, s, _, t[d + 13], 5, -1444681467),
                _ = this.md5_gg(_, h, i, s, t[d + 2], 9, -51403784),
                s = this.md5_gg(s, _, h, i, t[d + 7], 14, 1735328473),
                i = this.md5_gg(i, s, _, h, t[d + 12], 20, -1926607734),
                h = this.md5_hh(h, i, s, _, t[d + 5], 4, -378558),
                _ = this.md5_hh(_, h, i, s, t[d + 8], 11, -2022574463),
                s = this.md5_hh(s, _, h, i, t[d + 11], 16, 1839030562),
                i = this.md5_hh(i, s, _, h, t[d + 14], 23, -35309556),
                h = this.md5_hh(h, i, s, _, t[d + 1], 4, -1530992060),
                _ = this.md5_hh(_, h, i, s, t[d + 4], 11, 1272893353),
                s = this.md5_hh(s, _, h, i, t[d + 7], 16, -155497632),
                i = this.md5_hh(i, s, _, h, t[d + 10], 23, -1094730640),
                h = this.md5_hh(h, i, s, _, t[d + 13], 4, 681279174),
                _ = this.md5_hh(_, h, i, s, t[d + 0], 11, -358537222),
                s = this.md5_hh(s, _, h, i, t[d + 3], 16, -722521979),
                i = this.md5_hh(i, s, _, h, t[d + 6], 23, 76029189),
                h = this.md5_hh(h, i, s, _, t[d + 9], 4, -640364487),
                _ = this.md5_hh(_, h, i, s, t[d + 12], 11, -421815835),
                s = this.md5_hh(s, _, h, i, t[d + 15], 16, 530742520),
                i = this.md5_hh(i, s, _, h, t[d + 2], 23, -995338651),
                h = this.md5_ii(h, i, s, _, t[d + 0], 6, -198630844),
                _ = this.md5_ii(_, h, i, s, t[d + 7], 10, 1126891415),
                s = this.md5_ii(s, _, h, i, t[d + 14], 15, -1416354905),
                i = this.md5_ii(i, s, _, h, t[d + 5], 21, -57434055),
                h = this.md5_ii(h, i, s, _, t[d + 12], 6, 1700485571),
                _ = this.md5_ii(_, h, i, s, t[d + 3], 10, -1894986606),
                s = this.md5_ii(s, _, h, i, t[d + 10], 15, -1051523),
                i = this.md5_ii(i, s, _, h, t[d + 1], 21, -2054922799),
                h = this.md5_ii(h, i, s, _, t[d + 8], 6, 1873313359),
                _ = this.md5_ii(_, h, i, s, t[d + 15], 10, -30611744),
                s = this.md5_ii(s, _, h, i, t[d + 6], 15, -1560198380),
                i = this.md5_ii(i, s, _, h, t[d + 13], 21, 1309151649),
                h = this.md5_ii(h, i, s, _, t[d + 4], 6, -145523070),
                _ = this.md5_ii(_, h, i, s, t[d + 11], 10, -1120210379),
                s = this.md5_ii(s, _, h, i, t[d + 2], 15, 718787259),
                i = this.md5_ii(i, s, _, h, t[d + 9], 21, -343485551),
                h = this.safe_add(h, n),
                i = this.safe_add(i, e),
                s = this.safe_add(s, o),
                _ = this.safe_add(_, m)
            }
            return [h, i, s, _]
        },
        t.prototype.md5_cmn = function(t, r, h, i, s, _) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(r, t), this.safe_add(i, _)), s), h)
        },
        t.prototype.md5_ff = function(t, r, h, i, s, _, d) {
            return this.md5_cmn(r & h | ~r & i, t, r, s, _, d)
        },
        t.prototype.md5_gg = function(t, r, h, i, s, _, d) {
            return this.md5_cmn(r & i | h & ~i, t, r, s, _, d)
        },
        t.prototype.md5_hh = function(t, r, h, i, s, _, d) {
            return this.md5_cmn(r ^ h ^ i, t, r, s, _, d)
        },
        t.prototype.md5_ii = function(t, r, h, i, s, _, d) {
            return this.md5_cmn(h ^ (r | ~i), t, r, s, _, d)
        },
        t.prototype.safe_add = function(t, r) {
            var h = (65535 & t) + (65535 & r),
                i = (t >> 16) + (r >> 16) + (h >> 16);
            return i << 16 | 65535 & h
        },
        t.prototype.bit_rol = function(t, r) {
            return t << r | t >>> 32 - r
        },
        t
    }();
__reflect(md5.prototype, "md5");