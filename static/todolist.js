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

    //// INSERT NEW TASK
    $('#newtask').click(function (event) {
        event.preventDefault();

        // gather input data
        var task_description = $("input[name='tasktext']").val();
        var task_urgent = $('button#taskurgent').hasClass('active');

        // alert( task_description + " " + task_urgent) ;

        // construct JSON for the request
        var jsonData = JSON.stringify({
            'description': task_description,
            'urgent': task_urgent
        });

        // call REST API
        $.ajax({
            'url': "http://localhost:5000/api/v1.0/tasks",
            'method': "POST",
            'data': jsonData,
            'contentType': "application/json",
            'success': function(data) { refreshTasks() }
        });
    });

    //// REFRESH LIST OF TASKS

    function refreshTasks() {

        // get the updated list from the server (call GET /tasks)
        $.ajax({
            'url': "http://localhost:5000/api/v1.0/tasks",
            'method': "GET",
            'dataType': "json",
            'success': function (data, textStatus, jqXHR) {

                // empty the currently shown list (table contents)
                $('tbody#tasklistbody').empty();

                // with the updated list, rebuild the table rows
                for (i = 0; i < data['tasks'].length; i++) {
                    var task_description = data['tasks'][i]['description'];
                    var task_id = data['tasks'][i]['id'];
                    var task_urgent = data['tasks'][i]['urgent'];

                    $('tbody#tasklistbody').append(
                        "<tr data-id='"+task_id+"'>" +
                        "<td>" + task_description + "</td>" +
                        "<td>" + task_urgent + "</td>" + NiceButtons + "</tr>\n");
                }
            }
        });

    }


    // STARTUP TASKS
    refreshTasks();
});

