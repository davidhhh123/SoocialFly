



(function () {
  formData = new FormData()
   profile = {
    "password": null,
    "username": null,
    "email": null,
    "first_name": null,
    "photo": null,
    "description":null,
    "sponsor":null, 
    "pre":[]
  };
   $('#file1').on('change',function(){
     for (var i = 0; i < this.files.length; i++) {
                formData.append('images' + i, this.files[i])
      }


    
          
          profile.photo = this.files[0]

        })
$(".false").on("click", function(){
  if (this.checked) {
    $(this).attr('class', 'true');
  } else {
    $(this).attr('class', 'false');
  }

})
  

  
  class Steps {
    constructor(element) {
      this.element = element;
      this.stepsClickHandler = this.stepsClickHandler.bind(this);
      // if (element === undefined) {
      //   throw Error("Please pass .steps element as class parameter");
      //   return;
      // }
      this.isStepOneFinished = false;
      this.init();
    }

    init() {
      const steps = this.element.querySelectorAll(".steps__step");
      console.log(steps)
      this.steps = Array.prototype.slice.call(steps);
      this.activeStep = this.getActiveStep();
      this.nextBtn = document.querySelectorAll(".next");
      this.activeContent = document.getElementById(
      this.activeStep.dataset.target);

      this.activeContent.style.display = "block";

      //this.prevBtn = ;
      Array.prototype.slice.call(this.nextBtn).forEach(next => {
        next.addEventListener("click", e => {
          e.preventDefault();
          this.nextStep(e);
        });
      });
    }

    test() {
      this.steps.forEach(step => {
        step.addEventListener("click", this.stepsClickHandler, true);
      });
    }

    stepsClickHandler(e) {
      e.preventDefault();
      const target = e.currentTarget;
      this.removeActiveStep();
      target.classList.add("step--active");
      this.activeStep = target;
    }

    getActiveStep() {
      return this.steps.find(steps => steps.classList.contains("step--active"));
    }

    removeActiveStep() {
      this.activeStep.classList.remove("step--active");
    }

    nextStep(e) {
      const currentStep = this.activeStep;
      const activeIndex = this.steps.indexOf(currentStep);
       console.log(activeIndex)
      if (activeIndex==0){
        

      }
      else if (activeIndex==1){
        var first_name = $("#first-name_ps").val()
        var email = $("#email_ps").val()
        var description = $("#description").val()
       
       

        profile.first_name = first_name
        profile.description = description
        profile.email = email
        var th = this
          console.log(description,email, first_name )
          fgt(th)


      }
      else if (activeIndex==2){
        var th = this
          console.log("activeIndex2")
          fgt(th)

      }
      function fgt(th){
        var dataf = new FormData();
        dataf.append('username', $("#first-name").val())
        console.log(profile)



      th.activeContent.style.display = 'none';
     
      th.removeActiveStep();
      currentStep.classList.add("step--finished");
      currentStep.addEventListener("click", th.stepsClickHandler);
      if (activeIndex >= th.steps.length - 1) {
        console.log(profile.username)
         for (var i = 0; i < $(".true").length; i++) {
      
      profile.pre.push($(".true").eq(i).attr("name"))

  }
  formData.append("username",profile.username)
  formData.append("password",profile.password)
  formData.append("first_name",profile.first_name)
  formData.append("email",profile.email)
  formData.append("description",profile.description)
  formData.append("pre",profile.pre)
  formData.append("length",profile.pre.length)
  formData.append("csrfmiddlewaretoken","{{ csrf_token }}")
  for (var i = 0; i < profile.pre.length; i++) {
      
      formData.append('Category' + i, profile.pre[i])

  }
 

  console.log(profile.pre)
        //e.target.classList.add('disabled');
        //e.target.disabled = true;
         $.ajax({

           url: "/api/registration/",
           type: 'POST',
        
           data: formData,

           success: function(data) {
            if(data=="data"){
              location.replace("/profile/")

            }
           
          


                //alert(data.a);Math.round(1.7777777 * 100)/100
                //alert($("#" + data.a).val());






                 //find('#test').innerHTML = data.f;



            },
           error: function(data) {
                  alert('Something went wrong.');
           },
            processData: false,
            contentType: false,
      });
        return;
      }



      const target = th.steps[activeIndex + 1];
      target.classList.add("step--active");

      th.activeStep = target;
      console.log(target)

      th.hideContent();
      th.activeContent = document.getElementById(
      th.activeStep.dataset.target);


      th.showContent();
    }}
    showContent() {
      this.activeContent.style.display = 'block';
    }
    hideContent() {
      this.activeContent.style.display = 'none';
    }}


  const steps = new Steps(document.querySelector(".steps"));
})();


$(document).on("change", "#checkbox", function(){
  var $input = $( this );
  if ($input.prop( "checked" )==true){
    $input.attr("name", 1)

  }
  else{
     $input.attr("name", 0)

  }

})


$(document).on("click", ".next", function(){
   var first_name = $("#first-name_ps").val()
        var email = $("#email_ps").val()
        var description = $("#description").val()
        var sponsor = $('#checkbox').attr("name")
       
       

        profile.first_name = first_name
        profile.description = description
        profile.email = email
        profile.sponsor =sponsor
        var th = this
          console.log(description,email, first_name )
          
        
        console.log(profile)



     
      
        
        
 
  formData.append("first_name",profile.first_name)
  formData.append("sponsor",profile.sponsor)
  formData.append("email",profile.email)
  formData.append("description",profile.description)
  formData.append("pre",profile.pre)
  formData.append("length",profile.pre.length)
  formData.append("csrfmiddlewaretoken","{{ csrf_token }}")
 $.ajax({

           url: "/api/edit_prof/",
           type: 'POST',
        
           data: formData,

           success: function(data) {
            if(data=="data"){
              location.replace("/profile/")

            }
           
          


                //alert(data.a);Math.round(1.7777777 * 100)/100
                //alert($("#" + data.a).val());






                 //find('#test').innerHTML = data.f;



            },
           error: function(data) {
                  alert('Something went wrong.');
           },
            processData: false,
            contentType: false,
      });


})