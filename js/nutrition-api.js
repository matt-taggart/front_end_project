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
      var ndbNumber = $(this).attr('data-ndbnum');
      var serving, tableHeading, dividerA, dividerB, dividerC, amountPerServing, calories, totalFat, saturatedFat, transFat, cholesterol, sodium, carbs, fiber, sugar, protein;      
      e.preventDefault();
      $(".modal-content").empty();
      $("#nutrition-facts").openModal();
      $.ajax({
        type: "GET",
        url: "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=" + apiKey + "&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=606&nutrients=605&nutrients=601&nutrients=268&nutrients=307&nutrients=291&nutrients=203&ndbno=" + ndbNumber,
        success: function(data) {
          for (var i = 0; i < data.report.foods.length; i++) {
            tableHeading = $("<h4>").html("Nutrition Facts");
            $(".modal-content").append(tableHeading);
            serving = $("<p>").addClass("serving-size").html("Serving Size " + data.report.foods[i].measure);
            $(".modal-content").append(serving);
            dividerA = $("<p>").addClass("dividerA");
            $(".modal-content").append(dividerA);
            amountPerServing = $("<p>").addClass("amount-per-serving").addClass("small-divider").html("<strong>Amount Per Serving</strong>");
            $(".modal-content").append(amountPerServing);
            calories = $("<p>").addClass("calories").html("<strong>Calories </strong>" + data.report.foods[i].nutrients[9].value);
            $(".modal-content").append(calories);
            dividerB = $("<p>").addClass("dividerB");
            $(".modal-content").append(dividerB);
            totalFat = $("<p>").addClass("total-fat").addClass("small-divider").html("<strong>Total Fat </strong>" + round(data.report.foods[i].nutrients[2].value) + data.report.foods[i].nutrients[1].unit);
            $(".modal-content").append(totalFat);
            saturatedFat = $("<p>").addClass("saturated-fat").addClass("small-divider").html("Saturated Fat " + round(data.report.foods[i].nutrients[7].value) + data.report.foods[i].nutrients[7].unit);
            $(".modal-content").append(saturatedFat);
            transFat = $("<p>").addClass("trans-fat").addClass("small-divider").html("Trans Fat " + round(data.report.foods[i].nutrients[8].value) + data.report.foods[i].nutrients[8].unit);
            $(".modal-content").append(transFat);
            cholesterol = $("<p>").addClass("cholesterol").addClass("small-divider").html("<strong>Cholesterol</strong> " + round(data.report.foods[i].nutrients[0].value) + data.report.foods[i].nutrients[0].unit);
            $(".modal-content").append(transFat);
            sodium = $("<p>").addClass("sodium").addClass("small-divider").html("<strong>Sodium</strong> " + round(data.report.foods[i].nutrients[5].value) + data.report.foods[i].nutrients[5].unit);
            $(".modal-content").append(sodium);
            carbs = $("<p>").addClass("carbs").addClass("small-divider").html("<strong>Total Carbohydrate</strong> " + round(data.report.foods[i].nutrients[3].value) + data.report.foods[i].nutrients[3].unit);
            $(".modal-content").append(carbs);
            fiber = $("<p>").addClass("fiber").addClass("small-divider").html("Dietary Fiber " + round(data.report.foods[i].nutrients[10].value) + data.report.foods[i].nutrients[10].unit);
            $(".modal-content").append(fiber);
            sugar = $("<p>").addClass("sugar").addClass("small-divider").html("Sugars " + round(data.report.foods[i].nutrients[4].value) + data.report.foods[i].nutrients[4].unit);
            $(".modal-content").append(sugar);
            protein = $("<p>").addClass("protein").html("<strong>Protein</strong> " + round(data.report.foods[i].nutrients[1].value) + data.report.foods[i].nutrients[1].unit);
            $(".modal-content").append(protein);
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

