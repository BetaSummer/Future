$(document).ready(function () {
  var times2 = new Array();


  $('.progress').hide();
  $('#fullpage').fullpage({
    sectionsColor: [ '', '#7BAABE', '#7BAABE'],
    navigation: true,
    navigationPosition: 'right',
    verticalCentered:false,
    afterLoad: function(anchorLink, index) {
      switch (index) {
        case 1:
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
});

var frm = $('#entryForm');
frm.submit(function (ev) {
  if (!check(this)) {
    ev.preventDefault();
  } else {
    ev.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
      type: frm.attr('method'),
      url: frm.attr('action'),
      data: formData,
      success: function (data) {
        $('.progress').hide();
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

var $oldcard = $('.card1');

var $oldbox = $('.box').eq(0);
var count = 0;
var canhover = false;
$('.right-box').each(function(index, el) {
  $(this).hover(function() {
    var $this = $(this);
    var $cards = $('.cards');
    if($(this).children('p').text() !== $oldbox.children('p').text()){
      if(canhover){
        canhover = false;
        if(count === 0){
          $('.box:eq(0)').removeClass('animated flipInYFirst');
          $('.box:eq(0)').addClass('animated flipInY');
        }
        $oldbox.removeClass('animated right-box-hover');
        $this.addClass('animated right-box-hover');
        $cards.eq(index).css('z-index', '100');
        $oldcard.css('z-index', '-1');
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



/*$('.right-box').each(function(index, el) {
  var $this = $(this);
  var $cards = $('.cards');
  $this.hover(function(event) {
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
