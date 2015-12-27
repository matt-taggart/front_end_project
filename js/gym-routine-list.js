$(document).ready(function(){

  var moreInfoModalGenerator = getIdMoreInfo();

  function getIdMoreInfo(){
    $(".more-info").on("click",function(){
      var exerciseId = $(this).attr("id");
      console.log(exerciseId);
      $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        });
      $(workoutInfo.id).each(), function(){
        console.log(workoutInfo.id);
      }
      

    });
  };

});