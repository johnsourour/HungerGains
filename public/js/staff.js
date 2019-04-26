

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
$("#refresh").click(function(event){
  event.preventDefault();
  ajaxGet();
});
// DO GET
function ajaxGet(){
  
  $.ajax({
    type : "GET",
    url : window.location.origin + "/staff/viewOrders",
    success: function(result){
      var dd="";
      $('#tracking').empty();
      $.each(result, function(i, order){
        var formData = {
          restaurantID : order.restaurantID
        }
        $.ajax({
          type : "POST",
          contentType: 'application/json',
          data : JSON.stringify(formData),
          dataType: 'json',
          url : window.location.origin + "/user/getName",
          success: function(result){
            var restName=result[0].restaurantName
            dd+="<tr> <th scope='row'>"+order.cartID + "</th> <td> "+restName+ "</td><td> "+order.orderedByName + "</td><td> "+order.statusName + "</td>"
            dd+="<td> <select> <option value='Received'>Received</option>"
            dd+="<option value='Preparing'>Preparing</option>"
            dd+="<option value='Out For Delivery'>Out For Delivery</option>"
            dd+="<option value='Delivered'>Delivered</option>"
            dd+="<option value='Cancelled'>Cancelled</option></td>"
            dd+="<td> <button class= 'btn-primary' id= 'submitchanges'> Submit change</button></td></tr>"
            $('#tracking').append(dd)
          },
          error : function(e) {
            
            console.log("ERROR: ", e);
          }
        })
        
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
}
})