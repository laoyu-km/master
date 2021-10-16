// if else 优化
// 优化方向 可拓展， 可修改

// 案例
// // 原型
// var calculateBonus = function(salary, level) {
//     if (level === 'A') {
//         return salary * 4;
//     }
//     if (level === 'B') {
//         return salary * 3;
//     }
//     if (level === 'C') {
//         return salary * 2;
//     }
//     if (level === 'D') {
//         return salary * 1;
//     }
// }

// // 策略模式优化
// var obj = {
//     A: function(salary) { return salary * 4 },
//     B: function(salary) { return salary * 3 },
//     C: function(salary) { return salary * 2 },
//     D: function(salary) { return salary * 1 }
// }

// var calculateBonus = function(salary, level) {
//     return obj[level](salary);
// }


// 示例2

var strategies = {
    isNotEmpty: function(val, errMsg) {
        if (val === '') {
            return errMsg;
        }
        return val;
    },

    minLength: function(val, len, errMsg) {
        if (val.length < len) {
            return errMsg;
        }
        return val;
    },

    mobileFormat: function(val, errMsg) {
        if (!/^1[3][5][8][0-9]{9}?/.test(val)) {
            return errMsg;
        }
        return val;
    }
};

registerForm.onsubmit = function(e) {
    var e = e || window.event;
    e.preventDefault();

    strategies['isNotEmpty'](username.val, '用户名不能为空');
    strategies['minLength'](username.length, 6, '用户名长度不能小于6位');
    strategies['minLength'](password.length, 6, '用户名长度不能小于6位');
    strategies['mobileFormat'](phoneNumber, '用户名长度不能小于6位');
}