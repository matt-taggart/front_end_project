$(document).ready(function(){
  $(".add-workout").on("click", function(){
    var workoutExerciseIdForList = $(this).attr("id");
    console.log(workoutExerciseIdForList);
    workoutListAppend(workoutExerciseIdForList);
  });

  function workoutListAppend(workoutExerciseIdForList){
    var workoutName = workoutInfo[workoutExerciseIdForList][0].exercise;
    var newTd = $("<td>");
    var workoutNameAppend = $(newTd).append(workoutName);
    $("#workout-append").append(workoutNameAppend);
  };



});