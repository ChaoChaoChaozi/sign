//https://passport.tuandai.com/2login
//团贷网 登陆 加密算法

navigator = {
    appCodeName: "Mozilla",
    appMinorVersion: "0",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
    browserLanguage: "zh-CN",
    cookieEnabled: true,
    cpuClass: "x86",
    language: "zh-CN",
    maxTouchPoints: 0,
    msManipulationViewsEnabled: true,
    msMaxTouchPoints: 0,
    msPointerEnabled: true,
    onLine: true,
    platform: "Win32",
    pointerEnabled: true,
    product: "Gecko",
    systemLanguage: "zh-CN",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
    userLanguage: "zh-CN",
    vendor: "",
    vendorSub: "",
    webdriver: false
}, window = this, window.navigator = navigator;
navigator = {};

function getpwd(un, pwd) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgTeLS6j8nXVwwAh+9Iwcx/d4nZaqzfTMFLnSd+H37kc+GZPjiF3b0y9ywP5QEaCsaWr2gGbAalBulLZCV364Zuz87LfimUBJiG+oVfyyAX1I/KIzCelaRYpxddh4ikj2AedJGPskO0MXm8wn52NAOp/FWAlyS0A914e3Ff4JgEwIDAQAB");
    username = encrypt.encrypt(un);
    password = encrypt.encrypt(pwd);
    return [username, password]
} /*! JSEncrypt v2.3.1 | https://npmcdn.com/jsencrypt@2.3.1/LICENSE.txt */ (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        factory(module.exports);
    } else {
        factory(root);
    }
})(this, function (exports) {
    var dbits;
    var canary = 0xdeadbeefcafe;
    var j_lm = ((canary & 0xffffff) == 0xefcafe);

    function BigInteger(a, b, c) {
        if (a != null)
            if ("number" == typeof a) this.fromNumber(a, b, c);
            else if (b == null && "string" != typeof a) this.fromString(a, 256);
        else this.fromString(a, b);
    }

    function nbi() {
        return new BigInteger(null);
    }

    function am1(i, x, w, j, c, n) {
        while (--n >= 0) {
            var v = x * this[i++] + w[j] + c;
            c = Math.floor(v / 0x4000000);
            w[j++] = v & 0x3ffffff;
        }
        return c;
    }

    function am2(i, x, w, j, c, n) {
        var xl = x & 0x7fff,
            xh = x >> 15;
        while (--n >= 0) {
            var l = this[i] & 0x7fff;
            var h = this[i++] >> 15;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
            w[j++] = l & 0x3fffffff;
        }
        return c;
    }

    function am3(i, x, w, j, c, n) {
        var xl = x & 0x3fff,
            xh = x >> 14;
        while (--n >= 0) {
            var l = this[i] & 0x3fff;
            var h = this[i++] >> 14;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
            c = (l >> 28) + (m >> 14) + xh * h;
            w[j++] = l & 0xfffffff;
        }
        return c;
    }
    if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
        BigInteger.prototype.am = am2;
        dbits = 30;
    } else if (j_lm && (navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26;
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28;
    }
    BigInteger.prototype.DB = dbits;
    BigInteger.prototype.DM = ((1 << dbits) - 1);
    BigInteger.prototype.DV = (1 << dbits);
    var BI_FP = 52;
    BigInteger.prototype.FV = Math.pow(2, BI_FP);
    BigInteger.prototype.F1 = BI_FP - dbits;
    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr, vv;
    rr = "0".charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

    function int2char(n) {
        return BI_RM.charAt(n);
    }

    function intAt(s, i) {
        var c = BI_RC[s.charCodeAt(i)];
        return (c == null) ? -1 : c;
    }

    function bnpCopyTo(r) {
        for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
        r.t = this.t;
        r.s = this.s;
    }

    function bnpFromInt(x) {
        this.t = 1;
        this.s = (x < 0) ? -1 : 0;
        if (x > 0) this[0] = x;
        else if (x < -1) this[0] = x + this.DV;
        else this.t = 0;
    }

    function nbv(i) {
        var r = nbi();
        r.fromInt(i);
        return r;
    }

    function bnpFromString(s, b) {
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 256) k = 8;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else {
            this.fromRadix(s, b);
            return;
        }
        this.t = 0;
        this.s = 0;
        var i = s.length,
            mi = false,
            sh = 0;
        while (--i >= 0) {
            var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-") mi = true;
                continue;
            }
            mi = false;
            if (sh == 0) this[this.t++] = x;
            else if (sh + k > this.DB) {
                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                this[this.t++] = (x >> (this.DB - sh));
            } else
                this[this.t - 1] |= x << sh;
            sh += k;
            if (sh >= this.DB) sh -= this.DB;
        }
        if (k == 8 && (s[0] & 0x80) != 0) {
            this.s = -1;
            if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
        }
        this.clamp();
        if (mi) BigInteger.ZERO.subTo(this, this);
    }

    function bnpClamp() {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c)--this.t;
    }

    function bnToString(b) {
        if (this.s < 0) return "-" + this.negate().toString(b);
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else return this.toRadix(b);
        var km = (1 << k) - 1,
            d, m = false,
            r = "",
            i = this.t;
        var p = this.DB - (i * this.DB) % k;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) > 0) {
                m = true;
                r = int2char(d);
            }
            while (i >= 0) {
                if (p < k) {
                    d = (this[i] & ((1 << p) - 1)) << (k - p);
                    d |= this[--i] >> (p += this.DB - k);
                } else {
                    d = (this[i] >> (p -= k)) & km;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                } if (d > 0) m = true;
                if (m) r += int2char(d);
            }
        }
        return m ? r : "0";
    }

    function bnNegate() {
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r;
    }

    function bnAbs() {
        return (this.s < 0) ? this.negate() : this;
    }

    function bnCompareTo(a) {
        var r = this.s - a.s;
        if (r != 0) return r;
        var i = this.t;
        r = i - a.t;
        if (r != 0) return (this.s < 0) ? -r : r;
        while (--i >= 0)
            if ((r = this[i] - a[i]) != 0) return r;
        return 0;
    }

    function nbits(x) {
        var r = 1,
            t;
        if ((t = x >>> 16) != 0) {
            x = t;
            r += 16;
        }
        if ((t = x >> 8) != 0) {
            x = t;
            r += 8;
        }
        if ((t = x >> 4) != 0) {
            x = t;
            r += 4;
        }
        if ((t = x >> 2) != 0) {
            x = t;
            r += 2;
        }
        if ((t = x >> 1) != 0) {
            x = t;
            r += 1;
        }
        return r;
    }

    function bnBitLength() {
        if (this.t <= 0) return 0;
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
    }

    function bnpDLShiftTo(n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
        for (i = n - 1; i >= 0; --i) r[i] = 0;
        r.t = this.t + n;
        r.s = this.s;
    }

    function bnpDRShiftTo(n, r) {
        for (var i = n; i < this.t; ++i) r[i - n] = this[i];
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
    }

    function bnpLShiftTo(n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB),
            c = (this.s << bs) & this.DM,
            i;
        for (i = this.t - 1; i >= 0; --i) {
            r[i + ds + 1] = (this[i] >> cbs) | c;
            c = (this[i] & bm) << bs;
        }
        for (i = ds - 1; i >= 0; --i) r[i] = 0;
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
    }

    function bnpRShiftTo(n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
            r.t = 0;
            return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
            r[i - ds - 1] |= (this[i] & bm) << cbs;
            r[i - ds] = this[i] >> bs;
        }
        if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
        r.t = this.t - ds;
        r.clamp();
    }

    function bnpSubTo(a, r) {
        var i = 0,
            c = 0,
            m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] - a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c -= a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        } else {
            c += this.s;
            while (i < a.t) {
                c -= a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c -= a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c < -1) r[i++] = this.DV + c;
        else if (c > 0) r[i++] = c;
        r.t = i;
        r.clamp();
    }

    function bnpMultiplyTo(a, r) {
        var x = this.abs(),
            y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        r.s = 0;
        r.clamp();
        if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
    }

    function bnpSquareTo(r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);
            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                r[i + x.t] -= x.DV;
                r[i + x.t + 1] = 1;
            }
        }
        if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        r.s = 0;
        r.clamp();
    }

    function bnpDivRemTo(m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0) return;
        var pt = this.abs();
        if (pt.t < pm.t) {
            if (q != null) q.fromInt(0);
            if (r != null) this.copyTo(r);
            return;
        }
        if (r == null) r = nbi();
        var y = nbi(),
            ts = this.s,
            ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r);
        } else {
            pm.copyTo(y);
            pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) return;
        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt,
            d2 = (1 << this.F1) / yt,
            e = 1 << this.F2;
        var i = r.t,
            j = i - ys,
            t = (q == null) ? nbi() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
            r[r.t++] = 1;
            r.subTo(t, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y);
        while (y.t < ys) y[y.t++] = 0;
        while (--j >= 0) {
            var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
                y.dlShiftTo(j, t);
                r.subTo(t, r);
                while (r[i] < --qd) r.subTo(t, r);
            }
        }
        if (q != null) {
            r.drShiftTo(ys, q);
            if (ts != ms) BigInteger.ZERO.subTo(q, q);
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) r.rShiftTo(nsh, r);
        if (ts < 0) BigInteger.ZERO.subTo(r, r);
    }

    function bnMod(a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
        return r;
    }

    function Classic(m) {
        this.m = m;
    }

    function cConvert(x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
        else return x;
    }

    function cRevert(x) {
        return x;
    }

    function cReduce(x) {
        x.divRemTo(this.m, null, x);
    }

    function cMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    }

    function cSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;

    function bnpInvDigit() {
        if (this.t < 1) return 0;
        var x = this[0];
        if ((x & 1) == 0) return 0;
        var y = x & 3;
        y = (y * (2 - (x & 0xf) * y)) & 0xf;
        y = (y * (2 - (x & 0xff) * y)) & 0xff;
        y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;
        y = (y * (2 - x * y % this.DV)) % this.DV;
        return (y > 0) ? this.DV - y : -y;
    }

    function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 0x7fff;
        this.mph = this.mp >> 15;
        this.um = (1 << (m.DB - 15)) - 1;
        this.mt2 = 2 * m.t;
    }

    function montConvert(x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
        return r;
    }

    function montRevert(x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
    }

    function montReduce(x) {
        while (x.t <= this.mt2) x[x.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
            var j = x[i] & 0x7fff;
            var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
            j = i + this.m.t;
            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
            while (x[j] >= x.DV) {
                x[j] -= x.DV;
                x[++j]++;
            }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
    }

    function montSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
    }

    function montMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;

    function bnpIsEven() {
        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
    }

    function bnpExp(e, z) {
        if (e > 0xffffffff || e < 1) return BigInteger.ONE;
        var r = nbi(),
            r2 = nbi(),
            g = z.convert(this),
            i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
            z.sqrTo(r, r2);
            if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
            else {
                var t = r;
                r = r2;
                r2 = t;
            }
        }
        return z.revert(r);
    }

    function bnModPowInt(e, m) {
        var z;
        if (e < 256 || m.isEven()) z = new Classic(m);
        else z = new Montgomery(m);
        return this.exp(e, z);
    }
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);

    function bnClone() {
        var r = nbi();
        this.copyTo(r);
        return r;
    }

    function bnIntValue() {
        if (this.s < 0) {
            if (this.t == 1) return this[0] - this.DV;
            else if (this.t == 0) return -1;
        } else if (this.t == 1) return this[0];
        else if (this.t == 0) return 0;
        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
    }

    function bnByteValue() {
        return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
    }

    function bnShortValue() {
        return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
    }

    function bnpChunkSize(r) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r));
    }

    function bnSigNum() {
        if (this.s < 0) return -1;
        else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
        else return 1;
    }

    function bnpToRadix(b) {
        if (b == null) b = 10;
        if (this.signum() == 0 || b < 2 || b > 36) return "0";
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a),
            y = nbi(),
            z = nbi(),
            r = "";
        this.divRemTo(d, y, z);
        while (y.signum() > 0) {
            r = (a + z.intValue()).toString(b).substr(1) + r;
            y.divRemTo(d, y, z);
        }
        return z.intValue().toString(b) + r;
    }

    function bnpFromRadix(s, b) {
        this.fromInt(0);
        if (b == null) b = 10;
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs),
            mi = false,
            j = 0,
            w = 0;
        for (var i = 0; i < s.length; ++i) {
            var x = intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-" && this.signum() == 0) mi = true;
                continue;
            }
            w = b * w + x;
            if (++j >= cs) {
                this.dMultiply(d);
                this.dAddOffset(w, 0);
                j = 0;
                w = 0;
            }
        }
        if (j > 0) {
            this.dMultiply(Math.pow(b, j));
            this.dAddOffset(w, 0);
        }
        if (mi) BigInteger.ZERO.subTo(this, this);
    }

    function bnpFromNumber(a, b, c) {
        if ("number" == typeof b) {
            if (a < 2) this.fromInt(1);
            else {
                this.fromNumber(a, c);
                if (!this.testBit(a - 1)) this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                if (this.isEven()) this.dAddOffset(1, 0);
                while (!this.isProbablePrime(b)) {
                    this.dAddOffset(2, 0);
                    if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                }
            }
        } else {
            var x = new Array(),
                t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);
            if (t > 0) x[0] &= ((1 << t) - 1);
            else x[0] = 0;
            this.fromString(x, 256);
        }
    }

    function bnToByteArray() {
        var i = this.t,
            r = new Array();
        r[0] = this.s;
        var p = this.DB - (i * this.DB) % 8,
            d, k = 0;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) r[k++] = d | (this.s << (this.DB - p));
            while (i >= 0) {
                if (p < 8) {
                    d = (this[i] & ((1 << p) - 1)) << (8 - p);
                    d |= this[--i] >> (p += this.DB - 8);
                } else {
                    d = (this[i] >> (p -= 8)) & 0xff;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                } if ((d & 0x80) != 0) d |= -256;
                if (k == 0 && (this.s & 0x80) != (d & 0x80))++k;
                if (k > 0 || d != this.s) r[k++] = d;
            }
        }
        return r;
    }

    function bnEquals(a) {
        return (this.compareTo(a) == 0);
    }

    function bnMin(a) {
        return (this.compareTo(a) < 0) ? this : a;
    }

    function bnMax(a) {
        return (this.compareTo(a) > 0) ? this : a;
    }

    function bnpBitwiseTo(a, op, r) {
        var i, f, m = Math.min(a.t, this.t);
        for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
        if (a.t < this.t) {
            f = a.s & this.DM;
            for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
            r.t = this.t;
        } else {
            f = this.s & this.DM;
            for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
            r.t = a.t;
        }
        r.s = op(this.s, a.s);
        r.clamp();
    }

    function op_and(x, y) {
        return x & y;
    }

    function bnAnd(a) {
        var r = nbi();
        this.bitwiseTo(a, op_and, r);
        return r;
    }

    function op_or(x, y) {
        return x | y;
    }

    function bnOr(a) {
        var r = nbi();
        this.bitwiseTo(a, op_or, r);
        return r;
    }

    function op_xor(x, y) {
        return x ^ y;
    }

    function bnXor(a) {
        var r = nbi();
        this.bitwiseTo(a, op_xor, r);
        return r;
    }

    function op_andnot(x, y) {
        return x & ~y;
    }

    function bnAndNot(a) {
        var r = nbi();
        this.bitwiseTo(a, op_andnot, r);
        return r;
    }

    function bnNot() {
        var r = nbi();
        for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
        r.t = this.t;
        r.s = ~this.s;
        return r;
    }

    function bnShiftLeft(n) {
        var r = nbi();
        if (n < 0) this.rShiftTo(-n, r);
        else this.lShiftTo(n, r);
        return r;
    }

    function bnShiftRight(n) {
        var r = nbi();
        if (n < 0) this.lShiftTo(-n, r);
        else this.rShiftTo(n, r);
        return r;
    }

    function lbit(x) {
        if (x == 0) return -1;
        var r = 0;
        if ((x & 0xffff) == 0) {
            x >>= 16;
            r += 16;
        }
        if ((x & 0xff) == 0) {
            x >>= 8;
            r += 8;
        }
        if ((x & 0xf) == 0) {
            x >>= 4;
            r += 4;
        }
        if ((x & 3) == 0) {
            x >>= 2;
            r += 2;
        }
        if ((x & 1) == 0)++r;
        return r;
    }

    function bnGetLowestSetBit() {
        for (var i = 0; i < this.t; ++i)
            if (this[i] != 0) return i * this.DB + lbit(this[i]);
        if (this.s < 0) return this.t * this.DB;
        return -1;
    }

    function cbit(x) {
        var r = 0;
        while (x != 0) {
            x &= x - 1;
            ++r;
        }
        return r;
    }

    function bnBitCount() {
        var r = 0,
            x = this.s & this.DM;
        for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
        return r;
    }

    function bnTestBit(n) {
        var j = Math.floor(n / this.DB);
        if (j >= this.t) return (this.s != 0);
        return ((this[j] & (1 << (n % this.DB))) != 0);
    }

    function bnpChangeBit(n, op) {
        var r = BigInteger.ONE.shiftLeft(n);
        this.bitwiseTo(r, op, r);
        return r;
    }

    function bnSetBit(n) {
        return this.changeBit(n, op_or);
    }

    function bnClearBit(n) {
        return this.changeBit(n, op_andnot);
    }

    function bnFlipBit(n) {
        return this.changeBit(n, op_xor);
    }

    function bnpAddTo(a, r) {
        var i = 0,
            c = 0,
            m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] + a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c += a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        } else {
            c += this.s;
            while (i < a.t) {
                c += a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c > 0) r[i++] = c;
        else if (c < -1) r[i++] = this.DV + c;
        r.t = i;
        r.clamp();
    }

    function bnAdd(a) {
        var r = nbi();
        this.addTo(a, r);
        return r;
    }

    function bnSubtract(a) {
        var r = nbi();
        this.subTo(a, r);
        return r;
    }

    function bnMultiply(a) {
        var r = nbi();
        this.multiplyTo(a, r);
        return r;
    }

    function bnSquare() {
        var r = nbi();
        this.squareTo(r);
        return r;
    }

    function bnDivide(a) {
        var r = nbi();
        this.divRemTo(a, r, null);
        return r;
    }

    function bnRemainder(a) {
        var r = nbi();
        this.divRemTo(a, null, r);
        return r;
    }

    function bnDivideAndRemainder(a) {
        var q = nbi(),
            r = nbi();
        this.divRemTo(a, q, r);
        return new Array(q, r);
    }

    function bnpDMultiply(n) {
        this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
    }

    function bnpDAddOffset(n, w) {
        if (n == 0) return;
        while (this.t <= w) this[this.t++] = 0;
        this[w] += n;
        while (this[w] >= this.DV) {
            this[w] -= this.DV;
            if (++w >= this.t) this[this.t++] = 0;
            ++this[w];
        }
    }

    function NullExp() {}

    function nNop(x) {
        return x;
    }

    function nMulTo(x, y, r) {
        x.multiplyTo(y, r);
    }

    function nSqrTo(x, r) {
        x.squareTo(r);
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;

    function bnPow(e) {
        return this.exp(e, new NullExp());
    }

    function bnpMultiplyLowerTo(a, n, r) {
        var i = Math.min(this.t + a.t, n);
        r.s = 0;
        r.t = i;
        while (i > 0) r[--i] = 0;
        var j;
        for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
        for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
        r.clamp();
    }

    function bnpMultiplyUpperTo(a, n, r) {
        --n;
        var i = r.t = this.t + a.t - n;
        r.s = 0;
        while (--i >= 0) r[i] = 0;
        for (i = Math.max(n - this.t, 0); i < a.t; ++i) r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
        r.clamp();
        r.drShiftTo(1, r);
    }

    function Barrett(m) {
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
        this.m = m;
    }

    function barrettConvert(x) {
        if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
        else if (x.compareTo(this.m) < 0) return x;
        else {
            var r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
        }
    }

    function barrettRevert(x) {
        return x;
    }

    function barrettReduce(x) {
        x.drShiftTo(this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
            x.t = this.m.t + 1;
            x.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
        x.subTo(this.r2, x);
        while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
    }

    function barrettSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
    }

    function barrettMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;

    function bnModPow(e, m) {
        var i = e.bitLength(),
            k, r = nbv(1),
            z;
        if (i <= 0) return r;
        else if (i < 18) k = 1;
        else if (i < 48) k = 3;
        else if (i < 144) k = 4;
        else if (i < 768) k = 5;
        else k = 6; if (i < 8) z = new Classic(m);
        else if (m.isEven()) z = new Barrett(m);
        else
            z = new Montgomery(m);
        var g = new Array(),
            n = 3,
            k1 = k - 1,
            km = (1 << k) - 1;
        g[1] = z.convert(this);
        if (k > 1) {
            var g2 = nbi();
            z.sqrTo(g[1], g2);
            while (n <= km) {
                g[n] = nbi();
                z.mulTo(g2, g[n - 2], g[n]);
                n += 2;
            }
        }
        var j = e.t - 1,
            w, is1 = true,
            r2 = nbi(),
            t;
        i = nbits(e[j]) - 1;
        while (j >= 0) {
            if (i >= k1) w = (e[j] >> (i - k1)) & km;
            else {
                w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
                if (j > 0) w |= e[j - 1] >> (this.DB + i - k1);
            }
            n = k;
            while ((w & 1) == 0) {
                w >>= 1;
                --n;
            }
            if ((i -= n) < 0) {
                i += this.DB;
                --j;
            }
            if (is1) {
                g[w].copyTo(r);
                is1 = false;
            } else {
                while (n > 1) {
                    z.sqrTo(r, r2);
                    z.sqrTo(r2, r);
                    n -= 2;
                }
                if (n > 0) z.sqrTo(r, r2);
                else {
                    t = r;
                    r = r2;
                    r2 = t;
                }
                z.mulTo(r2, g[w], r);
            }
            while (j >= 0 && (e[j] & (1 << i)) == 0) {
                z.sqrTo(r, r2);
                t = r;
                r = r2;
                r2 = t;
                if (--i < 0) {
                    i = this.DB - 1;
                    --j;
                }
            }
        }
        return z.revert(r);
    }

    function bnGCD(a) {
        var x = (this.s < 0) ? this.negate() : this.clone();
        var y = (a.s < 0) ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
            var t = x;
            x = y;
            y = t;
        }
        var i = x.getLowestSetBit(),
            g = y.getLowestSetBit();
        if (g < 0) return x;
        if (i < g) g = i;
        if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y);
        }
        while (x.signum() > 0) {
            if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
            if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
            if (x.compareTo(y) >= 0) {
                x.subTo(y, x);
                x.rShiftTo(1, x);
            } else {
                y.subTo(x, y);
                y.rShiftTo(1, y);
            }
        }
        if (g > 0) y.lShiftTo(g, y);
        return y;
    }

    function bnpModInt(n) {
        if (n <= 0) return 0;
        var d = this.DV % n,
            r = (this.s < 0) ? n - 1 : 0;
        if (this.t > 0)
            if (d == 0) r = this[0] % n;
            else
                for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
        return r;
    }

    function bnModInverse(m) {
        var ac = m.isEven();
        if ((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
        var u = m.clone(),
            v = this.clone();
        var a = nbv(1),
            b = nbv(0),
            c = nbv(0),
            d = nbv(1);
        while (u.signum() != 0) {
            while (u.isEven()) {
                u.rShiftTo(1, u);
                if (ac) {
                    if (!a.isEven() || !b.isEven()) {
                        a.addTo(this, a);
                        b.subTo(m, b);
                    }
                    a.rShiftTo(1, a);
                } else if (!b.isEven()) b.subTo(m, b);
                b.rShiftTo(1, b);
            }
            while (v.isEven()) {
                v.rShiftTo(1, v);
                if (ac) {
                    if (!c.isEven() || !d.isEven()) {
                        c.addTo(this, c);
                        d.subTo(m, d);
                    }
                    c.rShiftTo(1, c);
                } else if (!d.isEven()) d.subTo(m, d);
                d.rShiftTo(1, d);
            }
            if (u.compareTo(v) >= 0) {
                u.subTo(v, u);
                if (ac) a.subTo(c, a);
                b.subTo(d, b);
            } else {
                v.subTo(u, v);
                if (ac) c.subTo(a, c);
                d.subTo(b, d);
            }
        }
        if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
        if (d.compareTo(m) >= 0) return d.subtract(m);
        if (d.signum() < 0) d.addTo(m, d);
        else return d; if (d.signum() < 0) return d.add(m);
        else return d;
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];

    function bnIsProbablePrime(t) {
        var i, x = this.abs();
        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
            for (i = 0; i < lowprimes.length; ++i)
                if (x[0] == lowprimes[i]) return true;
            return false;
        }
        if (x.isEven()) return false;
        i = 1;
        while (i < lowprimes.length) {
            var m = lowprimes[i],
                j = i + 1;
            while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
            m = x.modInt(m);
            while (i < j)
                if (m % lowprimes[i++] == 0) return false;
        }
        return x.millerRabin(t);
    }

    function bnpMillerRabin(t) {
        var n1 = this.subtract(BigInteger.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0) return false;
        var r = n1.shiftRight(k);
        t = (t + 1) >> 1;
        if (t > lowprimes.length) t = lowprimes.length;
        var a = nbi();
        for (var i = 0; i < t; ++i) {
            a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
            var y = a.modPow(r, this);
            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
                var j = 1;
                while (j++ < k && y.compareTo(n1) != 0) {
                    y = y.modPowInt(2, this);
                    if (y.compareTo(BigInteger.ONE) == 0) return false;
                }
                if (y.compareTo(n1) != 0) return false;
            }
        }
        return true;
    }
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    BigInteger.prototype.square = bnSquare;

    function Arcfour() {
        this.i = 0;
        this.j = 0;
        this.S = new Array();
    }

    function ARC4init(key) {
        var i, j, t;
        for (i = 0; i < 256; ++i) this.S[i] = i;
        j = 0;
        for (i = 0; i < 256; ++i) {
            j = (j + this.S[i] + key[i % key.length]) & 255;
            t = this.S[i];
            this.S[i] = this.S[j];
            this.S[j] = t;
        }
        this.i = 0;
        this.j = 0;
    }

    function ARC4next() {
        var t;
        this.i = (this.i + 1) & 255;
        this.j = (this.j + this.S[this.i]) & 255;
        t = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t;
        return this.S[(t + this.S[this.i]) & 255];
    }
    Arcfour.prototype.init = ARC4init;
    Arcfour.prototype.next = ARC4next;

    function prng_newstate() {
        return new Arcfour();
    }
    var rng_psize = 256;
    var rng_state;
    var rng_pool;
    var rng_pptr;
    if (rng_pool == null) {
        rng_pool = new Array();
        rng_pptr = 0;
        var t;
        if (window.crypto && window.crypto.getRandomValues) {
            var z = new Uint32Array(256);
            window.crypto.getRandomValues(z);
            for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = z[t] & 255;
        }
        var onMouseMoveListener = function (ev) {
            this.count = this.count || 0;
            if (this.count >= 256 || rng_pptr >= rng_psize) {
                if (window.removeEventListener) window.removeEventListener("mousemove", onMouseMoveListener, false);
                else if (window.detachEvent) window.detachEvent("onmousemove", onMouseMoveListener);
                return;
            }
            try {
                var mouseCoordinates = ev.x + ev.y;
                rng_pool[rng_pptr++] = mouseCoordinates & 255;
                this.count += 1;
            } catch (e) {}
        };
        if (window.addEventListener) window.addEventListener("mousemove", onMouseMoveListener, false);
        else if (window.attachEvent) window.attachEvent("onmousemove", onMouseMoveListener);
    }

    function rng_get_byte() {
        if (rng_state == null) {
            rng_state = prng_newstate();
            while (rng_pptr < rng_psize) {
                var random = Math.floor(65536 * Math.random());
                rng_pool[rng_pptr++] = random & 255;
            }
            rng_state.init(rng_pool);
            for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
            rng_pptr = 0;
        }
        return rng_state.next();
    }

    function rng_get_bytes(ba) {
        var i;
        for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
    }

    function SecureRandom() {}
    SecureRandom.prototype.nextBytes = rng_get_bytes;

    function parseBigInt(str, r) {
        return new BigInteger(str, r);
    }

    function linebrk(s, n) {
        var ret = "";
        var i = 0;
        while (i + n < s.length) {
            ret += s.substring(i, i + n) + "\n";
            i += n;
        }
        return ret + s.substring(i, s.length);
    }

    function byte2Hex(b) {
        if (b < 0x10) return "0" + b.toString(16);
        else
            return b.toString(16);
    }

    function pkcs1pad2(s, n) {
        if (n < s.length + 11) {
            console.error("Message too long for RSA");
            return null;
        }
        var ba = new Array();
        var i = s.length - 1;
        while (i >= 0 && n > 0) {
            var c = s.charCodeAt(i--);
            if (c < 128) {
                ba[--n] = c;
            } else if ((c > 127) && (c < 2048)) {
                ba[--n] = (c & 63) | 128;
                ba[--n] = (c >> 6) | 192;
            } else {
                ba[--n] = (c & 63) | 128;
                ba[--n] = ((c >> 6) & 63) | 128;
                ba[--n] = (c >> 12) | 224;
            }
        }
        ba[--n] = 0;
        var rng = new SecureRandom();
        var x = new Array();
        while (n > 2) {
            x[0] = 0;
            while (x[0] == 0) rng.nextBytes(x);
            ba[--n] = x[0];
        }
        ba[--n] = 2;
        ba[--n] = 0;
        return new BigInteger(ba);
    }

    function RSAKey() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
    }

    function RSASetPublic(N, E) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
        } else
            console.error("Invalid RSA public key");
    }

    function RSADoPublic(x) {
        return x.modPowInt(this.e, this.n);
    }

    function RSAEncrypt(text) {
        var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
        if (m == null) return null;
        var c = this.doPublic(m);
        if (c == null) return null;
        var h = c.toString(16);
        if ((h.length & 1) == 0) return h;
        else return "0" + h;
    }
    RSAKey.prototype.doPublic = RSADoPublic;
    RSAKey.prototype.setPublic = RSASetPublic;
    RSAKey.prototype.encrypt = RSAEncrypt;

    function pkcs1unpad2(d, n) {
        var b = d.toByteArray();
        var i = 0;
        while (i < b.length && b[i] == 0)++i;
        if (b.length - i != n - 1 || b[i] != 2) return null;
        ++i;
        while (b[i] != 0)
            if (++i >= b.length) return null;
        var ret = "";
        while (++i < b.length) {
            var c = b[i] & 255;
            if (c < 128) {
                ret += String.fromCharCode(c);
            } else if ((c > 191) && (c < 224)) {
                ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));
                ++i;
            } else {
                ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63));
                i += 2;
            }
        }
        return ret;
    }

    function RSASetPrivate(N, E, D) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
        } else
            console.error("Invalid RSA private key");
    }

    function RSASetPrivateEx(N, E, D, P, Q, DP, DQ, C) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
            this.p = parseBigInt(P, 16);
            this.q = parseBigInt(Q, 16);
            this.dmp1 = parseBigInt(DP, 16);
            this.dmq1 = parseBigInt(DQ, 16);
            this.coeff = parseBigInt(C, 16);
        } else
            console.error("Invalid RSA private key");
    }

    function RSAGenerate(B, E) {
        var rng = new SecureRandom();
        var qs = B >> 1;
        this.e = parseInt(E, 16);
        var ee = new BigInteger(E, 16);
        for (;;) {
            for (;;) {
                this.p = new BigInteger(B - qs, 1, rng);
                if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) break;
            }
            for (;;) {
                this.q = new BigInteger(qs, 1, rng);
                if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) break;
            }
            if (this.p.compareTo(this.q) <= 0) {
                var t = this.p;
                this.p = this.q;
                this.q = t;
            }
            var p1 = this.p.subtract(BigInteger.ONE);
            var q1 = this.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = ee.modInverse(phi);
                this.dmp1 = this.d.mod(p1);
                this.dmq1 = this.d.mod(q1);
                this.coeff = this.q.modInverse(this.p);
                break;
            }
        }
    }

    function RSADoPrivate(x) {
        if (this.p == null || this.q == null) return x.modPow(this.d, this.n);
        var xp = x.mod(this.p).modPow(this.dmp1, this.p);
        var xq = x.mod(this.q).modPow(this.dmq1, this.q);
        while (xp.compareTo(xq) < 0) xp = xp.add(this.p);
        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    }

    function RSADecrypt(ctext) {
        var c = parseBigInt(ctext, 16);
        var m = this.doPrivate(c);
        if (m == null) return null;
        return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3);
    }
    RSAKey.prototype.doPrivate = RSADoPrivate;
    RSAKey.prototype.setPrivate = RSASetPrivate;
    RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
    RSAKey.prototype.generate = RSAGenerate;
    RSAKey.prototype.decrypt = RSADecrypt;
    (function () {
        var RSAGenerateAsync = function (B, E, callback) {
            var rng = new SecureRandom();
            var qs = B >> 1;
            this.e = parseInt(E, 16);
            var ee = new BigInteger(E, 16);
            var rsa = this;
            var loop1 = function () {
                var loop4 = function () {
                    if (rsa.p.compareTo(rsa.q) <= 0) {
                        var t = rsa.p;
                        rsa.p = rsa.q;
                        rsa.q = t;
                    }
                    var p1 = rsa.p.subtract(BigInteger.ONE);
                    var q1 = rsa.q.subtract(BigInteger.ONE);
                    var phi = p1.multiply(q1);
                    if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                        rsa.n = rsa.p.multiply(rsa.q);
                        rsa.d = ee.modInverse(phi);
                        rsa.dmp1 = rsa.d.mod(p1);
                        rsa.dmq1 = rsa.d.mod(q1);
                        rsa.coeff = rsa.q.modInverse(rsa.p);
                        setTimeout(function () {
                            callback()
                        }, 0);
                    } else {
                        setTimeout(loop1, 0);
                    }
                };
                var loop3 = function () {
                    rsa.q = nbi();
                    rsa.q.fromNumberAsync(qs, 1, rng, function () {
                        rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
                            if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                                setTimeout(loop4, 0);
                            } else {
                                setTimeout(loop3, 0);
                            }
                        });
                    });
                };
                var loop2 = function () {
                    rsa.p = nbi();
                    rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
                        rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
                            if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                                setTimeout(loop3, 0);
                            } else {
                                setTimeout(loop2, 0);
                            }
                        });
                    });
                };
                setTimeout(loop2, 0);
            };
            setTimeout(loop1, 0);
        };
        RSAKey.prototype.generateAsync = RSAGenerateAsync;
        var bnGCDAsync = function (a, callback) {
            var x = (this.s < 0) ? this.negate() : this.clone();
            var y = (a.s < 0) ? a.negate() : a.clone();
            if (x.compareTo(y) < 0) {
                var t = x;
                x = y;
                y = t;
            }
            var i = x.getLowestSetBit(),
                g = y.getLowestSetBit();
            if (g < 0) {
                callback(x);
                return;
            }
            if (i < g) g = i;
            if (g > 0) {
                x.rShiftTo(g, x);
                y.rShiftTo(g, y);
            }
            var gcda1 = function () {
                if ((i = x.getLowestSetBit()) > 0) {
                    x.rShiftTo(i, x);
                }
                if ((i = y.getLowestSetBit()) > 0) {
                    y.rShiftTo(i, y);
                }
                if (x.compareTo(y) >= 0) {
                    x.subTo(y, x);
                    x.rShiftTo(1, x);
                } else {
                    y.subTo(x, y);
                    y.rShiftTo(1, y);
                } if (!(x.signum() > 0)) {
                    if (g > 0) y.lShiftTo(g, y);
                    setTimeout(function () {
                        callback(y)
                    }, 0);
                } else {
                    setTimeout(gcda1, 0);
                }
            };
            setTimeout(gcda1, 10);
        };
        BigInteger.prototype.gcda = bnGCDAsync;
        var bnpFromNumberAsync = function (a, b, c, callback) {
            if ("number" == typeof b) {
                if (a < 2) {
                    this.fromInt(1);
                } else {
                    this.fromNumber(a, c);
                    if (!this.testBit(a - 1)) {
                        this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                    }
                    if (this.isEven()) {
                        this.dAddOffset(1, 0);
                    }
                    var bnp = this;
                    var bnpfn1 = function () {
                        bnp.dAddOffset(2, 0);
                        if (bnp.bitLength() > a) bnp.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp);
                        if (bnp.isProbablePrime(b)) {
                            setTimeout(function () {
                                callback()
                            }, 0);
                        } else {
                            setTimeout(bnpfn1, 0);
                        }
                    };
                    setTimeout(bnpfn1, 0);
                }
            } else {
                var x = new Array(),
                    t = a & 7;
                x.length = (a >> 3) + 1;
                b.nextBytes(x);
                if (t > 0) x[0] &= ((1 << t) - 1);
                else x[0] = 0;
                this.fromString(x, 256);
            }
        };
        BigInteger.prototype.fromNumberAsync = bnpFromNumberAsync;
    })();
    var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64pad = "=";

    function hex2b64(h) {
        var i;
        var c;
        var ret = "";
        for (i = 0; i + 3 <= h.length; i += 3) {
            c = parseInt(h.substring(i, i + 3), 16);
            ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
        }
        if (i + 1 == h.length) {
            c = parseInt(h.substring(i, i + 1), 16);
            ret += b64map.charAt(c << 2);
        } else if (i + 2 == h.length) {
            c = parseInt(h.substring(i, i + 2), 16);
            ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
        }
        while ((ret.length & 3) > 0) ret += b64pad;
        return ret;
    }

    function b64tohex(s) {
        var ret = ""
        var i;
        var k = 0;
        var slop;
        for (i = 0; i < s.length; ++i) {
            if (s.charAt(i) == b64pad) break;
            v = b64map.indexOf(s.charAt(i));
            if (v < 0) continue;
            if (k == 0) {
                ret += int2char(v >> 2);
                slop = v & 3;
                k = 1;
            } else if (k == 1) {
                ret += int2char((slop << 2) | (v >> 4));
                slop = v & 0xf;
                k = 2;
            } else if (k == 2) {
                ret += int2char(slop);
                ret += int2char(v >> 2);
                slop = v & 3;
                k = 3;
            } else {
                ret += int2char((slop << 2) | (v >> 4));
                ret += int2char(v & 0xf);
                k = 0;
            }
        }
        if (k == 1) ret += int2char(slop << 2);
        return ret;
    }

    function b64toBA(s) {
            var h = b64tohex(s);
            var i;
            var a = new Array();
            for (i = 0; 2 * i < h.length; ++i) {
                a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
            }
            return a;
        }
        /*! asn1-1.0.2.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
         */
    var JSX = JSX || {};
    JSX.env = JSX.env || {};
    var L = JSX,
        OP = Object.prototype,
        FUNCTION_TOSTRING = '[object Function]',
        ADD = ["toString", "valueOf"];
    JSX.env.parseUA = function (agent) {
        var numberify = function (s) {
                var c = 0;
                return parseFloat(s.replace(/\./g, function () {
                    return (c++ == 1) ? '' : '.';
                }));
            },
            nav = navigator,
            o = {
                ie: 0,
                opera: 0,
                gecko: 0,
                webkit: 0,
                chrome: 0,
                mobile: null,
                air: 0,
                ipad: 0,
                iphone: 0,
                ipod: 0,
                ios: null,
                android: 0,
                webos: 0,
                caja: nav && nav.cajaVersion,
                secure: false,
                os: null
            },
            ua = agent || (navigator && navigator.userAgent),
            loc = window && window.location,
            href = loc && loc.href,
            m;
        o.secure = href && (href.toLowerCase().indexOf("https") === 0);
        if (ua) {
            if ((/windows|win32/i).test(ua)) {
                o.os = 'windows';
            } else if ((/macintosh/i).test(ua)) {
                o.os = 'macintosh';
            } else if ((/rhino/i).test(ua)) {
                o.os = 'rhino';
            }
            if ((/KHTML/).test(ua)) {
                o.webkit = 1;
            }
            m = ua.match(/AppleWebKit\/([^\s]*)/);
            if (m && m[1]) {
                o.webkit = numberify(m[1]);
                if (/ Mobile\//.test(ua)) {
                    o.mobile = 'Apple';
                    m = ua.match(/OS ([^\s]*)/);
                    if (m && m[1]) {
                        m = numberify(m[1].replace('_', '.'));
                    }
                    o.ios = m;
                    o.ipad = o.ipod = o.iphone = 0;
                    m = ua.match(/iPad|iPod|iPhone/);
                    if (m && m[0]) {
                        o[m[0].toLowerCase()] = o.ios;
                    }
                } else {
                    m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                    if (m) {
                        o.mobile = m[0];
                    }
                    if (/webOS/.test(ua)) {
                        o.mobile = 'WebOS';
                        m = ua.match(/webOS\/([^\s]*);/);
                        if (m && m[1]) {
                            o.webos = numberify(m[1]);
                        }
                    }
                    if (/ Android/.test(ua)) {
                        o.mobile = 'Android';
                        m = ua.match(/Android ([^\s]*);/);
                        if (m && m[1]) {
                            o.android = numberify(m[1]);
                        }
                    }
                }
                m = ua.match(/Chrome\/([^\s]*)/);
                if (m && m[1]) {
                    o.chrome = numberify(m[1]);
                } else {
                    m = ua.match(/AdobeAIR\/([^\s]*)/);
                    if (m) {
                        o.air = m[0];
                    }
                }
            }
            if (!o.webkit) {
                m = ua.match(/Opera[\s\/]([^\s]*)/);
                if (m && m[1]) {
                    o.opera = numberify(m[1]);
                    m = ua.match(/Version\/([^\s]*)/);
                    if (m && m[1]) {
                        o.opera = numberify(m[1]);
                    }
                    m = ua.match(/Opera Mini[^;]*/);
                    if (m) {
                        o.mobile = m[0];
                    }
                } else {
                    m = ua.match(/MSIE\s([^;]*)/);
                    if (m && m[1]) {
                        o.ie = numberify(m[1]);
                    } else {
                        m = ua.match(/Gecko\/([^\s]*)/);
                        if (m) {
                            o.gecko = 1;
                            m = ua.match(/rv:([^\s\)]*)/);
                            if (m && m[1]) {
                                o.gecko = numberify(m[1]);
                            }
                        }
                    }
                }
            }
        }
        return o;
    };
    JSX.env.ua = JSX.env.parseUA();
    JSX.isFunction = function (o) {
        return (typeof o === 'function') || OP.toString.apply(o) === FUNCTION_TOSTRING;
    };
    JSX._IEEnumFix = (JSX.env.ua.ie) ? function (r, s) {
        var i, fname, f;
        for (i = 0; i < ADD.length; i = i + 1) {
            fname = ADD[i];
            f = s[fname];
            if (L.isFunction(f) && f != OP[fname]) {
                r[fname] = f;
            }
        }
    } : function () {};
    JSX.extend = function (subc, superc, overrides) {
        if (!superc || !subc) {
            throw new Error("extend failed, please check that " + "all dependencies are included.");
        }
        var F = function () {},
            i;
        F.prototype = superc.prototype;
        subc.prototype = new F();
        subc.prototype.constructor = subc;
        subc.superclass = superc.prototype;
        if (superc.prototype.constructor == OP.constructor) {
            superc.prototype.constructor = superc;
        }
        if (overrides) {
            for (i in overrides) {
                if (L.hasOwnProperty(overrides, i)) {
                    subc.prototype[i] = overrides[i];
                }
            }
            L._IEEnumFix(subc.prototype, overrides);
        }
    };
    if (typeof KJUR == "undefined" || !KJUR) KJUR = {};
    if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};
    KJUR.asn1.ASN1Util = new function () {
        this.integerToByteHex = function (i) {
            var h = i.toString(16);
            if ((h.length % 2) == 1) h = '0' + h;
            return h;
        };
        this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
            var h = bigIntegerValue.toString(16);
            if (h.substr(0, 1) != '-') {
                if (h.length % 2 == 1) {
                    h = '0' + h;
                } else {
                    if (!h.match(/^[0-7]/)) {
                        h = '00' + h;
                    }
                }
            } else {
                var hPos = h.substr(1);
                var xorLen = hPos.length;
                if (xorLen % 2 == 1) {
                    xorLen += 1;
                } else {
                    if (!h.match(/^[0-7]/)) {
                        xorLen += 2;
                    }
                }
                var hMask = '';
                for (var i = 0; i < xorLen; i++) {
                    hMask += 'f';
                }
                var biMask = new BigInteger(hMask, 16);
                var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
                h = biNeg.toString(16).replace(/^-/, '');
            }
            return h;
        };
        this.getPEMStringFromHex = function (dataHex, pemHeader) {
            var dataWA = CryptoJS.enc.Hex.parse(dataHex);
            var dataB64 = CryptoJS.enc.Base64.stringify(dataWA);
            var pemBody = dataB64.replace(/(.{64})/g, "$1\r\n");
            pemBody = pemBody.replace(/\r\n$/, '');
            return "-----BEGIN " + pemHeader + "-----\r\n" + pemBody + "\r\n-----END " + pemHeader + "-----\r\n";
        };
    };
    KJUR.asn1.ASN1Object = function () {
        var isModified = true;
        var hTLV = null;
        var hT = '00'
        var hL = '00';
        var hV = '';
        this.getLengthHexFromValue = function () {
            if (typeof this.hV == "undefined" || this.hV == null) {
                throw "this.hV is null or undefined.";
            }
            if (this.hV.length % 2 == 1) {
                throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
            }
            var n = this.hV.length / 2;
            var hN = n.toString(16);
            if (hN.length % 2 == 1) {
                hN = "0" + hN;
            }
            if (n < 128) {
                return hN;
            } else {
                var hNlen = hN.length / 2;
                if (hNlen > 15) {
                    throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
                }
                var head = 128 + hNlen;
                return head.toString(16) + hN;
            }
        };
        this.getEncodedHex = function () {
            if (this.hTLV == null || this.isModified) {
                this.hV = this.getFreshValueHex();
                this.hL = this.getLengthHexFromValue();
                this.hTLV = this.hT + this.hL + this.hV;
                this.isModified = false;
            }
            return this.hTLV;
        };
        this.getValueHex = function () {
            this.getEncodedHex();
            return this.hV;
        }
        this.getFreshValueHex = function () {
            return '';
        };
    };
    KJUR.asn1.DERAbstractString = function (params) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        var s = null;
        var hV = null;
        this.getString = function () {
            return this.s;
        };
        this.setString = function (newS) {
            this.hTLV = null;
            this.isModified = true;
            this.s = newS;
            this.hV = stohex(this.s);
        };
        this.setStringHex = function (newHexString) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = newHexString;
        };
        this.getFreshValueHex = function () {
            return this.hV;
        };
        if (typeof params != "undefined") {
            if (typeof params['str'] != "undefined") {
                this.setString(params['str']);
            } else if (typeof params['hex'] != "undefined") {
                this.setStringHex(params['hex']);
            }
        }
    };
    JSX.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERAbstractTime = function (params) {
        KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
        var s = null;
        var date = null;
        this.localDateToUTC = function (d) {
            utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            var utcDate = new Date(utc);
            return utcDate;
        };
        this.formatDate = function (dateObject, type) {
            var pad = this.zeroPadding;
            var d = this.localDateToUTC(dateObject);
            var year = String(d.getFullYear());
            if (type == 'utc') year = year.substr(2, 2);
            var month = pad(String(d.getMonth() + 1), 2);
            var day = pad(String(d.getDate()), 2);
            var hour = pad(String(d.getHours()), 2);
            var min = pad(String(d.getMinutes()), 2);
            var sec = pad(String(d.getSeconds()), 2);
            return year + month + day + hour + min + sec + 'Z';
        };
        this.zeroPadding = function (s, len) {
            if (s.length >= len) return s;
            return new Array(len - s.length + 1).join('0') + s;
        };
        this.getString = function () {
            return this.s;
        };
        this.setString = function (newS) {
            this.hTLV = null;
            this.isModified = true;
            this.s = newS;
            this.hV = stohex(this.s);
        };
        this.setByDateValue = function (year, month, day, hour, min, sec) {
            var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
            this.setByDate(dateObject);
        };
        this.getFreshValueHex = function () {
            return this.hV;
        };
    };
    JSX.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERAbstractStructured = function (params) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        var asn1Array = null;
        this.setByASN1ObjectArray = function (asn1ObjectArray) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array = asn1ObjectArray;
        };
        this.appendASN1Object = function (asn1Object) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array.push(asn1Object);
        };
        this.asn1Array = new Array();
        if (typeof params != "undefined") {
            if (typeof params['array'] != "undefined") {
                this.asn1Array = params['array'];
            }
        }
    };
    JSX.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERBoolean = function () {
        KJUR.asn1.DERBoolean.superclass.constructor.call(this);
        this.hT = "01";
        this.hTLV = "0101ff";
    };
    JSX.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERInteger = function (params) {
        KJUR.asn1.DERInteger.superclass.constructor.call(this);
        this.hT = "02";
        this.setByBigInteger = function (bigIntegerValue) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
        };
        this.setByInteger = function (intValue) {
            var bi = new BigInteger(String(intValue), 10);
            this.setByBigInteger(bi);
        };
        this.setValueHex = function (newHexString) {
            this.hV = newHexString;
        };
        this.getFreshValueHex = function () {
            return this.hV;
        };
        if (typeof params != "undefined") {
            if (typeof params['bigint'] != "undefined") {
                this.setByBigInteger(params['bigint']);
            } else if (typeof params['int'] != "undefined") {
                this.setByInteger(params['int']);
            } else if (typeof params['hex'] != "undefined") {
                this.setValueHex(params['hex']);
            }
        }
    };
    JSX.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERBitString = function (params) {
        KJUR.asn1.DERBitString.superclass.constructor.call(this);
        this.hT = "03";
        this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = newHexStringIncludingUnusedBits;
        };
        this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
            if (unusedBits < 0 || 7 < unusedBits) {
                throw "unused bits shall be from 0 to 7: u = " + unusedBits;
            }
            var hUnusedBits = "0" + unusedBits;
            this.hTLV = null;
            this.isModified = true;
            this.hV = hUnusedBits + hValue;
        };
        this.setByBinaryString = function (binaryString) {
            binaryString = binaryString.replace(/0+$/, '');
            var unusedBits = 8 - binaryString.length % 8;
            if (unusedBits == 8) unusedBits = 0;
            for (var i = 0; i <= unusedBits; i++) {
                binaryString += '0';
            }
            var h = '';
            for (var i = 0; i < binaryString.length - 1; i += 8) {
                var b = binaryString.substr(i, 8);
                var x = parseInt(b, 2).toString(16);
                if (x.length == 1) x = '0' + x;
                h += x;
            }
            this.hTLV = null;
            this.isModified = true;
            this.hV = '0' + unusedBits + h;
        };
        this.setByBooleanArray = function (booleanArray) {
            var s = '';
            for (var i = 0; i < booleanArray.length; i++) {
                if (booleanArray[i] == true) {
                    s += '1';
                } else {
                    s += '0';
                }
            }
            this.setByBinaryString(s);
        };
        this.newFalseArray = function (nLength) {
            var a = new Array(nLength);
            for (var i = 0; i < nLength; i++) {
                a[i] = false;
            }
            return a;
        };
        this.getFreshValueHex = function () {
            return this.hV;
        };
        if (typeof params != "undefined") {
            if (typeof params['hex'] != "undefined") {
                this.setHexValueIncludingUnusedBits(params['hex']);
            } else if (typeof params['bin'] != "undefined") {
                this.setByBinaryString(params['bin']);
            } else if (typeof params['array'] != "undefined") {
                this.setByBooleanArray(params['array']);
            }
        }
    };
    JSX.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
    KJUR.asn1.DEROctetString = function (params) {
        KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
        this.hT = "04";
    };
    JSX.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERNull = function () {
        KJUR.asn1.DERNull.superclass.constructor.call(this);
        this.hT = "05";
        this.hTLV = "0500";
    };
    JSX.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERObjectIdentifier = function (params) {
        var itox = function (i) {
            var h = i.toString(16);
            if (h.length == 1) h = '0' + h;
            return h;
        };
        var roidtox = function (roid) {
            var h = '';
            var bi = new BigInteger(roid, 10);
            var b = bi.toString(2);
            var padLen = 7 - b.length % 7;
            if (padLen == 7) padLen = 0;
            var bPad = '';
            for (var i = 0; i < padLen; i++) bPad += '0';
            b = bPad + b;
            for (var i = 0; i < b.length - 1; i += 7) {
                var b8 = b.substr(i, 7);
                if (i != b.length - 7) b8 = '1' + b8;
                h += itox(parseInt(b8, 2));
            }
            return h;
        }
        KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
        this.hT = "06";
        this.setValueHex = function (newHexString) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = newHexString;
        };
        this.setValueOidString = function (oidString) {
            if (!oidString.match(/^[0-9.]+$/)) {
                throw "malformed oid string: " + oidString;
            }
            var h = '';
            var a = oidString.split('.');
            var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
            h += itox(i0);
            a.splice(0, 2);
            for (var i = 0; i < a.length; i++) {
                h += roidtox(a[i]);
            }
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = h;
        };
        this.setValueName = function (oidName) {
            if (typeof KJUR.asn1.x509.OID.name2oidList[oidName] != "undefined") {
                var oid = KJUR.asn1.x509.OID.name2oidList[oidName];
                this.setValueOidString(oid);
            } else {
                throw "DERObjectIdentifier oidName undefined: " + oidName;
            }
        };
        this.getFreshValueHex = function () {
            return this.hV;
        };
        if (typeof params != "undefined") {
            if (typeof params['oid'] != "undefined") {
                this.setValueOidString(params['oid']);
            } else if (typeof params['hex'] != "undefined") {
                this.setValueHex(params['hex']);
            } else if (typeof params['name'] != "undefined") {
                this.setValueName(params['name']);
            }
        }
    };
    JSX.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERUTF8String = function (params) {
        KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
        this.hT = "0c";
    };
    JSX.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERNumericString = function (params) {
        KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
        this.hT = "12";
    };
    JSX.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERPrintableString = function (params) {
        KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
        this.hT = "13";
    };
    JSX.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERTeletexString = function (params) {
        KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
        this.hT = "14";
    };
    JSX.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERIA5String = function (params) {
        KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
        this.hT = "16";
    };
    JSX.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERUTCTime = function (params) {
        KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
        this.hT = "17";
        this.setByDate = function (dateObject) {
            this.hTLV = null;
            this.isModified = true;
            this.date = dateObject;
            this.s = this.formatDate(this.date, 'utc');
            this.hV = stohex(this.s);
        };
        if (typeof params != "undefined") {
            if (typeof params['str'] != "undefined") {
                this.setString(params['str']);
            } else if (typeof params['hex'] != "undefined") {
                this.setStringHex(params['hex']);
            } else if (typeof params['date'] != "undefined") {
                this.setByDate(params['date']);
            }
        }
    };
    JSX.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
    KJUR.asn1.DERGeneralizedTime = function (params) {
        KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
        this.hT = "18";
        this.setByDate = function (dateObject) {
            this.hTLV = null;
            this.isModified = true;
            this.date = dateObject;
            this.s = this.formatDate(this.date, 'gen');
            this.hV = stohex(this.s);
        };
        if (typeof params != "undefined") {
            if (typeof params['str'] != "undefined") {
                this.setString(params['str']);
            } else if (typeof params['hex'] != "undefined") {
                this.setStringHex(params['hex']);
            } else if (typeof params['date'] != "undefined") {
                this.setByDate(params['date']);
            }
        }
    };
    JSX.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
    KJUR.asn1.DERSequence = function (params) {
        KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
        this.hT = "30";
        this.getFreshValueHex = function () {
            var h = '';
            for (var i = 0; i < this.asn1Array.length; i++) {
                var asn1Obj = this.asn1Array[i];
                h += asn1Obj.getEncodedHex();
            }
            this.hV = h;
            return this.hV;
        };
    };
    JSX.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
    KJUR.asn1.DERSet = function (params) {
        KJUR.asn1.DERSet.superclass.constructor.call(this, params);
        this.hT = "31";
        this.getFreshValueHex = function () {
            var a = new Array();
            for (var i = 0; i < this.asn1Array.length; i++) {
                var asn1Obj = this.asn1Array[i];
                a.push(asn1Obj.getEncodedHex());
            }
            a.sort();
            this.hV = a.join('');
            return this.hV;
        };
    };
    JSX.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
    KJUR.asn1.DERTaggedObject = function (params) {
        KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
        this.hT = "a0";
        this.hV = '';
        this.isExplicit = true;
        this.asn1Object = null;
        this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
            this.hT = tagNoHex;
            this.isExplicit = isExplicitFlag;
            this.asn1Object = asn1Object;
            if (this.isExplicit) {
                this.hV = this.asn1Object.getEncodedHex();
                this.hTLV = null;
                this.isModified = true;
            } else {
                this.hV = null;
                this.hTLV = asn1Object.getEncodedHex();
                this.hTLV = this.hTLV.replace(/^../, tagNoHex);
                this.isModified = false;
            }
        };
        this.getFreshValueHex = function () {
            return this.hV;
        };
        if (typeof params != "undefined") {
            if (typeof params['tag'] != "undefined") {
                this.hT = params['tag'];
            }
            if (typeof params['explicit'] != "undefined") {
                this.isExplicit = params['explicit'];
            }
            if (typeof params['obj'] != "undefined") {
                this.asn1Object = params['obj'];
                this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
            }
        }
    };
    JSX.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
    (function (undefined) {
        "use strict";
        var Hex = {},
            decoder;
        Hex.decode = function (a) {
            var i;
            if (decoder === undefined) {
                var hex = "0123456789ABCDEF",
                    ignore = " \f\n\r\t\u00A0\u2028\u2029";
                decoder = [];
                for (i = 0; i < 16; ++i) decoder[hex.charAt(i)] = i;
                hex = hex.toLowerCase();
                for (i = 10; i < 16; ++i) decoder[hex.charAt(i)] = i;
                for (i = 0; i < ignore.length; ++i) decoder[ignore.charAt(i)] = -1;
            }
            var out = [],
                bits = 0,
                char_count = 0;
            for (i = 0; i < a.length; ++i) {
                var c = a.charAt(i);
                if (c == '=') break;
                c = decoder[c];
                if (c == -1) continue;
                if (c === undefined) throw 'Illegal character at offset ' + i;
                bits |= c;
                if (++char_count >= 2) {
                    out[out.length] = bits;
                    bits = 0;
                    char_count = 0;
                } else {
                    bits <<= 4;
                }
            }
            if (char_count) throw "Hex encoding incomplete: 4 bits missing";
            return out;
        };
        window.Hex = Hex;
    })();
    (function (undefined) {
        "use strict";
        var Base64 = {},
            decoder;
        Base64.decode = function (a) {
            var i;
            if (decoder === undefined) {
                var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    ignore = "= \f\n\r\t\u00A0\u2028\u2029";
                decoder = [];
                for (i = 0; i < 64; ++i) decoder[b64.charAt(i)] = i;
                for (i = 0; i < ignore.length; ++i) decoder[ignore.charAt(i)] = -1;
            }
            var out = [];
            var bits = 0,
                char_count = 0;
            for (i = 0; i < a.length; ++i) {
                var c = a.charAt(i);
                if (c == '=') break;
                c = decoder[c];
                if (c == -1) continue;
                if (c === undefined) throw 'Illegal character at offset ' + i;
                bits |= c;
                if (++char_count >= 4) {
                    out[out.length] = (bits >> 16);
                    out[out.length] = (bits >> 8) & 0xFF;
                    out[out.length] = bits & 0xFF;
                    bits = 0;
                    char_count = 0;
                } else {
                    bits <<= 6;
                }
            }
            switch (char_count) {
            case 1:
                throw "Base64 encoding incomplete: at least 2 bits missing";
            case 2:
                out[out.length] = (bits >> 10);
                break;
            case 3:
                out[out.length] = (bits >> 16);
                out[out.length] = (bits >> 8) & 0xFF;
                break;
            }
            return out;
        };
        Base64.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
        Base64.unarmor = function (a) {
            var m = Base64.re.exec(a);
            if (m) {
                if (m[1]) a = m[1];
                else if (m[2]) a = m[2];
                else
                    throw "RegExp out of sync";
            }
            return Base64.decode(a);
        };
        window.Base64 = Base64;
    })();
    (function (undefined) {
        "use strict";
        var hardLimit = 100,
            ellipsis = "\u2026",
            DOM = {
                tag: function (tagName, className) {
                    var t = document.createElement(tagName);
                    t.className = className;
                    return t;
                }, text: function (str) {
                    return document.createTextNode(str);
                }
            };

        function Stream(enc, pos) {
            if (enc instanceof Stream) {
                this.enc = enc.enc;
                this.pos = enc.pos;
            } else {
                this.enc = enc;
                this.pos = pos;
            }
        }
        Stream.prototype.get = function (pos) {
            if (pos === undefined) pos = this.pos++;
            if (pos >= this.enc.length) throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
            return this.enc[pos];
        };
        Stream.prototype.hexDigits = "0123456789ABCDEF";
        Stream.prototype.hexByte = function (b) {
            return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
        };
        Stream.prototype.hexDump = function (start, end, raw) {
            var s = "";
            for (var i = start; i < end; ++i) {
                s += this.hexByte(this.get(i));
                if (raw !== true) switch (i & 0xF) {
                case 0x7:
                    s += "  ";
                    break;
                case 0xF:
                    s += "\n";
                    break;
                default:
                    s += " ";
                }
            }
            return s;
        };
        Stream.prototype.parseStringISO = function (start, end) {
            var s = "";
            for (var i = start; i < end; ++i) s += String.fromCharCode(this.get(i));
            return s;
        };
        Stream.prototype.parseStringUTF = function (start, end) {
            var s = "";
            for (var i = start; i < end;) {
                var c = this.get(i++);
                if (c < 128) s += String.fromCharCode(c);
                else if ((c > 191) && (c < 224)) s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));
                else
                    s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));
            }
            return s;
        };
        Stream.prototype.parseStringBMP = function (start, end) {
            var str = ""
            for (var i = start; i < end; i += 2) {
                var high_byte = this.get(i);
                var low_byte = this.get(i + 1);
                str += String.fromCharCode((high_byte << 8) + low_byte);
            }
            return str;
        };
        Stream.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        Stream.prototype.parseTime = function (start, end) {
            var s = this.parseStringISO(start, end),
                m = this.reTime.exec(s);
            if (!m) return "Unrecognized time: " + s;
            s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
            if (m[5]) {
                s += ":" + m[5];
                if (m[6]) {
                    s += ":" + m[6];
                    if (m[7]) s += "." + m[7];
                }
            }
            if (m[8]) {
                s += " UTC";
                if (m[8] != 'Z') {
                    s += m[8];
                    if (m[9]) s += ":" + m[9];
                }
            }
            return s;
        };
        Stream.prototype.parseInteger = function (start, end) {
            var len = end - start;
            if (len > 4) {
                len <<= 3;
                var s = this.get(start);
                if (s === 0) len -= 8;
                else
                    while (s < 128) {
                        s <<= 1;
                        --len;
                    }
                return "(" + len + " bit)";
            }
            var n = 0;
            for (var i = start; i < end; ++i) n = (n << 8) | this.get(i);
            return n;
        };
        Stream.prototype.parseBitString = function (start, end) {
            var unusedBit = this.get(start),
                lenBit = ((end - start - 1) << 3) - unusedBit,
                s = "(" + lenBit + " bit)";
            if (lenBit <= 20) {
                var skip = unusedBit;
                s += " ";
                for (var i = end - 1; i > start; --i) {
                    var b = this.get(i);
                    for (var j = skip; j < 8; ++j) s += (b >> j) & 1 ? "1" : "0";
                    skip = 0;
                }
            }
            return s;
        };
        Stream.prototype.parseOctetString = function (start, end) {
            var len = end - start,
                s = "(" + len + " byte) ";
            if (len > hardLimit) end = start + hardLimit;
            for (var i = start; i < end; ++i) s += this.hexByte(this.get(i));
            if (len > hardLimit) s += ellipsis;
            return s;
        };
        Stream.prototype.parseOID = function (start, end) {
            var s = '',
                n = 0,
                bits = 0;
            for (var i = start; i < end; ++i) {
                var v = this.get(i);
                n = (n << 7) | (v & 0x7F);
                bits += 7;
                if (!(v & 0x80)) {
                    if (s === '') {
                        var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                        s = m + "." + (n - m * 40);
                    } else
                        s += "." + ((bits >= 31) ? "bigint" : n);
                    n = bits = 0;
                }
            }
            return s;
        };

        function ASN1(stream, header, length, tag, sub) {
            this.stream = stream;
            this.header = header;
            this.length = length;
            this.tag = tag;
            this.sub = sub;
        }
        ASN1.prototype.typeName = function () {
            if (this.tag === undefined) return "unknown";
            var tagClass = this.tag >> 6,
                tagConstructed = (this.tag >> 5) & 1,
                tagNumber = this.tag & 0x1F;
            switch (tagClass) {
            case 0:
                switch (tagNumber) {
                case 0x00:
                    return "EOC";
                case 0x01:
                    return "BOOLEAN";
                case 0x02:
                    return "INTEGER";
                case 0x03:
                    return "BIT_STRING";
                case 0x04:
                    return "OCTET_STRING";
                case 0x05:
                    return "NULL";
                case 0x06:
                    return "OBJECT_IDENTIFIER";
                case 0x07:
                    return "ObjectDescriptor";
                case 0x08:
                    return "EXTERNAL";
                case 0x09:
                    return "REAL";
                case 0x0A:
                    return "ENUMERATED";
                case 0x0B:
                    return "EMBEDDED_PDV";
                case 0x0C:
                    return "UTF8String";
                case 0x10:
                    return "SEQUENCE";
                case 0x11:
                    return "SET";
                case 0x12:
                    return "NumericString";
                case 0x13:
                    return "PrintableString";
                case 0x14:
                    return "TeletexString";
                case 0x15:
                    return "VideotexString";
                case 0x16:
                    return "IA5String";
                case 0x17:
                    return "UTCTime";
                case 0x18:
                    return "GeneralizedTime";
                case 0x19:
                    return "GraphicString";
                case 0x1A:
                    return "VisibleString";
                case 0x1B:
                    return "GeneralString";
                case 0x1C:
                    return "UniversalString";
                case 0x1E:
                    return "BMPString";
                default:
                    return "Universal_" + tagNumber.toString(16);
                }
            case 1:
                return "Application_" + tagNumber.toString(16);
            case 2:
                return "[" + tagNumber + "]";
            case 3:
                return "Private_" + tagNumber.toString(16);
            }
        };
        ASN1.prototype.reSeemsASCII = /^[ -~]+$/;
        ASN1.prototype.content = function () {
            if (this.tag === undefined) return null;
            var tagClass = this.tag >> 6,
                tagNumber = this.tag & 0x1F,
                content = this.posContent(),
                len = Math.abs(this.length);
            if (tagClass !== 0) {
                if (this.sub !== null) return "(" + this.sub.length + " elem)";
                var s = this.stream.parseStringISO(content, content + Math.min(len, hardLimit));
                if (this.reSeemsASCII.test(s)) return s.substring(0, 2 * hardLimit) + ((s.length > 2 * hardLimit) ? ellipsis : "");
                else
                    return this.stream.parseOctetString(content, content + len);
            }
            switch (tagNumber) {
            case 0x01:
                return (this.stream.get(content) === 0) ? "false" : "true";
            case 0x02:
                return this.stream.parseInteger(content, content + len);
            case 0x03:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len);
            case 0x04:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len);
            case 0x06:
                return this.stream.parseOID(content, content + len);
            case 0x10:
            case 0x11:
                return "(" + this.sub.length + " elem)";
            case 0x0C:
                return this.stream.parseStringUTF(content, content + len);
            case 0x12:
            case 0x13:
            case 0x14:
            case 0x15:
            case 0x16:
            case 0x1A:
                return this.stream.parseStringISO(content, content + len);
            case 0x1E:
                return this.stream.parseStringBMP(content, content + len);
            case 0x17:
            case 0x18:
                return this.stream.parseTime(content, content + len);
            }
            return null;
        };
        ASN1.prototype.toString = function () {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
        };
        ASN1.prototype.print = function (indent) {
            if (indent === undefined) indent = '';
            document.writeln(indent + this);
            if (this.sub !== null) {
                indent += '  ';
                for (var i = 0, max = this.sub.length; i < max; ++i) this.sub[i].print(indent);
            }
        };
        ASN1.prototype.toPrettyString = function (indent) {
            if (indent === undefined) indent = '';
            var s = indent + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0) s += "+";
            s += this.length;
            if (this.tag & 0x20) s += " (constructed)";
            else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null)) s += " (encapsulates)";
            s += "\n";
            if (this.sub !== null) {
                indent += '  ';
                for (var i = 0, max = this.sub.length; i < max; ++i) s += this.sub[i].toPrettyString(indent);
            }
            return s;
        };
        ASN1.prototype.toDOM = function () {
            var node = DOM.tag("div", "node");
            node.asn1 = this;
            var head = DOM.tag("div", "head");
            var s = this.typeName().replace(/_/g, " ");
            head.innerHTML = s;
            var content = this.content();
            if (content !== null) {
                content = String(content).replace(/</g, "&lt;");
                var preview = DOM.tag("span", "preview");
                preview.appendChild(DOM.text(content));
                head.appendChild(preview);
            }
            node.appendChild(head);
            this.node = node;
            this.head = head;
            var value = DOM.tag("div", "value");
            s = "Offset: " + this.stream.pos + "<br/>";
            s += "Length: " + this.header + "+";
            if (this.length >= 0) s += this.length;
            else
                s += (-this.length) + " (undefined)"; if (this.tag & 0x20) s += "<br/>(constructed)";
            else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null)) s += "<br/>(encapsulates)";
            if (content !== null) {
                s += "<br/>Value:<br/><b>" + content + "</b>";
                if ((typeof oids === 'object') && (this.tag == 0x06)) {
                    var oid = oids[content];
                    if (oid) {
                        if (oid.d) s += "<br/>" + oid.d;
                        if (oid.c) s += "<br/>" + oid.c;
                        if (oid.w) s += "<br/>(warning!)";
                    }
                }
            }
            value.innerHTML = s;
            node.appendChild(value);
            var sub = DOM.tag("div", "sub");
            if (this.sub !== null) {
                for (var i = 0, max = this.sub.length; i < max; ++i) sub.appendChild(this.sub[i].toDOM());
            }
            node.appendChild(sub);
            head.onclick = function () {
                node.className = (node.className == "node collapsed") ? "node" : "node collapsed";
            };
            return node;
        };
        ASN1.prototype.posStart = function () {
            return this.stream.pos;
        };
        ASN1.prototype.posContent = function () {
            return this.stream.pos + this.header;
        };
        ASN1.prototype.posEnd = function () {
            return this.stream.pos + this.header + Math.abs(this.length);
        };
        ASN1.prototype.fakeHover = function (current) {
            this.node.className += " hover";
            if (current) this.head.className += " hover";
        };
        ASN1.prototype.fakeOut = function (current) {
            var re = / ?hover/;
            this.node.className = this.node.className.replace(re, "");
            if (current) this.head.className = this.head.className.replace(re, "");
        };
        ASN1.prototype.toHexDOM_sub = function (node, className, stream, start, end) {
            if (start >= end) return;
            var sub = DOM.tag("span", className);
            sub.appendChild(DOM.text(stream.hexDump(start, end)));
            node.appendChild(sub);
        };
        ASN1.prototype.toHexDOM = function (root) {
            var node = DOM.tag("span", "hex");
            if (root === undefined) root = node;
            this.head.hexNode = node;
            this.head.onmouseover = function () {
                this.hexNode.className = "hexCurrent";
            };
            this.head.onmouseout = function () {
                this.hexNode.className = "hex";
            };
            node.asn1 = this;
            node.onmouseover = function () {
                var current = !root.selected;
                if (current) {
                    root.selected = this.asn1;
                    this.className = "hexCurrent";
                }
                this.asn1.fakeHover(current);
            };
            node.onmouseout = function () {
                var current = (root.selected == this.asn1);
                this.asn1.fakeOut(current);
                if (current) {
                    root.selected = null;
                    this.className = "hex";
                }
            };
            this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
            this.toHexDOM_sub(node, (this.length >= 0) ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
            if (this.sub === null) node.appendChild(DOM.text(this.stream.hexDump(this.posContent(), this.posEnd())));
            else if (this.sub.length > 0) {
                var first = this.sub[0];
                var last = this.sub[this.sub.length - 1];
                this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
                for (var i = 0, max = this.sub.length; i < max; ++i) node.appendChild(this.sub[i].toHexDOM(root));
                this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
            }
            return node;
        };
        ASN1.prototype.toHexString = function (root) {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };
        ASN1.decodeLength = function (stream) {
            var buf = stream.get(),
                len = buf & 0x7F;
            if (len == buf) return len;
            if (len > 3) throw "Length over 24 bits not supported at position " + (stream.pos - 1);
            if (len === 0) return -1;
            buf = 0;
            for (var i = 0; i < len; ++i) buf = (buf << 8) | stream.get();
            return buf;
        };
        ASN1.hasContent = function (tag, len, stream) {
            if (tag & 0x20) return true;
            if ((tag < 0x03) || (tag > 0x04)) return false;
            var p = new Stream(stream);
            if (tag == 0x03) p.get();
            var subTag = p.get();
            if ((subTag >> 6) & 0x01) return false;
            try {
                var subLength = ASN1.decodeLength(p);
                return ((p.pos - stream.pos) + subLength == len);
            } catch (exception) {
                return false;
            }
        };
        ASN1.decode = function (stream) {
            if (!(stream instanceof Stream)) stream = new Stream(stream, 0);
            var streamStart = new Stream(stream),
                tag = stream.get(),
                len = ASN1.decodeLength(stream),
                header = stream.pos - streamStart.pos,
                sub = null;
            if (ASN1.hasContent(tag, len, stream)) {
                var start = stream.pos;
                if (tag == 0x03) stream.get();
                sub = [];
                if (len >= 0) {
                    var end = start + len;
                    while (stream.pos < end) sub[sub.length] = ASN1.decode(stream);
                    if (stream.pos != end) throw "Content size is not correct for container starting at offset " + start;
                } else {
                    try {
                        for (;;) {
                            var s = ASN1.decode(stream);
                            if (s.tag === 0) break;
                            sub[sub.length] = s;
                        }
                        len = start - stream.pos;
                    } catch (e) {
                        throw "Exception while decoding undefined length content: " + e;
                    }
                }
            } else
                stream.pos += len;
            return new ASN1(streamStart, header, len, tag, sub);
        };
        ASN1.test = function () {
            var test = [{
                value: [0x27],
                expected: 0x27
            }, {
                value: [0x81, 0xC9],
                expected: 0xC9
            }, {
                value: [0x83, 0xFE, 0xDC, 0xBA],
                expected: 0xFEDCBA
            }];
            for (var i = 0, max = test.length; i < max; ++i) {
                var pos = 0,
                    stream = new Stream(test[i].value, 0),
                    res = ASN1.decodeLength(stream);
                if (res != test[i].expected) document.write("In test[" + i + "] expected " + test[i].expected + " got " + res + "\n");
            }
        };
        window.ASN1 = ASN1;
    })();
    ASN1.prototype.getHexStringValue = function () {
        var hexString = this.toHexString();
        var offset = this.header * 2;
        var length = this.length * 2;
        return hexString.substr(offset, length);
    };
    RSAKey.prototype.parseKey = function (pem) {
        try {
            var modulus = 0;
            var public_exponent = 0;
            var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
            var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
            var asn1 = ASN1.decode(der);
            if (asn1.sub.length === 3) {
                asn1 = asn1.sub[2].sub[0];
            }
            if (asn1.sub.length === 9) {
                modulus = asn1.sub[1].getHexStringValue();
                this.n = parseBigInt(modulus, 16);
                public_exponent = asn1.sub[2].getHexStringValue();
                this.e = parseInt(public_exponent, 16);
                var private_exponent = asn1.sub[3].getHexStringValue();
                this.d = parseBigInt(private_exponent, 16);
                var prime1 = asn1.sub[4].getHexStringValue();
                this.p = parseBigInt(prime1, 16);
                var prime2 = asn1.sub[5].getHexStringValue();
                this.q = parseBigInt(prime2, 16);
                var exponent1 = asn1.sub[6].getHexStringValue();
                this.dmp1 = parseBigInt(exponent1, 16);
                var exponent2 = asn1.sub[7].getHexStringValue();
                this.dmq1 = parseBigInt(exponent2, 16);
                var coefficient = asn1.sub[8].getHexStringValue();
                this.coeff = parseBigInt(coefficient, 16);
            } else if (asn1.sub.length === 2) {
                var bit_string = asn1.sub[1];
                var sequence = bit_string.sub[0];
                modulus = sequence.sub[0].getHexStringValue();
                this.n = parseBigInt(modulus, 16);
                public_exponent = sequence.sub[1].getHexStringValue();
                this.e = parseInt(public_exponent, 16);
            } else {
                return false;
            }
            return true;
        } catch (ex) {
            return false;
        }
    };
    RSAKey.prototype.getPrivateBaseKey = function () {
        var options = {
            'array': [new KJUR.asn1.DERInteger({
                'int': 0
            }), new KJUR.asn1.DERInteger({
                'bigint': this.n
            }), new KJUR.asn1.DERInteger({
                'int': this.e
            }), new KJUR.asn1.DERInteger({
                'bigint': this.d
            }), new KJUR.asn1.DERInteger({
                'bigint': this.p
            }), new KJUR.asn1.DERInteger({
                'bigint': this.q
            }), new KJUR.asn1.DERInteger({
                'bigint': this.dmp1
            }), new KJUR.asn1.DERInteger({
                'bigint': this.dmq1
            }), new KJUR.asn1.DERInteger({
                'bigint': this.coeff
            })]
        };
        var seq = new KJUR.asn1.DERSequence(options);
        return seq.getEncodedHex();
    };
    RSAKey.prototype.getPrivateBaseKeyB64 = function () {
        return hex2b64(this.getPrivateBaseKey());
    };
    RSAKey.prototype.getPublicBaseKey = function () {
        var options = {
            'array': [new KJUR.asn1.DERObjectIdentifier({
                'oid': '1.2.840.113549.1.1.1'
            }), new KJUR.asn1.DERNull()]
        };
        var first_sequence = new KJUR.asn1.DERSequence(options);
        options = {
            'array': [new KJUR.asn1.DERInteger({
                'bigint': this.n
            }), new KJUR.asn1.DERInteger({
                'int': this.e
            })]
        };
        var second_sequence = new KJUR.asn1.DERSequence(options);
        options = {
            'hex': '00' + second_sequence.getEncodedHex()
        };
        var bit_string = new KJUR.asn1.DERBitString(options);
        options = {
            'array': [first_sequence, bit_string]
        };
        var seq = new KJUR.asn1.DERSequence(options);
        return seq.getEncodedHex();
    };
    RSAKey.prototype.getPublicBaseKeyB64 = function () {
        return hex2b64(this.getPublicBaseKey());
    };
    RSAKey.prototype.wordwrap = function (str, width) {
        width = width || 64;
        if (!str) {
            return str;
        }
        var regex = '(.{1,' + width + '})( +|$\n?)|(.{1,' + width + '})';
        return str.match(RegExp(regex, 'g')).join('\n');
    };
    RSAKey.prototype.getPrivateKey = function () {
        var key = "-----BEGIN RSA PRIVATE KEY-----\n";
        key += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
        key += "-----END RSA PRIVATE KEY-----";
        return key;
    };
    RSAKey.prototype.getPublicKey = function () {
        var key = "-----BEGIN PUBLIC KEY-----\n";
        key += this.wordwrap(this.getPublicBaseKeyB64()) + "\n";
        key += "-----END PUBLIC KEY-----";
        return key;
    };
    RSAKey.prototype.hasPublicKeyProperty = function (obj) {
        obj = obj || {};
        return (obj.hasOwnProperty('n') && obj.hasOwnProperty('e'));
    };
    RSAKey.prototype.hasPrivateKeyProperty = function (obj) {
        obj = obj || {};
        return (obj.hasOwnProperty('n') && obj.hasOwnProperty('e') && obj.hasOwnProperty('d') && obj.hasOwnProperty('p') && obj.hasOwnProperty('q') && obj.hasOwnProperty('dmp1') && obj.hasOwnProperty('dmq1') && obj.hasOwnProperty('coeff'));
    };
    RSAKey.prototype.parsePropertiesFrom = function (obj) {
        this.n = obj.n;
        this.e = obj.e;
        if (obj.hasOwnProperty('d')) {
            this.d = obj.d;
            this.p = obj.p;
            this.q = obj.q;
            this.dmp1 = obj.dmp1;
            this.dmq1 = obj.dmq1;
            this.coeff = obj.coeff;
        }
    };
    var JSEncryptRSAKey = function (key) {
        RSAKey.call(this);
        if (key) {
            if (typeof key === 'string') {
                this.parseKey(key);
            } else if (this.hasPrivateKeyProperty(key) || this.hasPublicKeyProperty(key)) {
                this.parsePropertiesFrom(key);
            }
        }
    };
    JSEncryptRSAKey.prototype = new RSAKey();
    JSEncryptRSAKey.prototype.constructor = JSEncryptRSAKey;
    var JSEncrypt = function (options) {
        options = options || {};
        this.default_key_size = parseInt(options.default_key_size) || 1024;
        this.default_public_exponent = options.default_public_exponent || '010001';
        this.log = options.log || false;
        this.key = null;
    };
    JSEncrypt.prototype.setKey = function (key) {
        if (this.log && this.key) {
            console.warn('A key was already set, overriding existing.');
        }
        this.key = new JSEncryptRSAKey(key);
    };
    JSEncrypt.prototype.setPrivateKey = function (privkey) {
        this.setKey(privkey);
    };
    JSEncrypt.prototype.setPublicKey = function (pubkey) {
        this.setKey(pubkey);
    };
    JSEncrypt.prototype.decrypt = function (string) {
        try {
            return this.getKey().decrypt(b64tohex(string));
        } catch (ex) {
            return false;
        }
    };
    JSEncrypt.prototype.encrypt = function (string) {
        try {
            return hex2b64(this.getKey().encrypt(string));
        } catch (ex) {
            return false;
        }
    };
    JSEncrypt.prototype.getKey = function (cb) {
        if (!this.key) {
            this.key = new JSEncryptRSAKey();
            if (cb && {}.toString.call(cb) === '[object Function]') {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
                return;
            }
            this.key.generate(this.default_key_size, this.default_public_exponent);
        }
        return this.key;
    };
    JSEncrypt.prototype.getPrivateKey = function () {
        return this.getKey().getPrivateKey();
    };
    JSEncrypt.prototype.getPrivateKeyB64 = function () {
        return this.getKey().getPrivateBaseKeyB64();
    };
    JSEncrypt.prototype.getPublicKey = function () {
        return this.getKey().getPublicKey();
    };
    JSEncrypt.prototype.getPublicKeyB64 = function () {
        return this.getKey().getPublicBaseKeyB64();
    };
    JSEncrypt.version = '2.3.1';
    exports.JSEncrypt = JSEncrypt;
});