// ==UserScript==
// @name         奥鹏在线作业助手
// @namespace    https://github.com/ousui/open-learn-helper
// @version      0.2
// @description  奥鹏在线答题小助手
// @author       shuai.w
// @match        https://learn.open.com.cn/StudentCenter/OnLineJob/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // 页面执行完执行
    var check = setInterval(main, 250);

    function main() {
        if (window.require == null || window.jQuery == null) { return; };
        clearInterval(check);

        // 这里执行比较快，需要延迟执行
        setTimeout(crack_common, 3000);
    }

    function init(common) {
        alert(1);
        alert(common)
    }

    // 破解常规限制：右键、 ctrl+c、 选中禁用
    function crack_common() {
        // 禁用右键
        document.oncontextmenu = function () {
            return true;
        }

        //禁用ctrl+c功能
        document.onkeydown = function () {
            if (event.ctrlKey && window.event.keyCode == 67) {
                return true;
            }
        }

        //禁用选中
        $(document).unbind('selectstart');
    }
})();
