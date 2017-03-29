$(document).ready(function () {
  var times2 = new Array();
  window.$oldcard = $('.card1');
  window.$oldbox = $('.box').eq(0);
  window.count = 0;
  window.canhover = false;

  var browser = {
    versions:function(){
     var u = navigator.userAgent, app = navigator.appVersion;
     return {//移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
   }(),
   language:(navigator.browserLanguage || navigator.language).toLowerCase()
  }
  var IS_PHONE=false;

  if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
    browser.versions.iPhone || browser.versions.iPad){
    IS_PHONE=true;
  }else{
    IS_PHONE=false;
  }

  $('.progress').hide();
  $('#fullpage').fullpage({
    sectionsColor: [ '', '#7BAABE', '#7BAABE'],
    navigation: true,
    navigationPosition: 'right',
    verticalCentered:false,
    afterLoad: function(anchorLink, index) {
      switch (index) {
        case 1:
          $oldcard = $('.card1');
          $oldbox = $('.box:eq(0)');
          count=0;
          $('.brand').addClass('animated about-title');
          times2.push(setTimeout(function(){
            $('.card1').addClass('animated bigger');
            $('.card1').css('z-index', '100');
            times2.push(setTimeout(function(){
              $('.right-box').each(function(index, el) {
                if(index===0){
                  $(this).addClass('animated flipInYFirst');
                }else {
                  $(this).addClass('animated flipInY');
                }

              });
            },500));
            times2.push(setTimeout(function(){
              canhover = true;
            },1000));
          },600));
          break;
        case 2:
          setTimeout(function(){
            for(var i = 0; i < times2.length ; i++ ){
              clearTimeout(times2[i]);
            }
            secondLeave();
          },300)
          break;
      }
    }
  });


  if(IS_PHONE===true){
    // 移动端做的事
    $('.right-box').each(function(index, el) {
      var $this = $(this);

      var $cards = $('.cards');
      $this.click(function(event) {
        if($cards.eq(index).children('h1').text()!=$oldcard.children('h1').text()){
          if(canhover){
            canhover = false;
            if(count === 0){
              $('.box:eq(0)').removeClass('animated flipInYFirst');
              $('.box:eq(0)').addClass('flipInY');
            }
            count++;
            $oldbox.removeClass('animated right-box-hover');
            $this.addClass('animated right-box-hover');
            $cards.eq(index).css('z-index', 1);
            $oldcard.css('z-index', -100);
            $oldbox.removeClass('right-box-hover');
            $('.right-box').prop('disabled', true);
            $cards.eq(index).addClass('animated show-card');
            $oldcard.removeClass('animated show-card');
            $oldcard.removeClass('animated bigger');
            $oldcard.addClass('animated move-card');
            setTimeout(function(){
              $oldcard.removeClass('animated move-card');
              canhover = true;
            },600);
            $oldcard = $cards.eq(index);
            $oldbox = $this;
          }

        }

      });
    });
  }else {
    // 网页端做的事
    $('.right-box').each(function(index, el) {
      $(this).hover(function() {
        var $this = $(this);
        var $cards = $('.cards');
        if($(this).children('p').text() !== $oldbox.children('p').text()){
          if(canhover){
            canhover = false;
            if(count === 0){
              $('.box:eq(0)').removeClass('animated flipInYFirst');
              $('.box:eq(0)').addClass('flipInY');
            }
            $oldbox.removeClass('animated right-box-hover');
            $this.addClass('animated right-box-hover');
            $cards.eq(index).css('z-index', '1');
            $oldcard.css('z-index', '-100');
            $oldbox.removeClass('right-box-hover');
            $('.right-box').prop('disabled', true);
            $cards.eq(index).addClass('animated show-card');
            $oldcard.removeClass('animated show-card');
            $oldcard.removeClass('animated bigger');
            $oldcard.addClass('animated move-card');
            setTimeout(function(){
              $oldcard.removeClass('animated move-card');
              canhover = true;
            },600);
            $oldcard = $cards.eq(index);
            $oldbox = $this;
            count++;
          }
        }else {
        }

      }, function() {

      });
    });
  }


});

var isSubmitted =false;
var frm = $('#entryForm');
frm.submit(function (ev) {
  ev.preventDefault();
  if(isSubmitted) {
    Materialize.toast("请不要重复提交", 3000);
  } else if (!check(this)) {
    return;
  } else {
    var formData = new FormData($(this)[0]);
    $.ajax({
      type: frm.attr('method'),
      url: frm.attr('action'),
      data: formData,
      success: function (data) {
        $('.progress').hide();
        isSubmitted = true;
        Materialize.toast(data.message, 4000);
      },
      error: function (data) {
        $('.progress').hide();
        Materialize.toast(data.message, 4000);
      },
      contentType: false,
      processData: false
    });
    $('.progress').show();
  }
});



