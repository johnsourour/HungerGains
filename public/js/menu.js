
$( document ).ready(function() {
  
  $("#menuSelect").change(function() {
    // if ($(this).val() === 'Breakfast') {
    //   myFunction();
    // } else if ($(this).val() === '2') {
    //   myOtherFunction();
    // } 
    //alert("ana hena")
    ajaxGet();
  });

// GET REQUEST
$("#restSearch").submit(function(event){
  event.preventDefault();
  ajaxGet();
});

$("#areas_select").click(function(event){
  event.preventDefault();
  ajaxGetAreas();
});
$("#cuisines_select").click(function(event){
  event.preventDefault();
  ajaxGetCuisines();
});

// DO GET
function ajaxGet(){
  var formData = {
      restaurantName :  $("#rest").val()
    }
  
  // alert(JSON.stringify(formData))
  $.ajax({
    type : "POST",
    contentType : "application/json",
    url : "./user/restaurant/items",
    data : JSON.stringify(formData),
    dataType : 'json',
    success: function(result){
      $('#itemrest').empty();
      $.each(result, function(i, item){
        $('#itemrest').append("<tr> <th scope='row'> <a href='user/restaurantMenu/'> "+
        item.menuItemName + "</a></th> <td> "+
        item.basePrice + "</td></tr>")
      });
      console.log("Success: ", result);
    },
    error : function(e) {
      $("#searchResults").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }
  });  
}




function ajaxGetAreas(){

  $.ajax({
    type : "GET",
    url : "./user/areas",
    success: function(result){
      $('#areas').empty();
      $('#areas').append("<label for='areas'>Select area:</label><select class='form-control 'id='areas_s'>")
      $('#areas_s').append($('<option>', {
                  text: "",
                  val: ""
              }));
      $.each(result, function(i, area){
        $('#areas_s').append($('<option>', {
                  text: area.areaName,
                  val: area.areaName
              }));
      });
      
      $('#areas').append("</select>")
    },
    error : function(e) {
      alert("ERROR "+JSON.stringify(e));
      console.log("ERROR: ", e);
    }
  });  
}
function ajaxGetCuisines(){

  $.ajax({
    type : "GET",
    url : "./user/cuisines",
    success: function(result){
      $('#cuisines').empty();
      $('#cuisines').append("<label for='cuisines'>Select cuisine:</label><select class='form-control 'id='cuisines_s'>")
       $('#cuisines_s').append($('<option>', {
                  text: "",
                  val: ""
              }));
      $.each(result, function(i, cuisine){
        $('#cuisines_s').append($('<option>', {
                  text: cuisine.cuisineName
              }));
      });
      
      $('#cuisines').append("</select> ")
    },
    error : function(e) {
      alert("ERROR "+JSON.stringify(e));
      console.log("ERROR: ", e);
    }
  });  