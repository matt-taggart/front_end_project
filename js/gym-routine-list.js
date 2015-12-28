$(document).ready(function(){


  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      });

  function getIdMoreInfo(){
    $(".more-info").on("click",function(){
      var exerciseId = $(this).attr("id");
      console.log(exerciseId);
      modalAppendExerciseInfo(exerciseId);
    });
  };

  function modalAppendExerciseInfo(exerciseId){
    var exerciseTitle = workoutInfo[exerciseId][0].exercise;
    var exerciseDescription = workoutInfo[exerciseId][1].description
    var exerciseEqupiment = workoutInfo[exerciseId][1].equipment
    $("#exercise-title").append(exerciseTitle);
    $("#exercise-description").append(exerciseDescription);
    modalReset();
  }

  function modalReset(){
    $("#modal-more-info").on("complete",function(){
      $("#exercise-title").html('');
    })
  }

  getIdMoreInfo();
});