/*
$('.right-box').each(function(index, el) {
  var $this = $(this);
  var $cards = $('.cards');
  $this.click(function(event) {
    if($cards.eq(index).children('h1').text()!=$oldcard.children('h1').text()){
      if(canhover){
        canhover = false;
        if(count === 0){
          $('.box:eq(0)').removeClass('animated flipInYFirst');
          $('.box:eq(0)').addClass('animated flipInY');
        }
        $oldbox.removeClass('animated right-box-hover');
        $this.addClass('animated right-box-hover');
        $oldbox.removeClass('right-box-hover');
        $('.right-box').prop('disabled', true);
        $cards.eq(index).addClass('animated show-card');
        $oldcard.removeClass('animated show-card');
        $oldcard.removeClass('animated bigger');
        $oldcard.addClass('animated move-card');
        setTimeout(function(){
          $oldcard.removeClass('animated move-card');
          canhover = true;
          // $('.right-box').prop('disabled', false);
        },600);
        $oldcard = $cards.eq(index);
        $oldbox = $this;
      }

    }

  });
});
*/

function secondLeave(){
  $('.brand').removeClass('animated about-title');
  $('.card1').removeClass('animated bigger');
  $('.right-box').removeClass('animated flipInY flipInYFirst right-box-hover');
  $('.cards').removeClass('animated bigger show-card move-card');

  $oldcard = $('.card1');
  console.log($oldcard);
  $oldbox = $('.box').eq(0)
  count=0;
  canhover = false;
}

// Easter Egg
console.log(
  '|ˉˉˉˉˉˉˉˉˉ\\ˉ\\ |ˉˉˉˉˉˉˉˉˉˉ|ˉ||ˉˉˉˉˉˉˉˉˉˉˉ|ˉ|     /\\ˉ\\     |ˉ|ˉ|    |ˉ|ˉ| /ˉˉˉˉˉˉˉˉ\\ˉ\\ |ˉ|ˉ|    |ˉ|ˉ| /ˉˉˉˉˉˉˉˉˉ|ˉ||ˉˉˉˉˉˉˉˉˉˉ|ˉ|\n' +
  '| |ˉ|ˉˉˉ\\ | | | |ˉ|ˉˉˉˉˉˉ ˉ ˉˉˉˉˉ| |ˉ|ˉˉˉˉˉ    /  \\ \\    | | |    | | |/ /ˉTˉˉˉˉ\\ \\ \\| | |    | | |/ /ˉ/ˉˉˉˉˉˉˉˉˉ| |ˉ|ˉˉˉˉˉˉ ˉ \n' +
  '|  ˉˉˉˉˉ  / / |  ˉˉˉˉˉˉˉˉ|ˉ|     | | |        / /\\ \\ \\   |  ˉˉˉˉˉˉ  | || | |    | | || | |    | | |\\ ˉˉˉˉˉˉˉˉ\\ˉ\\ |  ˉˉˉˉˉˉˉˉ|ˉ|\n' +
  '| |ˉ|ˉˉˉ\\ \\ \\ | |ˉ|ˉˉˉˉˉˉ ˉ      | | |       / / /\\ \\ \\  | |ˉ|ˉˉˉˉ| | || | |    | | || | |    | | | ˉˉˉˉˉˉˉˉ\\ \\ \\| |ˉ|ˉˉˉˉˉˉ ˉ \n' +
  '| | |   /  | || | |              | | |      /  ˉˉˉˉ  \\ \\ | | |    | | |\\ \\ \\    / / / \\ \\ \\  / / / \\ˉ\\ˉ\\    / / /| | |         \n' +
  '|  ˉˉˉˉˉ  / / |  ˉˉˉˉˉˉˉˉ|ˉ|     | | |     / /ˉ/ˉˉˉˉ\\ \\ \\| | |    | | | \\ ˉˉˉˉˉˉ / /   \\ ˉˉˉˉ / /   \\ ˉˉˉˉˉˉ / / |  ˉˉˉˉˉˉˉˉ|ˉ|\n' +
  'ˉˉˉˉˉˉˉˉˉˉˉˉ  ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ     ˉˉˉˉˉ     ˉˉˉˉ      ˉˉˉˉˉˉˉˉˉ    ˉˉˉˉˉ  ˉˉˉˉˉˉˉˉˉˉ     ˉˉˉˉˉˉˉˉ     ˉˉˉˉˉˉˉˉˉˉ  ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ'
);
