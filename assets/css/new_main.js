
 $(window).on("load",function(){
    document.getElementById("llo").style.display="none";

});
function window_width(){
	if (window.innerWidth<=499){


		
		var width_text = $(".namevk").width()
		var v = (window.innerWidth - width_text)/2

		if(width_text > 118){
			var s = (width_text / 2) + 2
			var text_s = "calc(50% - " + String(width_text/2) +"px)"
			console.log(v, window.innerWidth, width_text)
			$(".namevk").css({"margin-left":text_s})


		}


	}
	else{
		$(".namevk").css({"margin-left":0})

	}
	
	if (window.innerWidth>960){
		
		$('#search_music').val("")
		$("#search_box").css({"visibility":"hidden", "opacity":0})

				$(".sch_b1").css("display", "block")
				$(".sch_b").css("display", "none")
				$(".login_po").css("display", "flex")
				$(".hgP0").removeClass("close_p")
		$(".hgP0").html(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve">
<g>
  <g>
    <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
      S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
      c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
       M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
  </g>
</g>

</svg>
`)

				
	}
	else{
		if ($(".hgP0").attr("class") == "hgP0 close_p"){

		$(".sch_b1").css("display", "block")}
		else{
			$(".sch_b1").css("display", "none")

		}

	}

}
window.onresize = function(event) {
	window_width()
	console.log(window.innerWidth)
    
};


window_width()


$(".hgP0").on("click", function(){

	
	if ($(this).attr("class") == "hgP0 close_p"){


		$(".sch_b1").css("display", "none")

		$(".login_po").css("display", "flex")
		$(this).removeClass("close_p")
		$(this).html(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve">
<g>
  <g>
    <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
      S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
      c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
       M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
  </g>
</g>

</svg>
`)

		window_width()

	}
	else{
		
		$(".sch_b1").toggle(300)
		$(".login_po").css("display", "none")

	$(this).addClass("close_p")
	$(this).html(`<svg  viewBox="0 0 329.26933 329"  xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>`)

}
window_width()

})

$(".mobilemenu-trigger").on("click", function(){
	$("#navigation-widget-mobile").removeClass("navigation-widget-hidden")
	

})
$(".navigation-widget-close-button").on("click", function(){
	$("#navigation-widget-mobile").addClass("navigation-widget-hidden")

})


 




  $(function() {

    $('#search').keyup(function() {
        document.getElementById("in_serach").innerHTML = "";
        console.log("dksfk")
        




        if ($('#search').val().length !=0){
         

            $.ajax({
                type: "Post",
                url: "/yy/",
                dataType: 'json',
                data: {
                    'search_text' : $('#search').val(),
                    'csrfmiddlewaretoken': '{{csrf_token}}'
                },
                success: searchSuccess,
                
            });
        }
        else{
        	$("#search_box").css({"visibility":"hidden", "opacity":0})
        


        }

        });

});

function searchSuccess(statuss, textStatus, jqXHR)

{
    const text_box = '<li><a href="#"><div class="pr_info"><div class="imge25"><img src="/media/4k" class="e25"></div><div class="title_pr"><p>Adele</p></div></div></a></li>'
    const text_box1 = '<li сlass = "li_no_res" style = "font-size: 35px;margin-top: 50%;margin-left:30%;color:#C3C3C3;">No Result</li>'
    const txt_p = `
                            <a class="dropdown-box-list-item" href="https://odindesignthemes.com/vikinger-theme/members/brdwonder/"><div class="user-status notification"><div class="user-avatar small no-outline user-status-avatar"><div class="user-avatar-content"><div class="hexagon-image-30-32" data-src="https://odindesignthemes.com/vikinger-theme/wp-content/uploads/avatars/6/5f6d2f1e67572-bpfull.jpg" style="width: 30px; height: 32px; position: relative;"><canvas width="30" height="32" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><div class="user-avatar-progress"><div class="hexagon-progress-40-44" style="width: 40px; height: 44px; position: relative;">
                            <img src="#a" style="position: absolute; top: 0px; left: 0px;width: 40px;height: 40px;border-radius: 180px;object-fit: cover;">

                            </div></div><div class="user-avatar-progress-border"><div class="hexagon-border-40-44" style="width: 40px; height: 44px; position: relative;"><canvas width="40" height="44" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><div class="user-avatar-badge"><div class="user-avatar-badge-border"><div class="hexagon-22-24" style="width: 22px; height: 24px; position: relative;"><canvas width="22" height="24" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><div class="user-avatar-badge-content"><div class="hexagon-dark-16-18" style="width: 16px; height: 18px; position: relative;"><canvas width="16" height="18" style="position: absolute; top: 0px; left: 0px;"></canvas></div></div><p class="user-avatar-badge-text">2</p></div></div><p class="user-status-title"><span class="bold">Bearded Wonder</span></p><p class="user-status-text">@brdwonder</p><svg class="icon-friend user-status-icon"><use href="#svg-friend"></use></svg></div></a>`



      



    l = JSON.parse(statuss)
    console.log(l)

if(l != ''){
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
  



}



    
    
}



