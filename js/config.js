/**
 * Created by sean on 17/6/1.
 * screen config
 */
(function(){
    var Setting = {
        logo: './img/logo.png',
        title: {
            state: '安全态势感知',
            access :'访问态势分析',
            attack: '攻击态势分析',
            attacker: '攻击态势分析',
            menace: '深度威胁分析',
            server: '服务器性能监控',
            deal: '威胁处置中心'

        }
    };
    var page = window.location.href.split('screen/')[1].split('.html')[0];
    var CONFIG = {
        Header: {
            el: '.header',
            template: '<img class="logo" src=' + Setting.logo + ' alt="AILPHA"/><h1 class="title">'+Setting.title[page]+'</h1>',
            init: function () {
                $('body').find(this.el).html(' ');
                $('body').find(this.el).append(this.template)
            }
        },
        Nav: {
            el: '.mirror-nav',
            template: '<ul>' +
            '<li><a href="../screen/state.html">安全态势</a></li>' +
            '<li><a href="../screen/access.html">访问态势</a></li>' +
            '<li><a href="../screen/attacker.html">攻击态势</a></li>' +
            '<li><a href="../screen/menace.html">深度威胁</a></li>' +
            // '<li><a href="../screen/server.html">设备监控</a></li>' +
            '</ul>' ,
            init: function(){
                $('body').find(this.el).html(' ');
                $('body').find(this.el).append(this.template);
                var href = window.location.href ;
                $(this.el).find('li a').each(function(){
                    var  aHref = $(this).attr('href');
                    if(aHref.split('screen')[1] == href.split('screen')[1]){
                        $('.mirror-nav li a').removeClass('active');
                        $(this).parent('li').addClass('active');
                    }
                })

            }
        },
        Footer: {
            el: '.footer',
            template: '<p>技术支撑单位：杭州安恒信技术有限公司</p>',
            init: function(){
                $('body').find(this.el).html(' ');
                $('body').find(this.el).append(this.template)
            }
        },
        init: function(){
            $(document).find('title').text(Setting.title[page]);
            CONFIG.Header.init();
            CONFIG.Nav.init();
            CONFIG.Footer.init();
        }
    };
    CONFIG.init();
})()
