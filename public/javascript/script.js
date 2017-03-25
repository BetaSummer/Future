$(document).ready(function () {
  $('.progress').hide();
  $('#fullpage').fullpage({
    sectionsColor: ['#f2f2f2', '', '#7BAABE', '#7BAABE'],
    navigation: true,
    navigationPosition: 'right',
    verticalCentered:false,
  });
});

var frm = $('#entryForm');
frm.submit(function (ev) {
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
});

// Easter Egg
console.log(
  '|ˉˉˉˉˉˉˉˉˉ\\ˉ\\ |ˉˉˉˉˉˉˉˉˉˉ|ˉ||ˉˉˉˉˉˉˉˉˉˉˉ|ˉ|     /\\ˉ\\     |ˉ|ˉ|    |ˉ|ˉ| /ˉˉˉˉˉˉˉˉ\\ˉ\\ |ˉ|ˉ|    |ˉ|ˉ| /ˉˉˉˉˉˉˉˉˉ|ˉ||ˉˉˉˉˉˉˉˉˉˉ|ˉ|\n'+
  '| |ˉ|ˉˉˉ\\ | | | |ˉ|ˉˉˉˉˉˉ ˉ ˉˉˉˉˉ| |ˉ|ˉˉˉˉˉ    /  \\ \\    | | |    | | |/ /ˉTˉˉˉˉ\\ \\ \\| | |    | | |/ /ˉ/ˉˉˉˉˉˉˉˉˉ| |ˉ|ˉˉˉˉˉˉ ˉ \n'+
  '|  ˉˉˉˉˉ  / / |  ˉˉˉˉˉˉˉˉ|ˉ|     | | |        / /\\ \\ \\   |  ˉˉˉˉˉˉ  | || | |    | | || | |    | | |\\ ˉˉˉˉˉˉˉˉ\\ˉ\\ |  ˉˉˉˉˉˉˉˉ|ˉ|\n'+
  '| |ˉ|ˉˉˉ\\ \\ \\ | |ˉ|ˉˉˉˉˉˉ ˉ      | | |       / / /\\ \\ \\  | |ˉ|ˉˉˉˉ| | || | |    | | || | |    | | | ˉˉˉˉˉˉˉˉ\\ \\ \\| |ˉ|ˉˉˉˉˉˉ ˉ \n'+
  '| | |   /  | || | |              | | |      /  ˉˉˉˉ  \\ \\ | | |    | | |\\ \\ \\    / / / \\ \\ \\  / / / \\ˉ\\ˉ\\    / / /| | |         \n'+
  '|  ˉˉˉˉˉ  / / |  ˉˉˉˉˉˉˉˉ|ˉ|     | | |     / /ˉ/ˉˉˉˉ\\ \\ \\| | |    | | | \\ ˉˉˉˉˉˉ / /   \\ ˉˉˉˉ / /   \\ ˉˉˉˉˉˉ / / |  ˉˉˉˉˉˉˉˉ|ˉ|\n'+
  'ˉˉˉˉˉˉˉˉˉˉˉˉ  ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ     ˉˉˉˉˉ     ˉˉˉˉ      ˉˉˉˉˉˉˉˉˉ    ˉˉˉˉˉ  ˉˉˉˉˉˉˉˉˉˉ     ˉˉˉˉˉˉˉˉ     ˉˉˉˉˉˉˉˉˉˉ  ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ'
  );