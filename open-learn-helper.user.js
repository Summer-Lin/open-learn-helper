// ==UserScript==
// @name         奥鹏在线作业助手
// @namespace    https://github.com/ousui/open-learn-helper
// @version      0.3
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
        
        add_show_btn();
    }

    function init(common) {
        alert(1);
        alert(common)
    }
    
    function add_show_btn() {
        $('.score').append('<span class="marginr30" style="color: blue;" pp>SHOW GO</span>');
        $('.score span[pp]')
            .css({
            "cursor": "pointer",
            "color": "blue"
               })
            .on('click', do_tags);
    }
    
     function do_tags() {
         $('.qestitle').each(function(i, e){
             
             var cont = $(e).parents('.question-cont');
             if (!!cont.attr('_init')) {
                 return;
             }
             cont.attr('_init', true);
             
             var question = $(e).text();
             var equestion = encodeURIComponent(question);

             var outer = cont.find('.qes-title');
             get_forword_tag(outer, 0, "https://www.shangxueba.com/ask/search.aspx?key="+ equestion, "上学吧");
             get_forword_tag(outer, 1, "http://www.baidu.com/s?wd="+ equestion, "百度!");
         });

         fix_width();
    }

    function get_forword_tag(el, i, link, text) {
        el.append('<a ousui-query-'+i+'>').find('a[ousui-query-'+i+']').css({
                 "font-weight": 900,
                 "padding": "0px 5px",
                 "color": "#efefef",
                 "cursor": "pointer",
                 "background": "#ff0000",
                 "text-decoration": "none",
                 "margin-left": "1px"
             }).attr('href', function(){
                 return link;
             }).attr('target', "_blank").html(text);
    }

    function fix_width() {
        $('.blank-title td img').css('width', 'auto');
        $('.question-options li img').css('width', 'auto');
    }

    function request_monitoring() {
        $(document).ajaxComplete(
            function(event, xhr, settings) {

                if (settings.url.indexOf('OnlineJob/DoHomework') <= 0) {
                    return;
                }
                $('.qestitle').each(function(i, e){
                    var question = $(e).text();
                    var equestion = encodeURIComponent(question);
                    var td = $(e).attr('style', '');
                    td.parent().prepend('<td><a href="http://www.baidu.com/s?wd='+ question +'" target="_blank">Q</a></td>');
                    var height = td.height();

                    td.html('<textarea readonly style="width: 100%; border:0; font-weight:400;">'+question+'</textarea>').find('textarea').height(height);
                    // 太丑
                    // var squestion = question.replace(' ）', ' ').replace('（', '').replace('。', '');
                    // td.parent().parent().append('<tr><td colspan="3"><input style="width: 100%; height:20px; font-size: 14px;font-weight:100;" value="' + squestion + '" /></td></tr>');
                });
            }
        );
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