$(document).on("click", ".gllery-item", function(){
	var name = $(this).attr('data_id');
	var ktname =  $(this).attr("profilename")
	var video = $(this).attr('video');
  var post_add_succeses=$(this).attr("post_add")
  
	 var src = $(this).attr('data-full');
	  var post_img = $(this).attr('postimg');
	  var profile_photo = $(this).attr('photo_profile');
    var heart_id = $(this).attr('heart_c');
    var indiator_ch = $(this).attr('indiator_ch');
    var size_for_file = $(this).attr("size")
    var file_type_my_files = $(this).attr("file_type")
    var profile_status = $(this).attr("profile_status")
    console.log(file_type_my_files)
    if(profile_status=="no_profile"){
      console.log("no_profile")
    }
    else{
      console.log("yes_profile")
    }

    var $this_file_src_if_pdf = $(this).attr("src")
    var size_file_name_type=""
    var size_file = Math.trunc(size_for_file/1024)
    var total_size = 0
            if (size_file>=0  && size_file<1){
              size_file_name_type = "b"
              total_size = size_file

            }
            else if (size_file>=1  && size_file<=1023){
              size_file_name_type = "kb"
              total_size = size_file


            }
            else if (size_file>=1024 && size_file<=1047552){
              size_file_name_type = "mb"
              total_size = size_file/1024

            }
    
    var cloud_true = ""



	  var arts = $(this).attr('arts');
    console.log(arts)
   
var id = $(this).attr('data_post_id');

	 items = ""
	 comments_items = ""

   if (arts == "cloud"){
     var data_post_id_1 = $(this).attr('data_post_id');
      var i_icon_download_cloud = src
      cloud_true = "cloud"

     if (data_post_id_1==0){
       items += ` <div class="swiper-slide"> <video class="vid"  id="imghhh" controls autoplay>
      <source src="`+ src +`" type="video/mp4"></video></div>`
      cloud_true = "cloud"
       fgt(items, ktname,comments_items, i_icon_download_cloud)

     }
     else if (data_post_id_1==2){
       var src_po = $(this).attr('src_tim');

cloud_true = "cloud"
       items += ` <div class="swiper-slide"><div class="play_pause_audio">
       <div class="loader14" ></div>

       <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientTransform="matrix(1 0 0 -1 0 -10018)" gradientUnits="userSpaceOnUse" x1="0" x2="512" y1="-10274" y2="-10274"><stop offset="0" stop-color="#31d8ff"/><stop offset="1" stop-color="#ff80ff"/></linearGradient><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="url(#a)"/><path d="m143.824219 433.007812c-6.710938 0-13.394531-1.859374-19.351563-5.539062-10.9375-6.761719-17.472656-18.480469-17.472656-31.339844v-280.257812c0-12.859375 6.53125-24.578125 17.472656-31.339844 10.945313-6.761719 24.347656-7.367188 35.851563-1.613281l280.308593 140.128906c12.5625 6.28125 20.371094 18.90625 20.371094 32.953125s-7.808594 26.671875-20.371094 32.953125l-280.308593 140.128906c-5.242188 2.621094-10.878907 3.925781-16.5 3.925781zm.019531-324.011718c-1.570312 0-2.832031.582031-3.597656 1.054687-1.210938.75-3.242188 2.5-3.242188 5.820313v280.257812c0 3.320313 2.03125 5.070313 3.242188 5.820313 1.214844.75 3.691406 1.785156 6.664062.300781l280.308594-140.128906c3.292969-1.648438 3.785156-4.542969 3.785156-6.121094s-.492187-4.472656-3.785156-6.121094l-280.308594-140.128906c-1.101562-.550781-2.140625-.753906-3.066406-.753906zm0 0" fill="#fff"/></svg></div>  <audio controls style="display:none" class="audio_contr" >
  <source src="`+ src_po +`" type="audio/ogg">
  
</audio><img class="popup-picture-image" src="`+ src +`">
    </div>`
     fgt(items, ktname,comments_items, i_icon_download_cloud, )

     }
     else{
      cloud_true = "cloud"
      if (file_type_my_files=="pdf" || file_type_my_files=="doc" || file_type_my_files=="docx"){
        items += ` <div class="swiper-slide">  <img class="popup-picture-image" src="`+ $this_file_src_if_pdf +`">
    </div>`


      }
        else{
          items += ` <div class="swiper-slide">  <img class="popup-picture-image" src="`+ src +`">
    </div>`

        }
       
    
     fgt(items, ktname,comments_items, i_icon_download_cloud, "cloud")

     }

 



    function fgt(items, ktname,comments_items, i_icon_download_cloud){
  console.log(items)

  if (heart_id == 0){
    s29 = '<i class="fa fa-heart-o" aria-hidden="true" ></i>'
     
      
    console.log(heart_id)

  }
    else{
      s29 = '<i class="fa fa-heart" aria-hidden="true" style="color: #F44336;"></i>'
     
      console.log(heart_id)
    }

     if (post_add_succeses!=undefined){
      if (parseInt(post_add_succeses)==1){
        var post_archive_unarc = `<a class="archive_my_post" href="/api/unarchive/` + name + `/">
<div>Add Post</div><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve">
<g>
  <g>
    <path d="M392.533,0h-307.2C38.228,0.056,0.056,38.228,0,85.333v307.2c0.056,47.105,38.228,85.277,85.333,85.333h307.2
      c47.105-0.056,85.277-38.228,85.333-85.333v-307.2C477.81,38.228,439.638,0.056,392.533,0z M443.733,392.533
      c0,28.277-22.923,51.2-51.2,51.2h-307.2c-28.277,0-51.2-22.923-51.2-51.2v-307.2c0-28.277,22.923-51.2,51.2-51.2h307.2
      c28.277,0,51.2,22.923,51.2,51.2V392.533z"/>
  </g>
</g>
<g>
  <g>
    <path d="M324.267,221.867H256V153.6c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v68.267H153.6
      c-9.426,0-17.067,7.641-17.067,17.067S144.174,256,153.6,256h68.267v68.267c0,9.426,7.641,17.067,17.067,17.067
      S256,333.692,256,324.267V256h68.267c9.426,0,17.067-7.641,17.067-17.067S333.692,221.867,324.267,221.867z"/>
  </g>
</g>
</svg>`

    }

    }
    else{
      var post_archive_unarc = ``

    }
    
    if (my_pr_p == 1){
      var mio_p=`   <div class="settings"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 433.633 433.633" style="enable-background:new 0 0 433.633 433.633;" xml:space="preserve">
<g>
  <path style="fill:#615ea9;" d="M369.894,153.078c-35.004,0-63.739,28.735-63.739,63.739s28.735,63.739,63.739,63.739
    s63.739-28.735,63.739-63.739S404.898,153.078,369.894,153.078z"/>
  <path style="fill:#615ea9;" d="M216.816,153.078c-35.004,0-63.739,28.735-63.739,63.739s28.735,63.739,63.739,63.739
    s63.739-28.735,63.739-63.739S251.82,153.078,216.816,153.078z"/>
  <path style="fill:#615ea9;" d="M63.739,153.078C28.735,153.078,0,181.812,0,216.816s28.735,63.739,63.739,63.739
    s63.739-28.735,63.739-63.739S98.743,153.078,63.739,153.078z"/>
</g>
<g>
</g>

</svg></div>
<div class="sett_block">
`+ post_archive_unarc +`


</a>
<a class="delete_my_cloud" href="/delete_cloud/`+ name +`/"">
<div>Delete</div>
<svg  viewBox="1 1 511.99998 511.99998"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.386719 0-256 114.613281-256 256s114.613281 256 256 256 256-114.613281 256-256c-.167969-141.316406-114.683594-255.832031-256-256zm0 480c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.132812 123.65625-100.34375 223.867188-224 224zm0 0"/><path d="m380.449219 131.550781c-6.25-6.246093-16.378907-6.246093-22.625 0l-101.824219 101.824219-101.824219-101.824219c-6.140625-6.355469-16.269531-6.53125-22.625-.390625-6.355469 6.136719-6.53125 16.265625-.390625 22.621094.128906.132812.257813.265625.390625.394531l101.824219 101.824219-101.824219 101.824219c-6.355469 6.136719-6.53125 16.265625-.390625 22.625 6.136719 6.355469 16.265625 6.53125 22.621094.390625.132812-.128906.265625-.257813.394531-.390625l101.824219-101.824219 101.824219 101.824219c6.355469 6.136719 16.484375 5.960937 22.621093-.394531 5.988282-6.199219 5.988282-16.03125 0-22.230469l-101.820312-101.824219 101.824219-101.824219c6.246093-6.246093 6.246093-16.375 0-22.625zm0 0"/></svg>

</a>


</div>`

    }
 

  item = `<div class="xm-popup_overlay xm-popup_overlay-premade" id="klj_p">
    <div class="xm-popup_container activity-media-popup animate-slide-down xm-popup_container-premade" style="margin-top: 46px; margin-bottom: 60px;">
        <div class="xm-popup_close-button" id="cl_btn_o"><svg viewBox="0 0 12 12" preserveAspectRatio="xMinYMin meet" class="xm-popup_close-button-icon">
                <path d="M12,9.6L9.6,12L6,8.399L2.4,12L0,9.6L3.6,6L0,2.4L2.4,0L6,3.6L9.6,0L12,2.4L8.399,6L12,9.6z"></path>
            </svg></div>
        <div class="popup-picture">
            <div class="widget-box no-padding no-settings">
                <div data-simplebar="init" style="overflow-x: hidden; height: 100%;" class="lkiuyh">
                    <div class="simplebar-wrapper" style="margin: 0px;">
                        <div class="simplebar-height-auto-observer-wrapper">
                            <div class="simplebar-height-auto-observer"></div>
                        </div>
                        <div class="simplebar-mask">
                            <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                                <div class="simplebar-content-wrapper" style="height: 100%; overflow: hidden;">
                                    <div class="simplebar-content" style="padding: 0px;">
                                        <div class="widget-box-status">
                                            <div class="widget-box-status-content">
                                                <div class="user-status">
                                                    <div class="user-status-avatar"><a class="user-avatar small no-outline " href="https://odindesignthemes.com/vikinger-theme/members/odindesign-themes/">
                                                            <div class="user-avatar-content">
                                                                <div class="hexagon-image-30-32" data-src="https://odindesignthemes.com/vikinger-theme/wp-content/uploads/avatars/1/5f6d2c93a53d1-bpfull.jpg" style="width: 30px; height: 32px; position: relative;"><canvas width="30" height="32" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                            </div>
                                                            <div class="user-avatar-progress">

                                                                <div class="hexagon-progress-40-44" style="width: 40px; height: 44px; position: relative;"><img src="` + profile_photo + `" style="width:40px;height:40px;object-fit:cover;border-radius: 180px;"></div>
                                                            </div>
                                                            <div class="user-avatar-progress-border">
                                                                <div class="hexagon-border-40-44" style="width: 40px; height: 44px; position: relative;"><canvas width="40" height="44" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                            </div>
                                                            <div class="user-avatar-badge">
                                                                <div class="user-avatar-badge-border">
                                                                    <div class="hexagon-22-24" style="width: 22px; height: 24px; position: relative;"><canvas width="22" height="24" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                                </div>
                                                                <div class="user-avatar-badge-content">
                                                                    <div class="hexagon-dark-16-18" style="width: 16px; height: 18px; position: relative;"><canvas width="16" height="18" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                                </div>
                                                                <p class="user-avatar-badge-text">4</p>
                                                            </div>
                                                        </a></div>
                                                    <div class="user-status-title medium"><a href="https://odindesignthemes.com/vikinger-theme/members/odindesign-themes/">Mmmmmmmmmm</a><span><span class="bp-verified-badge"></span></span><span></span><a class="user-avatar micro no-stats no-border " href="https://odindesignthemes.com/vikinger-theme/groups/cosplayers-of-the-world/">
                                                            <div class="user-avatar-content">
                                                                <div class="hexagon-image-18-20" data-src="https://odindesignthemes.com/vikinger-theme/wp-content/uploads/group-avatars/1/5f6e4a8528f4e-bpfull.jpg" style="width: 18px; height: 20px; position: relative;"><canvas width="18" height="20" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                            </div>
                                                        </a><a href="https://odindesignthemes.com/vikinger-theme/groups/cosplayers-of-the-world/"></a></div>
                                                    <p class="user-status-text small">4 months ago</p>
                                                </div>
                                                <p class="widget-box-status-text"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="simplebar-placeholder" style="width: 384px; height: 112px;"></div>
                    </div>
                    <div class="simplebar-track simplebar-horizontal" style="visibility: visible;">
                        <div class="simplebar-scrollbar" style="width: 100%; display: block;margin-top: -100px;">
                        `+ comments_items +`




                        </div>
                    </div>
                    <div class="simplebar-track simplebar-vertical" style="visibility: hidden;">
                        <div class="simplebar-scrollbar" style="height: 0px; display: none;"></div>
                    </div>
                </div>
            </div>
            <div class="popup-picture-image-wrap">
           
   <div class="swiper-container">
    <div class="swiper-wrapper" id="wrap_pooo">
    ` + items + `  


    

    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
    <!-- Add Arrows -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>



           </div>
        </div>
         <div class="diubb"><div class="iconfgh box12 ghytrr4dd" xdsaf" name="` +  name +`"> `+ total_size.toFixed(1)  + " "+ size_file_name_type +`
          </div><div class="iconfgh ghytrr4dd"> <a href="#"><svg id="Capa_1" style="fill: white;
    width: 30px;
    height: 30px;
    margin-top: 5px;" enable-background="new 0 0 512 512" height="25px" viewBox="0 0 512 512" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="m310.579 240.712c22.938-18.12 37.676-46.107 37.676-77.459 0-54.5-44.527-98.839-99.259-98.839s-99.26 44.339-99.26 98.839c0 3.572.196 7.1.569 10.575-11.282-6.161-24.221-9.672-37.971-9.672-43.693 0-79.239 35.403-79.239 78.919 0 22.688 9.676 43.156 25.117 57.566-34.237 15.032-58.212 49.256-58.212 88.98v91.772c0 16.877 13.73 30.607 30.607 30.607h111.191 10 204.394c19.56 0 35.472-15.912 35.472-35.472v-120.371c0-53.059-33.849-98.356-81.085-115.445zm-61.583-146.298c38.19 0 69.259 30.881 69.259 68.839s-31.069 68.839-69.259 68.839-69.26-30.881-69.26-68.839 31.07-68.839 69.26-68.839zm-136.662 99.742c27.151 0 49.24 21.945 49.24 48.919 0 3.912-.472 7.794-1.386 11.551-13.795 9.386-25.587 21.505-34.589 35.575-4.293 1.19-8.738 1.794-13.265 1.794-27.15 0-49.239-21.945-49.239-48.92 0-26.973 22.089-48.919 49.239-48.919zm-82.334 287.237v-91.772c0-37.014 30.113-67.127 67.127-67.127h13.895c-3.057 10.701-4.695 21.994-4.695 33.663v120.371c0 1.861.146 3.688.423 5.472h-76.143c-.3 0-.607-.307-.607-.607zm331.664-4.865c0 2.966-2.506 5.472-5.472 5.472h-204.393-10c-2.966 0-5.472-2.506-5.472-5.472v-120.371c0-51.127 41.595-92.722 92.722-92.722h39.893c51.127 0 92.722 41.595 92.722 92.722z"/><path d="m497 42.358h-27.571v-27.358c0-8.284-6.716-15-15-15s-15 6.716-15 15v27.358h-27.57c-8.284 0-15 6.716-15 15s6.716 15 15 15h27.57v27.359c0 8.284 6.716 15 15 15s15-6.716 15-15v-27.359h27.571c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/></svg></a>
          </div><div class="iconfgh ghytrr4dd"><a href="`+ i_icon_download_cloud +`" download="`+ i_icon_download_cloud +`"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" style="fill:white;"
   viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
  <g>
    <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64
      c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472
      c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z"/>
  </g>
</g>
<g>
  <g>
    <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z"/>
  </g>
</g>
</svg></a>
          </div></div>
    </div>

    `+ mio_p +`

</div>`

item_change = item.replace("Mmmmmmmmmm", ktname)




$('body').append(item_change);





var swiper = new Swiper('.swiper-container', {
    observer: true,  
       observeParents: true,
       watchOverflow: true,


      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });


$("#cl_btn_o").on("click", function(){
  console.log("l")
  $("#klj_p").remove();
  

})}





   }
   else{




	 if (arts == "arts"){
	 	ll()


	 }

   
	 else{
    if (cloud_true!=""){

    }
    else{
      console.log(cloud_true)


	 $.ajax({

           
           url: "/hom4/",
           type: 'POST',
           dataType: 'json',
           enctype: 'multipart/form-data',
           data: {'name': name,
                      'id': id, 'csrfmiddlewaretoken': '{{ csrf_token }}'},
           
           success: function(data) {
           	
            l = JSON.parse(data)
            console.log(data)
            console.log(l)


             for (var i = 0, len = l.length; i < len; ++i) {
            // Setup the result...
                        
            var result = l[i];
            comments_items+=`<div class="comments" >
                            <a href="#"><div class="my_profile_image" style="padding-bottom: 15px;"><img src="/media/shutterstock_451077043-hero1.jpg" ><p class="name_comment" >david</p></div></a>
                            <div class="comment" >` +
                            result['fields']['comment_title'] + `
                             

                              
                            </div>
                            

                          </div>`
           
          
            
            
          

            
           

            

            // Name
            
            
            


            
        }
        ll(comments_items)
       


       
        


            console.log("aaa")

            
            },
           error: function(data) {
                  alert('Something went wrong.');
           }
      }); }
}
	






	 



function ll(comments_items){



	 
if (video != undefined){
	items+=` <div class="swiper-slide"> <video class="vid"  id="imghhh" controls autoplay>
      <source src="`+ src +`" type="video/mp4"></video></div>`

	if (post_img != undefined){}else{
		fgt(items, ktname,comments_items)


	}

          
        
          

          
           

          

        }
        else{
          
            items+=`<div class="swiper-slide">  <img class="popup-picture-image" src="` + src + `"></div>`
           if (post_img != undefined){}else{
           	fgt(items, ktname,comments_items)

		
	}
           

        }




 

 













if (post_img != undefined){




 $.ajax({

           
           url: "/api/profile_imagese",
           type: 'POST',
           dataType: 'json',
           enctype: 'multipart/form-data',
           data: {'pk': name, 'csrfmiddlewaretoken': '{{ csrf_token }}'},
           
           success: function(data) {
           	
            lr = JSON.parse(data)
            console.log(data)
            console.log(lr)


            for (var i = 0, len = lr.length; i < len; ++i) {
            // Setup the result...
                        
            var result = lr[i];
           
           file_type_i = result['fields']['file_type']

           if (file_type_i == "mp4"){
           	items += ` <div class="swiper-slide"> <video class="vid"  id="imghhh" controls>
      <source src="/media/`+ result['fields']['avatar_e'] +`" type="video/mp4"></video></div>`
    

            
            

            
           



           }
           else{
            		items += ` <div class="swiper-slide">  <img class="popup-picture-image" src="/media/` + result['fields']['avatar_e'] + `">
    </div>`
    console.log(items)
            


           }
            
            
          

            
           

            

            // Name
            
            
            


            
        }
        console.log(items)


        fgt(items, ktname,comments_items)
        


            console.log("aaa")

            
            },
           error: function(data) {
                  alert('Something went wrong.');
           }
      }); }}



 function fgt(items, ktname,comments_items){
  var checked_v = "checked"
  var indikator_v = 1

 	console.log(items)
  if (heart_id == 0){
    s29 = '<i class="fa fa-heart-o" aria-hidden="true" ></i>'
     
      
    console.log(heart_id)

  }
    else{
      s29 = '<i class="fa fa-heart" aria-hidden="true" style="color: #F44336;"></i>'
     
      console.log(heart_id)
    }
    if (indiator_ch=="0"){
      checked_v=""
      indikator_v = 0


    }
    
    if (post_add_succeses!=undefined){
      if (parseInt(post_add_succeses)==1){
        var post_archive_unarc = `<a class="archive_my_post" href="/api/unarchive/` + name + `/">
<div>Add Post</div><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve">
<g>
  <g>
    <path d="M392.533,0h-307.2C38.228,0.056,0.056,38.228,0,85.333v307.2c0.056,47.105,38.228,85.277,85.333,85.333h307.2
      c47.105-0.056,85.277-38.228,85.333-85.333v-307.2C477.81,38.228,439.638,0.056,392.533,0z M443.733,392.533
      c0,28.277-22.923,51.2-51.2,51.2h-307.2c-28.277,0-51.2-22.923-51.2-51.2v-307.2c0-28.277,22.923-51.2,51.2-51.2h307.2
      c28.277,0,51.2,22.923,51.2,51.2V392.533z"/>
  </g>
</g>
<g>
  <g>
    <path d="M324.267,221.867H256V153.6c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v68.267H153.6
      c-9.426,0-17.067,7.641-17.067,17.067S144.174,256,153.6,256h68.267v68.267c0,9.426,7.641,17.067,17.067,17.067
      S256,333.692,256,324.267V256h68.267c9.426,0,17.067-7.641,17.067-17.067S333.692,221.867,324.267,221.867z"/>
  </g>
</g>
</svg>`

    }

    }
    else{
      var post_archive_unarc = `<a class="archive_my_post" href="/api/archive/` + name + `/">
<div>Archive</div><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
  <g>
    <path d="M511.36,282.837L455.467,59.051c0-0.021,0-0.021,0-0.043c-7.189-28.48-32.704-48.341-62.059-48.341h-0.021H118.635h-0.021
      c-29.355,0-54.869,19.861-62.059,48.384L0.661,282.837C0.213,284.523,0,286.251,0,288v149.333c0,35.285,28.715,64,64,64h384
      c35.285,0,64-28.715,64-64V288C512,286.251,511.787,284.523,511.36,282.837z M97.92,69.419
      c2.389-9.472,10.901-16.085,20.693-16.085h274.773c9.771,0,18.261,6.613,20.672,16.064l30.571,122.389H341.333
      c-11.776,0-21.333,9.557-21.333,21.333c0,35.285-28.715,64-64,64s-64-28.715-64-64c0-11.776-9.557-21.333-21.333-21.333H67.349
      L97.92,69.419z M469.333,437.333c0,11.755-9.579,21.333-21.333,21.333H64c-11.755,0-21.333-9.579-21.333-21.333V290.624
      l14.037-56.171h94.784c9.899,48.619,53.013,85.333,104.512,85.333s94.613-36.715,104.512-85.333h94.784l14.037,56.171V437.333z"/>
  </g>
</g>
<g>
</g>

</svg>`

    }
    
    if (my_pr_p == 1){
      var video_monetization = ""
      if (video != undefined){
  video_monetization = `<a class="moneytization" href="/delete_post/`+ name +`/"">
<div><label class="switch">
  <input type="checkbox" indikator = "`+ indikator_v +`" pk = "`+ name  +`" `+ checked_v +`>
  <span class="slider_pj round"></span>
</label></div>
<i class="fa fa-usd" aria-hidden="true" style="font-size: 23px;color: #41ad49;"></i>

</a>`


}

      var mio_p=`   <div class="settings"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 433.633 433.633" style="enable-background:new 0 0 433.633 433.633;" xml:space="preserve">
<g>
  <path style="fill:#615ea9;" d="M369.894,153.078c-35.004,0-63.739,28.735-63.739,63.739s28.735,63.739,63.739,63.739
    s63.739-28.735,63.739-63.739S404.898,153.078,369.894,153.078z"/>
  <path style="fill:#615ea9;" d="M216.816,153.078c-35.004,0-63.739,28.735-63.739,63.739s28.735,63.739,63.739,63.739
    s63.739-28.735,63.739-63.739S251.82,153.078,216.816,153.078z"/>
  <path style="fill:#615ea9;" d="M63.739,153.078C28.735,153.078,0,181.812,0,216.816s28.735,63.739,63.739,63.739
    s63.739-28.735,63.739-63.739S98.743,153.078,63.739,153.078z"/>
</g>
<g>
</g>

</svg></div>
<div class="sett_block">
`+ post_archive_unarc +`


</a>
<a class="delete_my_post" href="/delete_post/`+ name +`/"">
<div>Delete</div>
<svg  viewBox="1 1 511.99998 511.99998"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.386719 0-256 114.613281-256 256s114.613281 256 256 256 256-114.613281 256-256c-.167969-141.316406-114.683594-255.832031-256-256zm0 480c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.132812 123.65625-100.34375 223.867188-224 224zm0 0"/><path d="m380.449219 131.550781c-6.25-6.246093-16.378907-6.246093-22.625 0l-101.824219 101.824219-101.824219-101.824219c-6.140625-6.355469-16.269531-6.53125-22.625-.390625-6.355469 6.136719-6.53125 16.265625-.390625 22.621094.128906.132812.257813.265625.390625.394531l101.824219 101.824219-101.824219 101.824219c-6.355469 6.136719-6.53125 16.265625-.390625 22.625 6.136719 6.355469 16.265625 6.53125 22.621094.390625.132812-.128906.265625-.257813.394531-.390625l101.824219-101.824219 101.824219 101.824219c6.355469 6.136719 16.484375 5.960937 22.621093-.394531 5.988282-6.199219 5.988282-16.03125 0-22.230469l-101.820312-101.824219 101.824219-101.824219c6.246093-6.246093 6.246093-16.375 0-22.625zm0 0"/></svg>

</a>
`
+ video_monetization +`



</div>`

    }
 

 	item = `<div class="xm-popup_overlay xm-popup_overlay-premade" id="klj_p">
    <div class="xm-popup_container activity-media-popup animate-slide-down xm-popup_container-premade" style="margin-top: 46px; margin-bottom: 60px;">
        <div class="xm-popup_close-button" id="cl_btn_o"><svg viewBox="0 0 12 12" preserveAspectRatio="xMinYMin meet" class="xm-popup_close-button-icon">
                <path d="M12,9.6L9.6,12L6,8.399L2.4,12L0,9.6L3.6,6L0,2.4L2.4,0L6,3.6L9.6,0L12,2.4L8.399,6L12,9.6z"></path>
            </svg></div>
        <div class="popup-picture">
            <div class="widget-box no-padding no-settings">
                <div data-simplebar="init" style="overflow-x: hidden; height: 100%;" class="lkiuyh">
                    <div class="simplebar-wrapper" style="margin: 0px;">
                        <div class="simplebar-height-auto-observer-wrapper">
                            <div class="simplebar-height-auto-observer"></div>
                        </div>
                        <div class="simplebar-mask">
                            <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                                <div class="simplebar-content-wrapper" style="height: 100%; overflow: hidden;">
                                    <div class="simplebar-content" style="padding: 0px;">
                                        <div class="widget-box-status">
                                            <div class="widget-box-status-content">
                                                <div class="user-status">
                                                    <div class="user-status-avatar"><a class="user-avatar small no-outline " href="https://odindesignthemes.com/vikinger-theme/members/odindesign-themes/">
                                                            <div class="user-avatar-content">
                                                                <div class="hexagon-image-30-32" data-src="https://odindesignthemes.com/vikinger-theme/wp-content/uploads/avatars/1/5f6d2c93a53d1-bpfull.jpg" style="width: 30px; height: 32px; position: relative;"><canvas width="30" height="32" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                            </div>
                                                            <div class="user-avatar-progress">

                                                                <div class="hexagon-progress-40-44" style="width: 40px; height: 44px; position: relative;"><img src="` + profile_photo + `" style="width:40px;height:40px;object-fit:cover;border-radius: 180px;"></div>
                                                            </div>
                                                            <div class="user-avatar-progress-border">
                                                                <div class="hexagon-border-40-44" style="width: 40px; height: 44px; position: relative;"><canvas width="40" height="44" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                            </div>
                                                            <div class="user-avatar-badge">
                                                                <div class="user-avatar-badge-border">
                                                                    <div class="hexagon-22-24" style="width: 22px; height: 24px; position: relative;"><canvas width="22" height="24" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                                </div>
                                                                <div class="user-avatar-badge-content">
                                                                    <div class="hexagon-dark-16-18" style="width: 16px; height: 18px; position: relative;"><canvas width="16" height="18" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                                </div>
                                                                <p class="user-avatar-badge-text">4</p>
                                                            </div>
                                                        </a></div>
                                                    <div class="user-status-title medium"><a href="https://odindesignthemes.com/vikinger-theme/members/odindesign-themes/">Mmmmmmmmmm</a><span><span class="bp-verified-badge"></span></span><span></span><a class="user-avatar micro no-stats no-border " href="https://odindesignthemes.com/vikinger-theme/groups/cosplayers-of-the-world/">
                                                            <div class="user-avatar-content">
                                                                <div class="hexagon-image-18-20" data-src="https://odindesignthemes.com/vikinger-theme/wp-content/uploads/group-avatars/1/5f6e4a8528f4e-bpfull.jpg" style="width: 18px; height: 20px; position: relative;"><canvas width="18" height="20" style="position: absolute; top: 0px; left: 0px;"></canvas></div>
                                                            </div>
                                                        </a><a href="https://odindesignthemes.com/vikinger-theme/groups/cosplayers-of-the-world/"></a></div>
                                                    <p class="user-status-text small">4 months ago</p>
                                                </div>
                                                <p class="widget-box-status-text"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="simplebar-placeholder" style="width: 384px; height: 112px;"></div>
                    </div>
                    <div class="simplebar-track simplebar-horizontal" style="visibility: visible;">
                        <div class="simplebar-scrollbar" style="width: 100%; display: block;margin-top: -100px;">
                        `+ comments_items +`




                        </div>
                    </div>
                    <div class="simplebar-track simplebar-vertical" style="visibility: hidden;">
                        <div class="simplebar-scrollbar" style="height: 0px; display: none;"></div>
                    </div>
                </div>
            </div>
            <div class="popup-picture-image-wrap">
           
   <div class="swiper-container">
    <div class="swiper-wrapper" id="wrap_pooo">
    ` + items + `  


    

    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
    <!-- Add Arrows -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>



           </div>
        </div>
         <div class="diubb"><div class="iconfgh box12" name="` +  name +`"> `+ s29 +`
          </div><div class="iconfgh"> <a href="/comments/`+ name +`"><i class="fa fa-comment-o" aria-hidden="true" style=""></i></a>
          </div><div class="iconfgh"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512"><title>ionicons-v5-n</title><path d="M53.12,199.94l400-151.39a8,8,0,0,1,10.33,10.33l-151.39,400a8,8,0,0,1-15-.34L229.66,292.45a16,16,0,0,0-10.11-10.11L53.46,215A8,8,0,0,1,53.12,199.94Z" style="fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path><line x1="460" y1="52" x2="227" y2="285" style="fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line></svg>
          </div>



          </div>

    </div>
    `+ mio_p +`
  

</div>`

item_change = item.replace("Mmmmmmmmmm", ktname)




$('body').append(item_change);
if (profile_status=="no_profile"){
  $(".box12").removeClass("box12")
  $(".iconfgh").find("a").attr("href", "/sign_in/")
}





var swiper = new Swiper('.swiper-container', {
    observer: true,  
       observeParents: true,
       watchOverflow: true,


      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });


$("#cl_btn_o").on("click", function(){
	console.log("l")
	$("#klj_p").remove();
	

})

$(".box12").on("click", function(){
  var pk = $(this).attr('name');
  e =  String(pk + 123)
  status_name = String(pk) + 'aw'
   $.ajax({
           
           url: "/hom/",
           type: 'POST',
         dataType: 'json',
         enctype: 'multipart/form-data',
           data: {'pk': pk, 'csrfmiddlewaretoken': '{{ csrf_token }}'},
           
           success: function(data) {
                //alert(data.a);
                //alert($("#" + data.a).val());
                
                
                if (data.status=='False'){
                  $(".box12").html( '<i class="fa fa-heart-o" aria-hidden="true" ></i>')
                  
                   document.getElementById(status_name).setAttribute("heart_c", "0")
                   

                  
                  
                  
                  
                  
                }
                else{
                  document.getElementById(status_name).setAttribute("heart_c", "1")

                  
                  $(".box12").html('<i class="fa fa-heart" aria-hidden="true" style="color: #F44336;"></i>')
                   
                   
                }
                


                
                 //find('#test').innerHTML = data.f;

                  
                  
            },
           error: function(data) {
                  alert('Something went wrong.');
           }
      });

})

 }











 





}


})

