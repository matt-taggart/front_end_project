

  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      complete: function() {modalReset();}
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
    var exerciseDescription = workoutInfo[exerciseId][1].description;
    var exerciseEquipment = workoutInfo[exerciseId][2].equipment;
    var exerciseVideo = workoutInfo[exerciseId][5].workoutVideoUrl;
    $("#exercise-title").append(exerciseTitle);
    $("#exercise-description").append(exerciseDescription);
    $("#exercise-equipment").append(exerciseEquipment);
    $("#exercise-video").append(exerciseVideo);
  }

  function modalReset(){
    $("#exercise-title").empty();
    $("#exercise-description").empty();
    $("#exercise-equipment").empty();
    $("#exercise-video").empty();
  };

  getIdMoreInfo();

