$(document).ready(function(){
  $(".add-workout").on("click", function(){
    var workoutExerciseIdForList = $(this).attr("id");
    console.log(workoutExerciseIdForList);
    getWorkoutInfoForList(workoutExerciseIdForList)
    //workoutListAppend(workoutExerciseIdForList);
  });

  function getWorkoutInfoForList(workoutExerciseIdForList){
    var getWorkoutId = $(workoutExerciseIdForList).siblings();
    console.log(getWorkoutId);
  };


  /*function workoutListAppend(workoutExerciseIdForList){
    newTd = $("<td>")

  };*/



});