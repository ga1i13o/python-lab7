const RESTAPI = 'http://localhost:5000/api/v1';
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


    //insert new task
    $('#newtask').click(function (event) {
        event.preventDefault();

        var descr = $("input[name='tasktext']").val();
        var urg = $("button#taskurgent").hasClass('active').toString();

        var data = JSON.stringify({
            'description': descr,
            'urgent': urg
        });

        //call rest api
        $.ajax({
            'url': RESTAPI + "/tasks",
            'method': "POST",
            'data': data,
            'contentType': "application/json",
            'success':function () {
                refreshTasks();
            }
        });
    });

    function refreshTasks(){

        //get list and rebuild
        $.ajax({
            'url':RESTAPI+"/tasks",
            'method':"GET",
            'dataType':"json",
            'success': function (data, textStatus, jqXHR) {
                $('tbody#tasklistbody').empty();

                for( i=0; i < data['tasks'].length; i++){
                    var description = data['tasks'][i]['todo'];
                    var id = data['tasks'][i]['id'];
                    var urgent = data['tasks'][i]['urgency'];

                    $('tbody#tasklistbody').append(
                    "<tr data-id='"+id+"'> <td>"+description+"</td>"+
                    "<td>"+urgent+"</td>"+ NiceButtons +"</tr>"
                    );
                }

                $(".actiondelete").click(function (event) {
                         event.preventDefault();

                         var id = $(this).closest("tr").data("id");
                         $.ajax({
                            'url': RESTAPI+"/tasks/"+id,
                            'method':"DELETE",
                            'success': function () {
                                refreshTasks();
                            }
                    });
    });
            }
        });
    }

    //startup task
    refreshTasks();


});


