$(document).ready(function() {

  $(".food-search").on("click", function(e) {

    var search = $("input:text").val();
    var apiKey = "rHkKtH6RMPiYlFkjl3jBGWpfcEJB3ZMqkyZmAxHK";

    $("tbody").empty();

    e.preventDefault();

    $.ajax({
    type: "GET",
    url: "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search + "&sort=n&max=25&offset=0&api_key=" + apiKey,
    success: function(data) {
        var foodList = buildTable(data);
    },
    error: function(jqXHR, textstatus, errorThrown) {
      console.log(jqXHR);
      console.log(textstatus);
      console.log(errorThrown);
    }

    });

    function buildTable(foodData) {
      var itemList = foodData.list.item;
      var foodGroup;
      var foodName;
      var tr;

      for (var i = 0; i < itemList.length; i++) {
        foodGroup = $("<td>").html(itemList[i].group);
        foodName = $("<td>").html(itemList[i].name);
        tr = $("<tr>").append(foodGroup).append(foodName);
        $("tbody").append(tr);
      }

    }

  });



});

