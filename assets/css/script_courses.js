$(function () {
 $(".sidebar-link").click(function () {
  $(".sidebar-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(window)
 .resize(function () {
  if ($(window).width() > 1090) {
   $(".sidebar").removeClass("collapse");
  } else {
   $(".sidebar").addClass("collapse");
  }
 })
 .resize();

const allVideos = document.querySelectorAll(".video");

allVideos.forEach((v) => {
 v.addEventListener("mouseover", () => {
  const video = v.querySelector("video");
  video.play();
 });
 v.addEventListener("mouseleave", () => {
  const video = v.querySelector("video");
  video.pause();
 });
});




$(".file_upload_my_videos").on("click", function(){
  var pk = $(this).attr("pk")
  var files_m = []
  var text = ` <div class="id_ppp_channel">
    
     <div class="req_data1" style="display:block;">
     
<label for ="upload_videos_my_pp">
      <div class="upload_ppoojj">
      <img src="/assets/images/icons8-upload-to-cloud-64.png">
      <div>
      <input type="file" id="upload_videos_my_pp" style="display:none" accept=".mp4, .mov, .wmv , .avi ">
</label>



    </div>



    
    


  </div>
   
  </div>
  <div class="req_data2" style="visible:hidden;opacity:0;">
  <div class="add_ppo1o"><svg version="1.1" id="Capa_1" class="Capa_1_paaa" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
  <g>
    <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
      v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"></path>
  </g>
</g>

</svg></div>
      
      <div class="profile_name_ppa">
        <p>Name</p>
        <input type="text" name="text" class="profile_name_ppa_input" placeholder="Name" value="{{ profile.first_name }}">

        


      </div>
       <div class="profile_des_ppa">
        <p>Description</p>
        
        <textarea cols="20" rows="20" class="profile_des_ppa_input" placeholder="Description"></textarea>

        


      </div>



    </div>
  `

  $("body").append(text)
  $(".req_data1").css({"visibility":"visible", "opacity":1})
 
  $("#upload_videos_my_pp").on("change", function(){
    var files = $(this)[0].files
    files_m.push(files[0])
    var file_d = files[0].name.substring(0, files[0].name.lastIndexOf("."))


    console.log()
    $(".req_data2").css({"visibility":"visible", "opacity":1})
    $(".req_data1").css({"visibility":"hidden", "opacity":0})
    $(".profile_name_ppa_input").val(file_d)

    

  })

  $(".add_ppo1o").on("click", function(){
    var data = new FormData();
    var name = $(".profile_name_ppa_input").val()
    var description = $(".profile_des_ppa").val()
   

    data.append("name", name)
    data.append("pk", pk)
    data.append("description", description)
    data.append("images" + 0, files_m[0])
    $.ajax({
         
           
           url: "/api/create_videos/",
           method: 'POST',
           
           data: data,
           
           success: function(data) {
            if (data=="success"){
              location.replace("/mychannel/")
            }
               
            },
           error: function(data) {
                  alert('Something went wrong.');
           }, 
           processData: false,
          contentType: false,
      });

  })

})