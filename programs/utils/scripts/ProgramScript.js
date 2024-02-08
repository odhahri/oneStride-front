
$(document).ready(function () {
    $('#toggle-sidebar-button').click(function () {
        $('#sidebar').toggleClass('open');
        $('#content').toggleClass('open');
        $('.side-input-hidden').toggleClass('side-input-active');


    });
});
