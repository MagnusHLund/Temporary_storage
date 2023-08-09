const websiteTitle = document.title;

  $(document).ready(function () {
    $('#header-container').load('header.html', function () {
    });
  });
if(websiteTitle != "File Upload") {
  $(document).ready(function () {
    $('#download-container').load('Download.php', function () {
    });
  });
}