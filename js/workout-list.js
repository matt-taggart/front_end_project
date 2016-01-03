$(document).on("ready",function(){

  //Get the name of the workout to append to the workout list

  $(".add-workout").on("click", function(){
    var workoutExerciseIdForList = $(this).prev().attr("id");
    console.log(workoutExerciseIdForList);
    workoutListAppend(workoutExerciseIdForList);
  });

  //Append all necessary elements to workout list

  function workoutListAppend(workoutExerciseIdForList){
    var workoutName = workoutInfo[workoutExerciseIdForList][0].exercise;
    var workoutNameLink = $("<a>").attr("href","#modal-more-info").attr("id","name-"+workoutExerciseIdForList).addClass("modal-trigger").append(workoutName);
    var workoutAppend = $("<td>").append(workoutNameLink);
    var repAppend = $("<td>").append('<div class="input-field"><input class="formReps" id="reps-'+workoutExerciseIdForList+'" type="text" class="validate"><label for="reps-'+workoutExerciseIdForList+'"></label></div>');
    var setAppend = $("<td>").append('<div class="input-field"><input id="sets-'+workoutExerciseIdForList+'" type="text" class="validate"><label for="sets-'+workoutExerciseIdForList+'"></label></div>');
    var weightAppend = $("<td>").append('<div class="input-field"><input id="weight-'+workoutExerciseIdForList+'" type="text" class="validate"><label for="weight-'+workoutExerciseIdForList+'"></label></div>');
    var completeButtonAppend = $("<td>").append('<input type="checkbox" class="workoutCheckbox" id='+workoutExerciseIdForList+'-checkbox /><label for='+workoutExerciseIdForList+'-checkbox></label>');
    var removeWorkoutButton = $("<td>").append('<a class="waves-effect waves-light red btn">X</a>');
    var workoutAppendToTr = $("<tr>").append(workoutAppend)
                                     .append(repAppend)
                                     .append(setAppend)
                                     .append(weightAppend)
                                     .append(completeButtonAppend)
                                     .append(removeWorkoutButton);
    $("#workout-append").append(workoutAppendToTr);

    workoutAppendToTr.find('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      complete: function() { modalReset(); } // Callback for Modal close
    });

    enterToSubmitReps(workoutExerciseIdForList, workoutName);
    enterToSubmitSets(workoutExerciseIdForList, workoutName);
    enterToSubmitWeight(workoutExerciseIdForList, workoutName);
    fieldIsEmpty(workoutExerciseIdForList, workoutName);
    modalGetId(workoutExerciseIdForList);
    removeWorkoutHandler();
  };

  //An engaging message is displayed to the user upon clicking the box

  function completeMessage(){
    var congratsMessage = ["Your power level is truly over 9000", "You better be sure to bring your tickets to the gun show", "What has two thumbs and huge biceps? This guy (or girl 8-) )", "You have come one step closer to getting yoked. Make sure to eat something healthy!", "You have successfully picked things up AND put them down"];
    var randomArray = Math.floor((Math.random()*5));
    $("#congrats-message").html(congratsMessage[randomArray])
    setTimeout(function(){$("#congrats-message").empty()}, 3000);
  };

  function removeWorkoutHandler(){
    $('.waves-effect').on('click' , function(){
      $(this).closest('tr').remove();
    });
  };

  //The next three functions enable user to submit their workout goals by hitting the enter button, and checks to make sure that the entry is numeric only

  function enterToSubmitReps(workoutExerciseIdForList, workoutName){
    $("#reps-"+workoutExerciseIdForList).on("keydown", function(e) {
      if (e.keyCode == 13) {
        var repAmount = $(this).val();
        console.log(repAmount);
        if ($.isNumeric(repAmount)) {
          $(this).closest('td').append(repAmount);
          $(this).closest('div').remove();
        } else {
          $("#congrats-message").html("Please enter the number of reps you would like to do for "+workoutName+"!");
          setTimeout(function(){$("#congrats-message").empty()}, 3000);
        };
      };
    });
  };

  function enterToSubmitSets(workoutExerciseIdForList, workoutName){
    $("#sets-"+workoutExerciseIdForList).on("keydown", function(e) {
      if (e.keyCode == 13) {
        var setAmount = $(this).val();
        console.log(setAmount);
        if ($.isNumeric(setAmount)) {
          $(this).closest('td').append(setAmount);
          $(this).closest('div').remove();
        } else {
          $("#congrats-message").html("Please enter the number of sets you would like to do for "+workoutName+"!");
          setTimeout(function(){$("#congrats-message").empty()}, 3000);
        };
      };
    });
  };

  function enterToSubmitWeight(workoutExerciseIdForList, workoutName){
    $("#weight-"+workoutExerciseIdForList).on("keydown", function(e) {
      if (e.keyCode == 13) {
        var weightAmount = $(this).val();
        console.log(weightAmount);
        if ($.isNumeric(weightAmount)) {
          $(this).closest('td').append(weightAmount);
          $(this).closest('div').remove();
        } else {
          $("#congrats-message").html("Please enter the weight you would like to do for "+workoutName+"!");
          setTimeout(function(){$("#congrats-message").empty()}, 3000);
        }
      };
    });
  };

  //Upon clicking checkbox, checkbox is disabled and the remove button is deleted

  function checkboxHandler(workoutExerciseIdForList){
      $("#"+workoutExerciseIdForList+"-checkbox").attr("disabled","disabled");
      $("#"+workoutExerciseIdForList+"-checkbox").parent().next().empty();
      completeMessage();
    };

  //Makes sure that all fields are filled out before submitting

  function fieldIsEmpty(workoutExerciseIdForList, workoutName){
    $("#"+workoutExerciseIdForList+"-checkbox").on("click", function(e){
      var repsEntry = $(this).closest("td").prev().prev().prev().children().children("input").attr("type");
      var setsEntry = $(this).closest("td").prev().prev().children().children("input").attr("type");
      var weightEntry = $(this).closest("td").prev().children().children("input").attr("type");
      if (repsEntry === "text" || setsEntry === "text" || weightEntry === "text") {
        e.preventDefault();
        $("#congrats-message").html("Please enter a number for all fields in "+workoutName+"!");
        setTimeout(function(){$("#congrats-message").empty()}, 3000);
      } else {
        checkboxHandler(workoutExerciseIdForList);
      }
    });
  };

  function modalGetId(workoutExerciseIdForList){
    $("#name-"+workoutExerciseIdForList).on("click", function(){
      console.log($(this).attr("id"));
      modalAppendExerciseInfoListLink(workoutExerciseIdForList);
    });
  };

  function modalAppendExerciseInfoListLink(workoutExerciseIdForList){
    var exerciseTitle = workoutInfo[workoutExerciseIdForList][0].exercise;
    var exerciseDescription = workoutInfo[workoutExerciseIdForList][1].description;
    var exerciseEquipment = workoutInfo[workoutExerciseIdForList][2].equipment;
    var exerciseVideo = workoutInfo[workoutExerciseIdForList][5].workoutVideoUrl;
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
});