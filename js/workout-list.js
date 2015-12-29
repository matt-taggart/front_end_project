$(document).ready(function(){
  $(".add-workout").on("click", function(){
    var workoutExerciseIdForList = $(this).attr("id");
    console.log(workoutExerciseIdForList);
    workoutListAppend(workoutExerciseIdForList);
  });

  function workoutListAppend(workoutExerciseIdForList){
    var workoutName = workoutInfo[workoutExerciseIdForList][0].exercise;
    var workoutAppend = $("<td>").append(workoutName);
    var repAppend = $("<td>").append('<div class="input-field"><input id="reps" type="text" class="validate"><label for="reps"></label></div>');
    var setAppend = $("<td>").append('<div class="input-field"><input id="sets" type="text" class="validate"><label for="sets"></label></div>');
    var weightAppend = $("<td>").append('<div class="input-field"><input id="weight" type="text" class="validate"><label for="weight"></label></div>');
    var completeButtonAppend = $("<td>").append('<input type="checkbox" class="filled-in" id="filled-in-box" /><label for="filled-in-box"></label>');
    var workoutAppendToTr = $("<tr>").append(workoutAppend)
                                     .append(repAppend)
                                     .append(setAppend)
                                     .append(weightAppend)
                                     .append(completeButtonAppend);
    $("#workout-append").append(workoutAppendToTr);
    $("#filled-in-box").on("click",function(){
      var congratsMessage = ["Your power level is truly over 9000", "You better be sure to bring your tickets to the gun show", "What has two thumbs and huge biceps? This guy (or girl 8-) )", "You have come one stepped closer to getting yoked. Make sure to eat something healthy!", "You have successfully picked things up AND put them down"];
      var randomArray = Math.floor((Math.random()*5));
      $("#congrats-message").html(congratsMessage[randomArray])
      $("#filled-in-box").attr("checked","checked");
    });
  };

});