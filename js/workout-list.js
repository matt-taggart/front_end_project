$(document).ready(function(){

  //Get the name of the workout to append to the workout list

  $(".add-workout").on("click", function(){
    var workoutExerciseIdForList = $(this).prev().attr("id");
    console.log(workoutExerciseIdForList);
    workoutListAppend(workoutExerciseIdForList);
  });

  //Append all necessary elements to workout list

  function workoutListAppend(workoutExerciseIdForList){
    var workoutName = workoutInfo[workoutExerciseIdForList][0].exercise;
    var workoutNameLink = $("<a>").attr("href","#modal-more-info").attr("id",workoutExerciseIdForList).addClass("modal-trigger").append(workoutName);
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

    enterToSubmitReps(workoutExerciseIdForList);
    enterToSubmitSets(workoutExerciseIdForList);
    enterToSubmitWeight(workoutExerciseIdForList);
    checkboxHandler();
    removeWorkoutHandler();
  };

  //Upon clicking checkbox, checkbox is disabled and the remove button is deleted

  function checkboxHandler(){
    $(".workoutCheckbox").on("click", function(){
      $(this).attr("disabled","disabled");
      $(this).parent().next().empty();
      completeMessage();
      });
    };

  //An engaging message is displayed to the user

  function completeMessage(){
    var congratsMessage = ["Your power level is truly over 9000", "You better be sure to bring your tickets to the gun show", "What has two thumbs and huge biceps? This guy (or girl 8-) )", "You have come one stepped closer to getting yoked. Make sure to eat something healthy!", "You have successfully picked things up AND put them down"];
    var randomArray = Math.floor((Math.random()*5));
    $("#congrats-message").html(congratsMessage[randomArray]).fadeOut(4500);
  };

  function removeWorkoutHandler(){
    $('.waves-effect').on('click' , function(){
      $(this).closest('tr').remove();
    });
  };

  function enterToSubmitReps(workoutExerciseIdForList){
    $("#reps-"+workoutExerciseIdForList).on("keydown", function(e) {
      if (e.keyCode == 13) {
        var repAmount = $(this).val();
        console.log(repAmount);
        $(this).closest('td').append(repAmount);
        $(this).closest('div').remove();
      };
    });
  };

  function enterToSubmitSets(workoutExerciseIdForList){
    $("#sets-"+workoutExerciseIdForList).on("keydown", function(e) {
      if (e.keyCode == 13) {
        var setAmount = $(this).val();
        console.log(setAmount);
        $(this).closest('td').append(setAmount);
        $(this).closest('div').remove();
      };
    });
  };

  function enterToSubmitWeight(workoutExerciseIdForList){
    $("#weight-"+workoutExerciseIdForList).on("keydown", function(e) {
      if (e.keyCode == 13) {
        var weightAmount = $(this).val();
        console.log(weightAmount);
        $(this).closest('td').append(weightAmount);
        $(this).closest('div').remove();
      };
    });
  };
});