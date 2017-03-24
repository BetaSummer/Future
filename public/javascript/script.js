$(document).ready(function () {
  $('.progress').hide();
  $('#fullpage').fullpage({
    anchors: ['learnCode', 'betaHouse', 'joinUs', 'footer'],
    sectionsColor: ['#f2f2f2', '', '#7BAABE', '#7BAABE'],
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
})