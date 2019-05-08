const RESTAPI = 'http://localhost:5000/api/v1.0';
const NiceButtons = '<td><a href="#"><img class="actionicon actiondelete" src="https://img.icons8.com/windows/32/000000/delete/2266EE"></a>' +
    '<a href="#"><img class="actionicon actionedit" src="https://img.icons8.com/windows/32/000000/edit/2266EE"></a></td>';


$(document).ready(function () {

    // for toggle button functionality
    // source: https://www.bootply.com/92189
    $('.btn-toggle').click(function () {
        $(this).find('.btn').toggleClass('active');

        if ($(this).find('.btn-primary').size() > 0) {
            $(this).find('.btn').toggleClass('btn-primary');
        }
        $(this).find('.btn').toggleClass('btn-default');

    });


});

