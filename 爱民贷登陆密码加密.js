//https://www.minaiw.com/user-login

function getpwd(pwd){
password = FW_Password(pwd);
return password;
}
function FW_Password(pwd) {
		
    var __LOGIN_KEY = "IzkWrRMzceDkKEVfmgQSWSoFnXUlETgvaXSfITVjnCbwHXpuDZ";//读取网页得时候获取
    return des(escape(__LOGIN_KEY + "%u65B9%u7EF4" + pwd + "%u8F6F%u4EF6"));
}
function des(str) {
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0
      , len = str.length
      , string = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt((c1 & 0x3) << 4);
            string += "==";
            break
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt((c2 & 0xF) << 2);
            string += "=";
            break
        }
        c3 = str.charCodeAt(i++);
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
}