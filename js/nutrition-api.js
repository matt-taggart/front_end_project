var apiKey = "rHkKtH6RMPiYlFkjl3jBGWpfcEJB3ZMqkyZmAxHK";

$(document).ready(function() {

  $("#food-search").on("click", function(e) {
      e.preventDefault();    
      var search = $(".food-input-field:text").val(); 

      if (search.length === 0) {
        $("#wrong-input").html("Please enter a valid food type");
      } else {
      $(".nutrition-table-head").empty();
      $(".nutrition-table-body").empty();
      $("#wrong-input").empty();

      var foodSearchParams = {
        "format": "json",
        "q": search,
        "sort": "r",
        "max": 25,
        "offset": 0,
        "api_key": apiKey
      }

      //Ajax call to retrieve food info based on user input
      $.ajax({
        type: "GET",
        url: "https://api.nal.usda.gov/ndb/search/?" + $.param(foodSearchParams),
        success: function(data) {
            var foodList = buildTable(data);           
        },
        error: function(jqXHR, textstatus, errorThrown) {
          if(textstatus === "error") {
            $("#wrong-input").html("Please enter a valid food type");
          }
          console.log(jqXHR);
          console.log(textstatus);
          console.log(errorThrown);
        }
      });
    }
  });

    //Build table rows for each food item and append to html
    function buildTable(foodData) {
      var itemList = foodData.list.item;
      var foodGroup, foodName, checkbox, input, label, appendCheckbox, newDiv, createButton, addButton, floatingButton, ndbNumber, createTable, categoryHeading, nameHeading, tr, headTr;
      $(".nutrition-table").addClass("bordered centered bg-white responsive-table");
      categoryHeading = $("<th>").html("Category");
      nameHeading = $("<th>").html("Name");
      headTr = $("<tr>")
                  .append(categoryHeading)
                  .append(nameHeading)
                  .append("<th></th>");
      $(".nutrition-table-head")
          .addClass("centered")
          .append(headTr);       
      for (var i = 0; i < itemList.length; i++) {
        foodGroup = $("<td>")
                        .addClass("nutrition-td")
                        .html(itemList[i].group);
        foodName = $("<td>")
                    .addClass("nutrition-td")
                    .html(itemList[i].name);
        checkbox = $("<p>")
                      .append(input)
                      .append(label);
        ndbNumber = itemList[i].ndbno;
        newDiv = $("<td>")
                  .addClass("nutrition-td");
        createButton = $("<a>")
                        .addClass("waves-effect waves-light btn cyan nutrition modal-trigger")
                        .attr("href", "#nutrition-facts")
                        .html("Nutrition Facts")
                        .attr('data-ndbnum', ndbNumber);
        addButton = newDiv.append(createButton);
        tr = $("<tr>")
                .append(foodGroup)
                .append(foodName)
                .append(addButton);
        $(".nutrition-table-body").append(tr);
      }
    }

    //When 'nutrition facts' button is clicked, return all relevant nutrition data for this particular food choice and append to modal.  
    //Nutrient Parameters = Saturated fat 606, Trans fat 605, Cholesterol 601, Energy 268, Sodium 307, Fiber 291, Protein 203
    $(document).on('click', '.nutrition', function(e){
      e.preventDefault();
      var ndbNumber = $(this).attr('data-ndbnum');
      var serving, measure, tableHeading, dividerA, dividerB, dividerC, amountPerServing, calories, totalFat, saturatedFat, transFat, cholesterol, sodium, carbs, fiber, sugar, protein;
      var addCalories, addFat, addSatFat, addTransFat, addCholesterol, addSodium, addCarbs, addFiber, addSugar, addProtein; 
      $(".modal-content").empty();
      $("#nutrition-facts").openModal();

      //Ajax call to get nutrient info for food items based on individual gov't ndbnum
      $.ajax({
        type: "GET",
        url: "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=" + apiKey + "&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=606&nutrients=605&nutrients=601&nutrients=268&nutrients=307&nutrients=291&nutrients=203&ndbno=" + ndbNumber,
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
            measure = data.report.foods[i].measure;        
            tableHeading = $("<h4>").html("Nutrition Facts");
            appendToModal(tableHeading);
            serving = $("<p>")
                        .addClass("serving-size")
                        .html("Serving Size " + parseUnitOfMeasure(measure));
            appendToModal(serving);
            dividerA = $("<p>").addClass("dividerA");
            appendToModal(dividerA);
            amountPerServing = $("<p>")
                                .addClass("amount-per-serving small-divider")
                                .html("<strong>Amount Per Serving</strong>");
            appendToModal(amountPerServing);
            addCalories = $("<p>")
                            .addClass("calories")
                            .html("<strong>Calories </strong>" + calories.value + "<span class='lg-indent'>Calories from Fat " + round(totalFat.value*9) + "</span>");
            appendToModal(addCalories);
            dividerB = $("<p>").addClass("dividerB");
            appendToModal(dividerB);
            addFat = $("<p>")
                      .addClass("total-fat small-divider")
                      .html("<strong>Total Fat </strong>" + roundHalf(totalFat.value) + totalFat.unit);
            appendToModal(addFat);
            addSatFat = $("<p>")
                          .addClass("saturated-fats small-divider sm-indent")
                          .html("Saturated Fat " + roundHalf(saturatedFat.value) + saturatedFat.unit);
            appendToModal(addSatFat);
            addTransFat = $("<p>")
                            .addClass("trans-fat small-divider sm-indent")
                            .html("Trans Fat " + roundHalf(transFat.value) + transFat.unit);
            appendToModal(addTransFat);
            addCholesterol = $("<p>")
                              .addClass("cholesterol small-divider")
                              .html("<strong>Cholesterol</strong> " + round(cholesterol.value) + cholesterol.unit);
            appendToModal(addCholesterol);
            addSodium = $("<p>")
                          .addClass("sodium small-divider")
                          .html("<strong>Sodium</strong> " + round(sodium.value) + sodium.unit);
            appendToModal(addSodium);
            addCarbs = $("<p>")
                        .addClass("carbs small-divider")
                        .html("<strong>Total Carbohydrate</strong> " + round(carbs.value) + carbs.unit);
            appendToModal(addCarbs);

            addFiber = $("<p>")
                          .addClass("fiber small-divider sm-indent")
                          .html("Dietary Fiber " + roundHalf(fiber.value) +fiber.unit);
            appendToModal(addFiber);
            addSugar = $("<p>")
                        .addClass("sugar small-divider sm-indent")
                        .html("Sugars " + round(sugar.value) + sugar.unit);
            appendToModal(addSugar);
            addProtein = $("<p>")
                          .addClass("protein")
                          .html("<strong>Protein</strong> " + round(protein.value) + protein.unit);
            appendToModal(addProtein);
            dividerC = $("<p>").addClass("dividerC");
            appendToModal(dividerC);
          }
        },
        error: function(jqXHR, textstatus, errorThrown) {
          console.log(jqXHR);
          console.log(textstatus);
          console.log(errorThrown);
        }
      });
    });

    //When user clicks 'enter' on keyboard, run food search app
    $(".food-input-field:input[type='text']").keypress(function(e){
      if(e.which === 13) {
        $("#food-search").click();
      }
    });

    //Round number to nearest integer & convert non-integer string values to zero
    function round(value) {
      var number = parseFloat(value) ;
      if(isNaN(number)) {
        return 0;
      } else {
        return Math.round(number);        
      }
    }

    //Round number to nearest .5 & convert non-integer string values to zero
    function roundHalf(value) {
      var number = parseFloat(value) ;
      if(isNaN(number)) {
        return 0;
      } else {
        return Math.round(number*2)/2;        
      }
    }

    //Find and replace serving size & round to nearest 0.5
    function parseUnitOfMeasure(value) {
      var unitOfMeasure = /\d+\.+\d/.exec(value);
      var roundedUom = roundHalf(unitOfMeasure);
      return value.replace(unitOfMeasure, roundedUom);
    }


    //Append each row containing nutrient data to modal
    function appendToModal(nutrient) {
      $(".modal-content").append(nutrient);
    }

});