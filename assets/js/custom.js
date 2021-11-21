let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;

$('#register-form').submit(function (e) {
    e.preventDefault();

    $.ajaxSetup({
        headers: {
            'X-CSRFToken': csrfmiddlewaretoken
        }
    });

    let form = $(this);

    // form.find('#please-wait').removeClass('hidden');

    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: form.serialize(),
        dataType: 'json',
        success: function (res) {

            // form.find('#please-wait').addClass('hidden');

            if (res.status === false) {
                $('#register-error').text('');
                $.each(res.errors, (index, item) => {
                    $('#register-error').append(item + '<br/>');
                });
            }
            if (res.status === true) {
                $('#register-error').text(res.message);
                // hide register modal and show login modal
                setTimeout(function () {
                    $("#register").modal("hide");
                    $("#login").modal("show");
                }, 2000);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});


$('#login-form').submit(function (e) {
    e.preventDefault();

    $.ajaxSetup({
        headers: {
            'X-CSRFToken': csrfmiddlewaretoken
        }
    });

    let form = $(this);

    // form.find('#please-wait').removeClass('hidden');

    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: form.serialize(),
        dataType: 'json',
        success: function (res) {

            // form.find('#please-wait').addClass('hidden');

            if (res.status === false) {
                $('#login-error').text('');
                $.each(res.errors, (index, item) => {
                    $('#login-error').append(item + '<br/>');
                });
            } else if (res.status === true) {
                $('#login-error').text(res.message);
                // Redirect to given url
                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});

$(document).ready(function () {

    $('#songFile').on('change', function (e) {
        if ($(this).val().split("\\")[2]) {
            $('#songName').val($(this).val().split("\\")[2]);
            $('#songChoose').text($(this).val().split("\\")[2]);
        }
    });

    $('#audioPlayer').css('visibility', 'hidden');

    $('input[type=radio][name=type]').change(function () {
        if (this.value === 'free') {
            $('#price').find("*").prop('disabled', true);
        } else if (this.value === 'paid') {
            $('#price').find("*").prop('disabled', false);
        }
    });

    // tag-it plugin
    $("#song_tag").tagit();

    // search
    $('#searcha').on('keyup', function () {
        let keyword = $(this).val();
        if (keyword !== '') {
            $.ajax({
                type: 'GET',
                url: $(this).data('search-url') + '?q=' + keyword,
                dataType: 'json',
                success: function (res) {
                    let search_track = $('#search-track');
                    search_track.empty();
                    if (res.songs.length > 0) {
                        $.each(res.songs, function (index, song) {
                            let artists = "";
                            $.each(song.artists, function (i, artist) {
                                if (i !== 0) artists += ", " + artist.name;
                                else artists += artist.name;
                            });
                            search_track.append('<div class="col-xl-4 col-md-6 col-12">\n' +
                                '                            <div class="custom-card mb-3">\n' +
                                '                                <a href="/track/' + song.audio_id + '" class="text-dark custom-card--inline">\n' +
                                '                                    <div class="custom-card--inline-img">\n' +
                                '                                        <img src="' + song.thumbnail + '" alt=""\n' +
                                '                                             class="card-img--radius-sm">\n' +
                                '                                    </div>\n' +
                                '                                    <div class="custom-card--inline-desc">\n' +
                                '                                        <p class="text-truncate mb-0">' + song.title + '</p>\n' +
                                '                                        <p class="text-truncate text-muted font-sm">' + artists + '</p>\n' +
                                '                                    </div>\n' +
                                '                                </a>\n' +
                                '                            </div>\n' +
                                '                        </div>')
                        });
                    } else {
                        search_track.append('<div class="col-xl-4 col-md-6 col-12"><p>Nothing found with this keyword!</p></div>')
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
});



$(".search_icons_pppo").on("click", function(){
    $("#searchForm").css({ "position":"absolute","visibility":"visible", "opacity":"1"})


})
$(".btn_close").on("click", function(){
    $("#searchForm").css({ "position":"relative","visibility":"hidden", "opacity":"0"})



})
 $(window).on('resize', function(){
    var win = $(this); //this = window
    
    if (win.width() <= 450) {
         $("#searchForm").css({ "position":"relative","visibility":"hidden", "opacity":"0"})


    }
    else{
        $("#searchForm").css({ "position":"relative","visibility":"visible", "opacity":"1"})

    }
});

  $(function() {

    $('#search_music').keyup(function() {

       
        




        if ($('#search_music').val().length !=0){
            $(".search-card").css({"visibility":"visible", "opacity":1})
         

            $.ajax({
                type: "Post",
                url: "/yy_song/",
                dataType: 'json',
                data: {
                    'search_text' : $('#search_music').val(),
                    'csrfmiddlewaretoken': '{{csrf_token}}'
                },
                success: searchSuccess_music,
                
            });
        }
        else{
            $("#search_box").css({"visibility":"hidden", "opacity":0})
            $(".search-card").css({"visibility":"hidden", "opacity":0})
        


        }

        });

});

function searchSuccess_music(statuss, textStatus, jqXHR)

{
    let search_track = $('#search-track');
                    search_track.empty();
    const text_box = '<li><a href="#"><div class="pr_info"><div class="imge25"><img src="/media/4k" class="e25"></div><div class="title_pr"><p>Adele</p></div></div></a></li>'
    const text_box1 = '<li сlass = "li_no_res" style = "font-size: 35px;margin-top: 50%;margin-left:30%;color:#C3C3C3;">No Result</li>'
    const txt_p = `
                            <a class="dropdown-box-list-item" href="https://odindesignthemes.com/vikinger-theme/members/brdwonder/"><div class="user-status notification"><div class="user-avatar small no-outline user-status-avatar"><div class="user-avatar-content"><div class="hexagon-image-30-32" data-src="https://odindesignthemes.com/vikinger-theme/wp-content/uploads/avatars/6/5f6d2f1e67572-bpfull.jpg" style="width: 30px; height: 32px; position: relative;"><canvas width="30" height="32" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><div class="user-avatar-progress"><div class="hexagon-progress-40-44" style="width: 40px; height: 44px; position: relative;">
                            <img src="#a" style="position: absolute; top: 0px; left: 0px;width: 40px;height: 40px;border-radius: 180px;object-fit: cover;">

                            </div></div><div class="user-avatar-progress-border"><div class="hexagon-border-40-44" style="width: 40px; height: 44px; position: relative;"><canvas width="40" height="44" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><div class="user-avatar-badge"><div class="user-avatar-badge-border"><div class="hexagon-22-24" style="width: 22px; height: 24px; position: relative;"><canvas width="22" height="24" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><div class="user-avatar-badge-content"><div class="hexagon-dark-16-18" style="width: 16px; height: 18px; position: relative;"><canvas width="16" height="18" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><p class="user-avatar-badge-text">2</p></div></div><p class="user-status-title"><span class="bold">Bearded Wonder</span></p><p class="user-status-text">@brdwonder</p><svg class="icon-friend user-status-icon"><use href="#svg-friend"></use></svg></div></a>`



      



    l = JSON.parse(statuss)
    console.log(l.length)
   if (l.length > 0) {
                        $.each(l, function (index, song) {
                            let artists = "";
                            $.each(song.artists, function (i, artist) {
                                if (i !== 0) artists += ", " + artist.name;
                                else artists += artist.name;
                            });
                            console.log(song.fields.audio_id)
                            search_track.append('<div class="col-xl-4 col-md-6 col-12">\n' +
                                '                            <div class="custom-card mb-3">\n' +
                                '                                <a href="/songs/' + song.fields.audio_id + '" class="text-dark custom-card--inline">\n' +
                                '                                    <div class="custom-card--inline-img">\n' +
                                '                                        <img src="/assets/images/Apple-Music-Web-1.jpg" alt=""\n' +
                                '                                             class="card-img--radius-sm">\n' +
                                '                                    </div>\n' +
                                '                                    <div class="custom-card--inline-desc">\n' +
                                '                                        <p class="text-truncate mb-0">' + song.fields.title + '</p>\n' +
                                '                                        <p class="text-truncate text-muted font-sm">' + artists + '</p>\n' +
                                '                                    </div>\n' +
                                '                                </a>\n' +
                                '                            </div>\n' +
                                '                        </div>')
                        });
                    } else {
                        search_track.append('<div class="col-xl-4 col-md-6 col-12"><p>Nothing found with this keyword!</p></div>')
                    }

/*if(l != ''){
  for (var i = 0, len = l.length; i < len; ++i) {

        var result = l[i];
        console.log(result['fields']['first_name'])
        var box = txt_p.replace('Bearded Wonder', result['fields']['first_name']);
        e = result['pk']
        box = box.replace('https://odindesignthemes.com/vikinger-theme/members/brdwonder/', "/profile/" + e + "/");
        if (result['fields']['avatar'] == ''){
          box = box.replace('#a', '/assets/images/user_no_photo_300x300.png');
          

        }
        else{
          box = box.replace('#a', "/media/" + result['fields']['avatar']);



        }


       
        
        $('#in_serach').append(box);
        $("#search_box").css({"visibility":"visible", "opacity":1})
        //$('#search-results').append(result['fields']['first_name']);
        
        
    }
   
     
   



}
else{

  $('#in_serach').append(text_box1);
  $("#search_box").css({"visibility":"visible", "opacity":1})
  



}*/



    
    
}