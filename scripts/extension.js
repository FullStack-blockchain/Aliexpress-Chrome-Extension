$('#status').html('Please Click Track Buttons');

$(".plus").click(function(){
    // alert("ok");
    $('.count').val(parseInt($('.count').val()) + 1 );
});

$(".minus").click(function(){
    $('.count').val(parseInt($('.count').val()) - 1 );
});

function f(){
    alert("wow");
}

$("#addbtn").click(function(){
    var preset = $("#preset").val();
    if (preset != "") {
        $(".buttonslist").append($('<button class="btn btn-primary trackbtn" data-preset='+preset+'>'+preset+'</button>'));
        // $(".buttonslist").append('<script>alert("test")</script>');
        $("#preset").val("");
    }
    else {
        alert("Please Input Preset Text");
    }
});

$(".trackbtn").click(function(){
    var csvbtn = document.getElementById('exportcsv');
    var actions = $(this).attr('data-preset');
    $('#status').html('Clicked '+actions+' Button');
    var text = $('#linkstext').val();
    // if (!text) {
    //     $('#status').html('Invalid text provided');
    //     text = "hello";
    //     return;
    // }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {
            time = parseInt(response.time) + parseInt($('.count').val());
            var hr = "0" + parseInt(time / 3600);
            var m = "0" + parseInt((time % 3600)/60);
            var s = "0" + parseInt(time % 60);
            timestr = hr.substr(-2)+ ':' + m.substr(-2) + ':' + s.substr(-2);
            var status = actions+ ":" + timestr;
            csvbtn.href += "\n" + actions + "," + timestr;
            $('#status').html(status);
            var total = parseInt($('#total').attr('count')) + 1;
            $('#total').attr('count', total)
            $('#total').html('There are ' + total + ' records')
            $('#exportcsv').removeAttr("disabled");
            console.log(response.time);
        });
    });
})

// $('#exportgsheet').click(function(){
//     gapi.client.init({
//         'apiKey': 'AIzaSyCKdJ41GFFIivsBS3krzXnpTmdNVuceG-w'
//     }).then(function(){
//         return gapi.client.request({
//             'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
//         })
//     }).then(function(response){
//         console.log(response.result);
//     }, function(reason){
//         console.log('Error: ' + reason.result.error.message);
//     });
//     gapi.load('client', start);
// });

// $("#preset").change(function(){
//     event.preventDefault();
//     var preset = $("#preset").val();
//     console.log(preset);
//     if (preset == ""){
//         $("#addbtn").prop("disabled",true);
//         console.log("disabled");
//     } else {
//         $("#addbtn").prop("disabled",true);
//         console.log("enabled");
//     }
// });



// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('status').textContent = "Extension loaded";
//     var button = document.getElementById('changelinks');
//     var csvbtn = document.getElementById('exportcsv');

//     button.addEventListener('click', function () {
//         $('#status').html('Clicked change links button');
//         var text = $('#linkstext').val();
//         if (!text) {
//             $('#status').html('Invalid text provided');
//             text = "hello";
//             // return;
//         }
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {
//                 time = parseInt(response.time) + parseInt($('.count').val());
//                 var hr = "0" + parseInt(time / 3600);
//                 var m = "0" + parseInt((time % 3600)/60);
//                 var s = "0" + parseInt(time % 60);
//                 timestr = hr.substr(-2)+ ':' + m.substr(-2) + ':' + s.substr(-2);
//                 var status = "changed:  " + timestr;
//                 csvbtn.href += "\n" + "changed" + "," + response.time;
//                 $('#status').html(status);
//                 console.log(response.time);
//             });
//         });
//     });

//     // csvbtn.addEventListener('click', function(){
//     //     var link = document.createElement("a");
//     //     link.textContent = "Save as CSV";
//     //     link.download = "file.csv";
//     //     link.href = "data:ext/csv,th1;All Questions\n"
//     //     link.href = ""
//     //     document.body.appendChild(link);
//     // })
// });

