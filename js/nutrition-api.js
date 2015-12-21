var apiKey = "rHkKtH6RMPiYlFkjl3jBGWpfcEJB3ZMqkyZmAxHK";

$(document).ready(function() {

  $(".food-search").on("click", function(e) {

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
      var foodGroup, foodName, newDiv, createButton, ndbNumber, createTable, tableHead, categoryHeading, nameHeading, tr;
      $("table").addClass("bordered");
      categoryHeading = $("<th>").html("Category");
      nameHeading = $("<th>").html("Name");
      $("thead").append(categoryHeading).append(nameHeading);       
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

    $(document).on('click', '.nutrition', function(e){
      e.preventDefault();
      var ndbNumber = $(this).attr('data-ndbnum');
      $("#nutrition-facts").openModal();
    });



});

