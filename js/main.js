$(document).ready(function() {

  $(".btn").on("click", function(e) {

    $("tbody").empty();

    e.preventDefault();

    var search = $("input:text").val();
    var apiKey = "rHkKtH6RMPiYlFkjl3jBGWpfcEJB3ZMqkyZmAxHK";

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

      for (var i = 0; i < itemList.length; i++) {

        var foodGroup = $("<td>").html(itemList[i].group);
        var foodName = $("<td>").html(itemList[i].name);
        var tr = $("<tr>").append(foodGroup).append(foodName);


        $("tbody").append(tr);

      }

    }

  });





});

