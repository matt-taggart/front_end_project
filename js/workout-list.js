$(document).ready(function(){

  $(".add-workout").on("click", function(){
    var workoutExerciseIdForList = $(this).attr("id");
    console.log(workoutExerciseIdForList);
    workoutListAppend(workoutExerciseIdForList);
  });


  function workoutListAppend(workoutExerciseIdForList){
    var workoutName = workoutInfo[workoutExerciseIdForList][0].exercise;
    var workoutNameLink = $("<a>").attr("href","#modal-more-info").attr("id",workoutExerciseIdForList).addClass("modal-trigger").append(workoutName);
    var workoutAppend = $("<td>").append(workoutNameLink);
    var repAppend = $("<td>").append('<div class="input-field"><input id="reps" type="text" class="validate"><label for="reps"></label></div>');
    var setAppend = $("<td>").append('<div class="input-field"><input id="sets" type="text" class="validate"><label for="sets"></label></div>');
    var weightAppend = $("<td>").append('<div class="input-field"><input id="weight" type="text" class="validate"><label for="weight"></label></div>');
    var completeButtonAppend = $("<td>").append('<input type="checkbox" class="filled-in" id="filled-in-box" ischecked="unchecked" workouttype='+workoutExerciseIdForList+' /><label for="filled-in-box"></label>');
    var removeWorkoutButton = $("<td>").append('<a class="waves-effect waves-light red btn">X</a>');
    var workoutAppendToTr = $("<tr>").append(workoutAppend)
                                     .append(repAppend)
                                     .append(setAppend)
                                     .append(weightAppend)
                                     .append(completeButtonAppend)
                                     .append(removeWorkoutButton);
    $("#workout-append").append(workoutAppendToTr);

    $("#filled-in-box").click(function(){
      var thisFilledInBox = $(this).attr("workouttype");
      checkboxHandler(workoutExerciseIdForList);
    });

    removeWorkoutHandler();

    $(workoutAppend).on("click", function(){
      modalAppendExerciseInfo(workoutExerciseIdForList);
    });

  };

  function checkboxHandler(workoutExerciseIdForList){
    $("#filled-in-box").on("click",workoutExerciseIdForList,function(){
      console.log(thisFilledInBox);
      var congratsMessage = ["Your power level is truly over 9000", "You better be sure to bring your tickets to the gun show", "What has two thumbs and huge biceps? This guy (or girl 8-) )", "You have come one stepped closer to getting yoked. Make sure to eat something healthy!", "You have successfully picked things up AND put them down"];
      var randomArray = Math.floor((Math.random()*5));
      $("#congrats-message").html(congratsMessage[randomArray]).fadeOut(4500);
      $(thisFilledInBox).attr("ischecked","checked").attr("disabled","disabled");
    });
    };

  function removeWorkoutHandler(){
    $('.waves-effect').on('click' , function(){
      $(this).closest('tr').remove();
    });
  };

  });






  /*function modalReset(){
    $("#exercise-title").empty();
    $("#exercise-description").empty();
    $("#exercise-equipment").empty();
    $("#exercise-video").empty();
  };

  function modalAppendExerciseInfo(workoutExerciseIdForList){
    var exerciseTitle = workoutInfo[workoutExerciseIdForList][0].exercise;
    var exerciseDescription = workoutInfo[workoutExerciseIdForList][1].description;
    var exerciseEquipment = workoutInfo[workoutExerciseIdForList][2].equipment;
    var exerciseVideo = workoutInfo[workoutExerciseIdForList][5].workoutVideoUrl;
    $("#exercise-title").append(exerciseTitle);
    $("#exercise-description").append(exerciseDescription);
    $("#exercise-equipment").append(exerciseEquipment);
    $("#exercise-video").append(exerciseVideo);
  }*/

//});