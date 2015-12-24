var apiKey = "rHkKtH6RMPiYlFkjl3jBGWpfcEJB3ZMqkyZmAxHK";

$(document).ready(function() {

  $("#food-search").on("click", function(e) {

    var search = $("input:text").val();    

    e.preventDefault();

    $("thead").empty();
    $("tbody").empty();

    $.ajax({
    type: "GET",
    url: "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search + "&sort=r&max=25&offset=0&api_key=" + apiKey,
    success: function(data) {
        var foodList = buildTable(data);           
    },
    error: function(jqXHR, textstatus, errorThrown) {
      console.log(jqXHR);
      console.log(textstatus);
      console.log(errorThrown);
    }

    });

  });

    function buildTable(foodData) {
      var itemList = foodData.list.item;
      var foodGroup, foodName, newDiv, createButton, ndbNumber, createTable, categoryHeading, nameHeading, tr, headTr;
      $("table").addClass("bordered centered bg-white responsive-table");
      categoryHeading = $("<th>").html("Category");
      nameHeading = $("<th>").html("Name");
      headTr = $("<tr>").append(categoryHeading).append(nameHeading);
      $("thead").addClass("centered").append(headTr);       
      for (var i = 0; i < itemList.length; i++) {
        foodGroup = $("<td>").html(itemList[i].group);
        foodName = $("<td>").html(itemList[i].name);
        ndbNumber = itemList[i].ndbno;
        newDiv = $("<td>");
        createButton = $("<a>")
                        .addClass("waves-effect waves-light btn cyan nutrition modal-trigger")
                        .attr("href", "#nutrition-facts")
                        .html("Nutrition Facts")
                        .attr('data-ndbnum', ndbNumber);
        addButton = newDiv.append(createButton);
        tr = $("<tr>").append(foodGroup).append(foodName).append(addButton);
        $("tbody").append(tr);
      }
    }
    //Saturated fat 606, Trans fat 605, Cholesterol 601, Energy 268, Sodium 307, Fiber 291, Protein 203
    $(document).on('click', '.nutrition', function(e){
      e.preventDefault();
      var ndbNumber = $(this).attr('data-ndbnum');
      var serving, tableHeading, dividerA, dividerB, dividerC, amountPerServing, calories, totalFat, saturatedFat, transFat, cholesterol, sodium, carbs, fiber, sugar, protein;
      var addCalories, addFat, addSatFat, addTransFat, addCholesterol, addSodium, addCarbs, addFiber, addSugar, addProtein; 
      $(".modal-content").empty();
      $("#nutrition-facts").openModal();
      $.ajax({
        type: "GET",
        url: "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=" + apiKey + "&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=606&nutrients=605&nutrients=601&nutrients=268&nutrients=307&nutrients=291&nutrients=203&ndbno=" + ndbNumber,
        success: function(data) {
          for (var i = 0; i < data.report.foods.length; i++) {
            calories = data.report.foods[i].nutrients[9];
            totalFat = data.report.foods[i].nutrients[2];
            saturatedFat = data.report.foods[i].nutrients[7];
            transFat = data.report.foods[i].nutrients[8];
            cholesterol = data.report.foods[i].nutrients[0];
            sodium = data.report.foods[i].nutrients[5];
            carbs = data.report.foods[i].nutrients[3];
            fiber = data.report.foods[i].nutrients[10];
            sugar = data.report.foods[i].nutrients[4];
            protein = data.report.foods[i].nutrients[1];            
            tableHeading = $("<h4>").html("Nutrition Facts");
            $(".modal-content").append(tableHeading);
            serving = $("<p>").addClass("serving-size").html("Serving Size " + data.report.foods[i].measure);
            $(".modal-content").append(serving);
            dividerA = $("<p>").addClass("dividerA");
            $(".modal-content").append(dividerA);
            amountPerServing = $("<p>").addClass("amount-per-serving small-divider").html("<strong>Amount Per Serving</strong>");
            $(".modal-content").append(amountPerServing);
            addCalories = $("<p>").addClass("calories").html("<strong>Calories </strong>" + calories.value + "<span class='lg-indent'>Calories from Fat " + round(totalFat.value*9) + "</span>");
            $(".modal-content").append(addCalories);
            dividerB = $("<p>").addClass("dividerB");
            $(".modal-content").append(dividerB);
            addFat = $("<p>").addClass("total-fat small-divider").html("<strong>Total Fat </strong>" + round(totalFat.value) + totalFat.unit);
            $(".modal-content").append(addFat);
            addSatFat = $("<p>").addClass("saturated-fats small-divider sm-indent").html("Saturated Fat " + round(saturatedFat.value) + saturatedFat.unit);
            $(".modal-content").append(addSatFat);
            addTransFat = $("<p>").addClass("trans-fat small-divider sm-indent").html("Trans Fat " + round(transFat.value) + transFat.unit);
            $(".modal-content").append(addTransFat);
            addCholesterol = $("<p>").addClass("cholesterol small-divider").html("<strong>Cholesterol</strong> " + round(cholesterol) + cholesterol.unit);
            $(".modal-content").append(addCholesterol);
            addSodium = $("<p>").addClass("sodium small-divider").html("<strong>Sodium</strong> " + round(sodium.value) + sodium.unit);
            $(".modal-content").append(addSodium);
            addCarbs = $("<p>").addClass("carbs small-divider").html("<strong>Total Carbohydrate</strong> " + round(carbs.value) + carbs.unit);
            $(".modal-content").append(addCarbs);
            addFiber = $("<p>").addClass("fiber small-divider sm-indent").html("Dietary Fiber " + round(fiber.value) +fiber.unit);
            $(".modal-content").append(addFiber);
            addSugar = $("<p>").addClass("sugar small-divider sm-indent").html("Sugars " + round(sugar.value) + sugar.unit);
            $(".modal-content").append(addSugar);
            addProtein = $("<p>").addClass("protein").html("<strong>Protein</strong> " + round(protein.value) + protein.unit);
            $(".modal-content").append(addProtein);
            dividerC = $("<p>").addClass("dividerC");
            $(".modal-content").append(dividerC);
          }
        },
        error: function(jqXHR, textstatus, errorThrown) {
          console.log(jqXHR);
          console.log(textstatus);
          console.log(errorThrown);
        }
      });
    });

    $("input:text").keypress(function(e) {
      if(e.which == 13) {
        $("#food-search").click();
      }
    });

    function round(value) {
      var number = Math.round(parseInt(value));
      if(isNaN(number)) {
        return 0;
      } else {
        return number;        
      }
    }

});