$(".l20j").on("click", function(){
   $(".main_name").addClass("none_display")
     var myname =$(this).attr("myname")
     
    
        
     
  
  var name = $(this).attr("name")
  var v = ` <div class="body_2_add_post" id="ahgty">
      <div class="close_icon">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
<g>
  <g>
    <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
      C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
      c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
      l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/>
  </g>
</g>
<g>

</svg>
        
      </div>
      <div class="shere_icon_playlist">
  <svg version="1.1" id="Capa_1" class="Capa_1_paaa"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
  <g>
    <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
      v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
  </g>
</g>

</svg>
<div class="loader14"></div>
        
      </div>
      <form>
      <div class="textarea_form2" style="position:absolute;width:100%;">
          <p style="padding-top: 20px;margin-left: 10px;
">Name</p>
          <input class="ply_playlist" placeholder="Name" type="text">            
        
          

        </div>

      
        <div class="textarea_form" style="padding-top:20px;">

          <p style="padding-bottom: 20px;margin-left: 10px;
">Description</p>
          <textarea class="ply_playlist1" placeholder="description" rows="4" cols="50">
            
          </textarea>
          

        </div>

        <div class="textarea_form1">
          <p style="padding-top: 20px;margin-left: 10px;
">Name</p>
          <input class="ply" placeholder="Name" type="text">            
        
          

        </div>


        <div class="file_add" >


           <label for="file_oiu_playlist">
            <div class="fftt f12 kjuaa" ><svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg><p class="m4_poo plikn"
   
">Poster</p></div>

              <input type="file" name="" id="file_oiu_playlist" multiple style="display:none;">
          </label>

           <!--<label for="file_oiu_music">
            <div class="fftt f13" style=""><svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg><p class="m4_poo"
   
"></p></div>

             <input type="file" name="" id="file_oiu_music" multiple style="display:none;">
          </label>-->
         



           
          

          
        </div>

        <div class="swiper-container1 kkaa" style="display:none;max-height: 600px;">
    <div class="swiper-wrapper wr_po" id="wrap_pooo0" style="max-height: 600px;">


    
   
      


    

    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination pag_po" ></div>
    <!-- Add Arrows -->
    <div class="swiper-button-next next_po"></div>
    <div class="swiper-button-prev prev_po"></div>
  </div>
        

      </form>






      
    </div>
` 


$('body').append(v);
var swiper = new Swiper('.swiper-container1', {
    observer: true,  
       observeParents: true,
       watchOverflow: true,


      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
var files_m_playlist = []
 var i23_playlist = -1;
 var l_playlist = ` <div class="swiper-slide vkid" role="group" aria-label="1 / 1" style="max-height: 600px;padding-bottom:50px;">  <img class="popup-picture-image" src="#" style="max-height: 600px;object-fit:cover;"></div>`

$(".close_icon").on("click", function(){
  $("#ahgty").remove();
 $(".main_name").removeClass("none_display")

        
      

})
$("#file_oiu_playlist").on('change',function(){
  if (this.files.length > 1){

                for (var i1 = 0; i1 < this.files.length; i1++) {
                files_m_playlist.push(this.files[i1])
                
            } 
            
            }
            else{
                if (this.files.length == 0){


                }else{

                
                files_m_playlist.push(this.files[0])
                 
                 
            }}
              if (files_m_playlist.length > 1){

                    for (var i1 = 0; i1 < files_m_playlist.length; i1++) {
                        i23_playlist++
                        let render = new FileReader();
        render.addEventListener("load", function(){
            console.log(this)
            box = l_playlist.replace("#", this.result)
            swiper.appendSlide(box)
                        swiper.update()

       
            

        })
        

        render.readAsDataURL(files_m_playlist[i1])
                        
                        
                 

               
               
            } 
                   

                }
                else{
                i23_playlist++

               let render = new FileReader();
        render.addEventListener("load", function(){
            console.log(this)
            box = l_playlist.replace("#", this.result)
            swiper.appendSlide(box)
                        swiper.update()

       
            

        })
        

        render.readAsDataURL(files_m_playlist[0])
                
            }
             
    

   
    


   
  


    
  
    $(".kkaa").css("display", "block")
    $(".file_add").css("display", "none")
    

   
      
})
$(".shere_icon_playlist").on("click", function(){
  var name =  $(".ply_playlist").val()
  var description =  $(".ply_playlist1").val()
  if(files_m_playlist.length>0){
   
 

  var data = new FormData();
  for (var i = 0; i < files_m_playlist.length; i++) {
                data.append('images' + i, files_m_playlist[i])
            }
  data.append("description", description)
  data.append("name", name)
 
 
  $.ajax({


              
            url: '/api/add_playlis1t/',
            method: "POST",
            data: data,
            success: function(daa){
                console.log(daa)
                if (daa=="data"){
                   $(".loader14").css("display", "none")
  $(".Capa_1_paaa").css("display", "block")

                  location.replace("/profile/")
                  
                }
                

            },
            error: function(daa){},
            processData: false,
            contentType: false,
        })
  

}})



})





$(".b6").on("click", function(){
  

     $(".main_name").addClass("none_display")
     $("#frt555jjj").addClass("none_display")

     
     var myname =$(this).attr("myname")
     
    
        
     
  
  var name = $(this).attr("name")
  var v = ` <div class="body_2_add_post" id="ahgty">
      <div class="close_icon">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
<g>
  <g>
    <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
      C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
      c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
      l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/>
  </g>
</g>
<g>

</svg>
        
      </div>
      <div class="shere_icon">
  <svg version="1.1" id="Capa_1" class="Capa_1_paaa"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
  <g>
    <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
      v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
  </g>
</g>

</svg>
<div class="loader14"></div>
        
      </div>
      <form>
        <div class="user_private">
          <div class="user_image"><img src="` + name +`" style="width: 100%;height: 100%;border-radius: 180px;"></div>
          <div class="name_my_pr">`+ myname +`</div>
          <div class="auditory">auditory</div>



          

        </div>
        <div class="textarea_form">
          <p style="padding-bottom: 20px;margin-left: 10px;
">Description</p>
          <textarea class="ply" placeholder="description" rows="4" cols="50">
            
          </textarea>
          

        </div>

        <div class="textarea_form1">
          <p style="padding-top: 20px;margin-left: 10px;
">Name</p>
          <input class="ply" placeholder="Name" type="text">            
        
          

        </div>


        <div class="file_add" >
          <label for="file_oiu">
            <div class="fftt f11" style=""><svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg> <p class="m4_poo plik1"
   
">Post</p></div>

              <input type="file" name="" id="file_oiu" multiple>


          </label>

           <label for="file_oiu_art">
            <div class="fftt f12" style="margin-left: 10px;"><svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg><p class="m4_poo plik"
   
">Shop</p></div>

             <!-- <input type="file" name="" id="file_oiu_art" multiple style="display:none;">-->
          </label>

           <!--<label for="file_oiu_music">
            <div class="fftt f13" style=""><svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg><p class="m4_poo"
   
">Music</p></div>

             <input type="file" name="" id="file_oiu_music" multiple style="display:none;">
          </label>-->
          <label >
            <div class="fftt f13" style=""><a  href="/songs/upload"><svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg></a><p class="m4_poo"
   
">Music</p></div>

             
          </label>



            <label for="file_oiu_books">
            <div class="fftt f14" style=""><svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg><p class="m4_poo"
   
">Books</p></div>

              <input type="file" name="" id="file_oiu_books" multiple style="display:none;">
          </label>
          

          
        </div>

        <div class="swiper-container1 kkaa" style="display:none;max-height: 600px;">
    <div class="swiper-wrapper wr_po" id="wrap_pooo0" style="max-height: 600px;">


    
   
      


    

    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination pag_po" ></div>
    <!-- Add Arrows -->
    <div class="swiper-button-next next_po"></div>
    <div class="swiper-button-prev prev_po"></div>
  </div>
        

      </form>






      
    </div>
` 


$('body').append(v);
var swiper = new Swiper('.swiper-container1', {
    observer: true,  
       observeParents: true,
       watchOverflow: true,


      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });


$(".close_icon").on("click", function(){
  $("#ahgty").remove();
 $(".main_name").removeClass("none_display")
 $("#frt555jjj").removeClass("none_display")

        
      

})
 var files_m = []
 var i23 = -1;
 var l = ` <div class="swiper-slide vkid" role="group" aria-label="1 / 1" style="max-height: 600px;padding-bottom:50px;">  <img class="popup-picture-image" src="#" style="max-height: 600px;object-fit:cover;"></div>`
$("#file_oiu").on('change',function(){
  if (this.files.length > 1){

                for (var i1 = 0; i1 < this.files.length; i1++) {
                files_m.push(this.files[i1])
                
            } 
            
            }
            else{
                if (this.files.length == 0){


                }else{

                
                files_m.push(this.files[0])
                 
                 
            }}
              if (files_m.length > 1){

                    for (var i1 = 0; i1 < files_m.length; i1++) {
                        i23++
                        let render = new FileReader();
        render.addEventListener("load", function(){
            console.log(this)
            box = l.replace("#", this.result)
            swiper.appendSlide(box)
                        swiper.update()

       
            

        })
        

        render.readAsDataURL(files_m[i1])
                        
                        
                 

               
               
            } 
                   

                }
                else{
                i23++

               let render = new FileReader();
        render.addEventListener("load", function(){
            console.log(this)
            box = l.replace("#", this.result)
            swiper.appendSlide(box)
                        swiper.update()

       
            

        })
        

        render.readAsDataURL(files_m[0])
                
            }
             
    

   
    


   
    console.log(files_m)


    
  
    $(".kkaa").css("display", "block")
    $(".file_add").css("display", "none")
    

   
      
})
 var files_m_art = []
 var i23_art = -1;
 var l_art = ` <div class="swiper-slide vkid" role="group" aria-label="1 / 1" style="max-height: 600px;padding-bottom:50px;">  <img class="popup-picture-image" src="#" style="max-height: 600px;object-fit:cover;"></div>`
/*$("#file_oiu_art").on('change',function(){
  if (this.files.length > 1){

                for (var i1 = 0; i1 < this.files.length; i1++) {
                files_m_art.push(this.files[i1])
                
            } 
            
            }
            else{
                if (this.files.length == 0){


                }else{

                
                files_m_art.push(this.files[0])
                 
                 
            }}
              if (files_m_art.length > 1){

                    for (var i1 = 0; i1 < files_m_art.length; i1++) {
                        i23_art++
                        let render = new FileReader();
        render.addEventListener("load", function(){
            console.log(this)
            box = l.replace("#", this.result)
            swiper.appendSlide(box)
                        swiper.update()

       
            

        })
        

        render.readAsDataURL(files_m_art[i1])
                        
                        
                 

               
               
            } 
                   

                }
                else{
                i23_art++

               let render = new FileReader();
        render.addEventListener("load", function(){
            console.log(this)
            box = l.replace("#", this.result)
            swiper.appendSlide(box)
                        swiper.update()

       
            

        })
        

        render.readAsDataURL(files_m_art[0])
                
            }
             
    

   
    


   
    console.log(files_m_art)


    
  
    $(".kkaa").css("display", "block")
    $(".file_add").css("display", "none")
    

   
      
})*/

var files_m_music = []
 var i23_music = -1;
 var files_name = []
 var l_music = ` <div class="swiper-slide vkid" role="group" aria-label="1 / 1" style="max-height: 600px;padding-bottom:50px;"> <div class="name_pokk">##</div> <img class="popup-picture-image" src="/assets/images/Apple-Music-Web-1.jpg" style="max-height: 600px;object-fit:contain;width: 100%;"></div>`
$("#file_oiu_music").on('change',function(){
   $(".shere_icon").addClass("kiouuu")
  if (this.files.length > 1){


                for (var i1 = 0; i1 < this.files.length; i1++) {
                files_m_music.push(this.files[i1])
                
                
            } 
            
            }
            else{
                if (this.files.length == 0){


                }else{

                
                files_m_music.push(this.files[0])
                fullPath = this.files[0]
                var filename = $('#file_oiu_music').val().replace(/C:\\fakepath\\/i, '')
                filename_p = filename.replace(".mp3", "")
                l_l_music=l_music.replace("##", filename_p)
                files_name.push(filename_p)
                
                $(".textarea_form1").css("display","block")
                $(".swiper-container1").css("top","500px")
                $(".textarea_form1 .ply").val(filename_p)
                


                
                
}
                 
                 
            }
              if (files_m_music.length > 1){

                    for (var i1 = 0; i1 < files_m_music.length; i1++) {
                        i23_music++
                       
            swiper.appendSlide(l_l_music)
                        swiper.update()

       
            

        }
        

       
                        
                        
                 

               
               
            
                   

                }
                else{
                i23_music++

               
       
            swiper.appendSlide(l_l_music)
                        swiper.update()

       
            

        
        

       
                
            }
             
    

   
    


   
    console.log(files_m_art)


    
  
    $(".kkaa").css("display", "block")
    $(".file_add").css("display", "none")
    

   
      
})



var files_m_books = []
 var i23_books = -1;
 var l_books = ` <div class="swiper-slide vkid" role="group" aria-label="1 / 1" style="max-height: 600px;padding-bottom:50px;">  <img class="popup-picture-image" src="/media/73070532_oRWdBIq.jpg" style="max-height: 600px;object-fit:cover;"></div>`
$("#file_oiu_books").on('change',function(){
   $(".shere_icon").addClass("kiouuu")
  if (this.files.length > 1){


                for (var i1 = 0; i1 < this.files.length; i1++) {
                files_m_books.push(this.files[i1])
                
                
            } 
            
            }
            else{
                if (this.files.length == 0){


                }else{

                
                files_m_books.push(this.files[0])
                 
                 
            }}
              if (files_m_books.length > 1){

                    for (var i1 = 0; i1 < files_m_books.length; i1++) {
                        i23_books++
                       
            swiper.appendSlide(l_books)
                        swiper.update()

       
            

        }
        

       
                        
                        
                 

               
               
            
                   

                }
                else{
                i23_books++

               
       
            swiper.appendSlide(l_books)
                        swiper.update()

       
            

        
        

       
                
            }
             
    

   
    


   
    console.log(files_m_art)


    
  
    $(".kkaa").css("display", "block")
    $(".file_add").css("display", "none")
    

   
      
})





$(".shere_icon").on("click", function(){





  var description =  $(".ply").val()
  if(files_m_art.length>0){
    var files = files_m_art
  var pk = $(this).attr("name")
  var length = files_m_art.length
  var data = new FormData();
  for (var i = 0; i < files.length; i++) {
                data.append('images' + i, files[i])
            }
  data.append("description", description)
 
  data.append("pk", pk)
  data.append("length", length)
  $(".loader14").css("display", "block")
  $(".Capa_1_paaa").css("display", "none")

  

   $.ajax({


              
            url: '/api/art_p',
            method: "POST",
            data: data,
            success: function(daa){
                console.log(daa)
                if (daa=="data"){
                   $(".loader14").css("display", "none")
  $(".Capa_1_paaa").css("display", "block")

                  location.replace("/profile/")
                  
                }
                

            },
            error: function(daa){},
            processData: false,
            contentType: false,
        });

  }
  else if(files_m.length>0){




  var files = files_m
  var pk = $(this).attr("name")
  var length = files_m.length
  var data = new FormData();
  for (var i = 0; i < files.length; i++) {
                data.append('images' + i, files[i])
            }
  data.append("description", description)
 
  data.append("pk", pk)
  data.append("length", length)
  $(".loader14").css("display", "block")
  $(".Capa_1_paaa").css("display", "none")

   $.ajax({

              
            url: '/api/create_album/',
            method: "POST",
            data: data,
            success: function(daa){
                console.log(daa)
                if (daa=="d"){
                   $(".loader14").css("display", "none")
  $(".Capa_1_paaa").css("display", "block")

                  location.replace("/profile/")
                }
                

            },
            error: function(daa){},
            processData: false,
            contentType: false,
        });
   

}
else if (files_m_music.length>0){
   var files = files_m_music
   var name = files_name

    
  
  var length = files_m_music.length
  var data = new FormData();
  data.append("description", description)
  for (var i = 0; i < files.length; i++) {
                data.append('music' + i, files[i])
                data.append('music_name' + i, name[i])
            }


             $(".loader14").css("display", "block")
  $(".Capa_1_paaa").css("display", "none")


            
 
 
 
 
   $.ajax({

              
            url: '/api/create_music',
            method: "POST",
             xhr : function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener('progress', function(e) {

                    if (e.lengthComputable) {

                        console.log('Bytes Loaded: ' + e.loaded);
                        console.log('Total Size: ' + e.total);
                        console.log('Percentage Uploaded: ' + (e.loaded / e.total))

                        var percent = Math.round((e.loaded / e.total) * 100);

                        $('#progressBar').attr('aria-valuenow', percent).css('width', percent + '%').text(percent + '%');

                    }

                });

                return xhr;},
            data: data,
            success: function(daa){
                console.log(daa)
                if (daa=="data"){
                   $(".loader14").css("display", "none")
  $(".Capa_1_paaa").css("display", "block")

                  location.replace("/profile/")
                }
                

            },
            error: function(daa){},
            processData: false,
            contentType: false,
        });
   

}

else{
    var files = files_m_books

    
  
  var length = files_m_books.length
  var data = new FormData();
  data.append("description", description)
  for (var i = 0; i < files.length; i++) {
                data.append('books' + i, files[i])
            }

             $(".loader14").css("display", "block")
  $(".Capa_1_paaa").css("display", "none")

 
 
 
 
   $.ajax({

              
            url: '/api/create_books',
            method: "POST",
            data: data,
            success: function(daa){
                console.log(daa)
                if (daa=="data"){
                   $(".loader14").css("display", "none")
  $(".Capa_1_paaa").css("display", "block")

                  location.replace("/profile/")
                }
                

            },
            error: function(daa){},
            processData: false,
            contentType: false,
        });




}





})


})


$(document).on("click", ".play_pause_audio", function(){
 
  
  

   if ($(".audio_contr")[0].paused){
    $(".audio_contr")[0].play()
     if ($(".audio_contr")[0].currentTime==0){
       $(".loader14").css({"display": "block", "color":"#e051bb", "margin-left": 
        "10px"})
       $(".play_pause_audio svg").css("display", "none")
      var icon_int = setInterval(() => { if ($(".audio_contr")[0].currentTime>0){
      $(".play_pause_audio").html(`<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientTransform="matrix(1 0 0 -1 0 -11082)" gradientUnits="userSpaceOnUse" x1="0" x2="512" y1="-11338" y2="-11338"><stop offset="0" stop-color="#31d8ff"/><stop offset="1" stop-color="#ff80ff"/></linearGradient><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="url(#a)"/><g fill="#fff"><path d="m198.488281 423.5h-75.601562c-18.960938 0-34.386719-15.425781-34.386719-34.386719v-266.226562c0-18.960938 15.425781-34.386719 34.386719-34.386719h75.601562c18.960938 0 34.386719 15.425781 34.386719 34.386719v266.226562c0 18.960938-15.425781 34.386719-34.386719 34.386719zm-75.601562-305c-2.417969 0-4.386719 1.96875-4.386719 4.386719v266.226562c0 2.417969 1.96875 4.386719 4.386719 4.386719h75.601562c2.417969 0 4.386719-1.964844 4.386719-4.386719v-266.226562c0-2.417969-1.964844-4.386719-4.386719-4.386719zm0 0"/><path d="m389.113281 423.5h-75.601562c-18.960938 0-34.386719-15.425781-34.386719-34.386719v-266.226562c0-18.960938 15.425781-34.386719 34.386719-34.386719h75.601562c18.960938 0 34.386719 15.425781 34.386719 34.386719v266.226562c0 18.960938-15.425781 34.386719-34.386719 34.386719zm-75.601562-305c-2.417969 0-4.386719 1.96875-4.386719 4.386719v266.226562c0 2.417969 1.96875 4.386719 4.386719 4.386719h75.601562c2.417969 0 4.386719-1.964844 4.386719-4.386719v-266.226562c0-2.417969-1.964844-4.386719-4.386719-4.386719zm0 0"/></g></svg>`)
     $(".play_pause_audio svg").css("display", "block")
     clearInterval(icon_int)

    }}, 300);
     

    }
    else{
       $(".play_pause_audio").html(`<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientTransform="matrix(1 0 0 -1 0 -11082)" gradientUnits="userSpaceOnUse" x1="0" x2="512" y1="-11338" y2="-11338"><stop offset="0" stop-color="#31d8ff"/><stop offset="1" stop-color="#ff80ff"/></linearGradient><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="url(#a)"/><g fill="#fff"><path d="m198.488281 423.5h-75.601562c-18.960938 0-34.386719-15.425781-34.386719-34.386719v-266.226562c0-18.960938 15.425781-34.386719 34.386719-34.386719h75.601562c18.960938 0 34.386719 15.425781 34.386719 34.386719v266.226562c0 18.960938-15.425781 34.386719-34.386719 34.386719zm-75.601562-305c-2.417969 0-4.386719 1.96875-4.386719 4.386719v266.226562c0 2.417969 1.96875 4.386719 4.386719 4.386719h75.601562c2.417969 0 4.386719-1.964844 4.386719-4.386719v-266.226562c0-2.417969-1.964844-4.386719-4.386719-4.386719zm0 0"/><path d="m389.113281 423.5h-75.601562c-18.960938 0-34.386719-15.425781-34.386719-34.386719v-266.226562c0-18.960938 15.425781-34.386719 34.386719-34.386719h75.601562c18.960938 0 34.386719 15.425781 34.386719 34.386719v266.226562c0 18.960938-15.425781 34.386719-34.386719 34.386719zm-75.601562-305c-2.417969 0-4.386719 1.96875-4.386719 4.386719v266.226562c0 2.417969 1.96875 4.386719 4.386719 4.386719h75.601562c2.417969 0 4.386719-1.964844 4.386719-4.386719v-266.226562c0-2.417969-1.964844-4.386719-4.386719-4.386719zm0 0"/></g></svg>`)

    }
   
    
    
     
   

  
    
    


   }
   else{
    $(".audio_contr")[0].pause()
    $(this).html(`<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientTransform="matrix(1 0 0 -1 0 -10018)" gradientUnits="userSpaceOnUse" x1="0" x2="512" y1="-10274" y2="-10274"><stop offset="0" stop-color="#31d8ff"/><stop offset="1" stop-color="#ff80ff"/></linearGradient><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="url(#a)"/><path d="m143.824219 433.007812c-6.710938 0-13.394531-1.859374-19.351563-5.539062-10.9375-6.761719-17.472656-18.480469-17.472656-31.339844v-280.257812c0-12.859375 6.53125-24.578125 17.472656-31.339844 10.945313-6.761719 24.347656-7.367188 35.851563-1.613281l280.308593 140.128906c12.5625 6.28125 20.371094 18.90625 20.371094 32.953125s-7.808594 26.671875-20.371094 32.953125l-280.308593 140.128906c-5.242188 2.621094-10.878907 3.925781-16.5 3.925781zm.019531-324.011718c-1.570312 0-2.832031.582031-3.597656 1.054687-1.210938.75-3.242188 2.5-3.242188 5.820313v280.257812c0 3.320313 2.03125 5.070313 3.242188 5.820313 1.214844.75 3.691406 1.785156 6.664062.300781l280.308594-140.128906c3.292969-1.648438 3.785156-4.542969 3.785156-6.121094s-.492187-4.472656-3.785156-6.121094l-280.308594-140.128906c-1.101562-.550781-2.140625-.753906-3.066406-.753906zm0 0" fill="#fff"/></svg>`)

   }

})



$(document).on("click",".settings", function(){
  $(".sett_block").toggle(400);
 
  

})




$(document).on("change",".switch input", function(){
  var pk = $(this).attr("pk")
 
  
  if ($(this).attr("indikator")=="0"){
    $(this).attr("indikator", 1);

    change_monetization_indikator(1, pk)

  }
  else{
    $(this).attr("indikator", 0);
    change_monetization_indikator(0, pk)

  }
   console.log($(this).attr("indikator"))


 
 
 
  

})
function change_monetization_indikator(indikator, pk){
  var data = new FormData();

  data.append("indikator", indikator)
  data.append("pk", pk)
  $.ajax({

              
            url: '/moneytization_indikator/change',
            method: "POST",
            data: data,
            success: function(data_res){
                console.log("data", data_res.indikator_data_res)
               
                

            },
            error: function(data_res){},
            processData: false,
            contentType: false,
        });
 

}












