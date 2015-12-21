$(document).ready(function(){

  //Needed for creating dynamic dropdowns in materialize

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );

  $("#workout-group").on("mouseover", function(){
    $("#message-intro").html("Choose your destiny");
  });

  //Get the data attribute of the selection in dropdown menu

  $(".bodyGroup").on("click", function(){
    var bodyGroup = $(this).attr("data-exercise");
    console.log(bodyGroup);
    bodyGroupSelector(bodyGroup)
  });

  //Logic handler for the dropdown selector

  function bodyGroupSelector(bodyGroup){
    if (bodyGroup === "abs") {
      console.log("You have selected abs")
      htmlMessage(bodyGroup);
      dropdownGenerate();
    } else if (bodyGroup === "arms") {
      console.log("You have selected arms")
      htmlMessage(bodyGroup);
    } else if (bodyGroup === "back") {
      console.log("You have selected back")
      htmlMessage(bodyGroup);
    } else if (bodyGroup === "chest") {
      console.log("You have selected chest")
      htmlMessage(bodyGroup);
    } else if (bodyGroup === "legs") {
      console.log("You have selected legs")
      htmlMessage(bodyGroup);
    } else if (bodyGroup === "shoulders") {
      console.log("You have selected shoulders")
      htmlMessage(bodyGroup);
    }; 
  };

  //Generate a new dropdown when making initial down workout selection

  function dropdownGenerate(){
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

    var dropdownTrigger = $("a").addClass("dropdown-button btn").attr("href", "#", "data-activates", "dropdown2");
    var dropdownWorkout = $("ul").attr("id", "dropdown2").addClass("dropdown-content");
    var dropdownContent = $("li").append("a").attr("href", "#!").append(test);

  };

  //Funny and engaging messages for the user when making a selection for .bodyGroup

  function htmlMessage(bodyGroup){
    if (bodyGroup === "abs") {
      $("#message-one").html("We're gonna get your abs SHREDDED, bro");
    } else if (bodyGroup === "arms") {
      $("#message-one").html("ALL the arms");
    } else if (bodyGroup === "back") {
      $("#message-one").html("Don't worry, we got your back");
    } else if (bodyGroup === "chest") {
      $("#message-one").html("Time to inflate bro");
    } else if (bodyGroup === "legs") {
      $("#message-one").html("Friends don't let friends skip leg day");
    } else if (bodyGroup === "shoulders") {
      $("#message-one").html("Do you like anime? Cuz you're gonna look like Goku when we're through with you- just saiyan");
    }; 
  };

});


  /*$("#append-workout").on("click",function(){

    var workoutEntry = $("#workout-type").val();
    var repsEntry = $("#reps-type").val();
    var setsEntry = $("#sets-type").val();
    var newDivInputField = $("<div>").addClass("input-field");
    var inputCheckBoxAttr = $("<input>").attr("type","checkbox").addClass("filled-in").attr("id","filled-in-box");
    var labelCheckBox = $("<label>").attr("for","filled-in-box");
    var completeButton = $(newDivInputField).append(inputCheckBoxAttr).append(labelCheckBox);
    var newRow = $("<tr>");

    $(".workout-routine").append(newRow);
      newRow.append('<td>'+workoutEntry+'</td>');
      newRow.append('<td>'+repsEntry+'</td>');
      newRow.append('<td>'+setsEntry+'</td>');
      newRow.append('<td>').find('td').last().append(completeButton);

    console.log(workoutEntry);
    console.log(repsEntry);
    console.log(setsEntry);
  });

  $(".btn-large").on("click", function(){

  })*/