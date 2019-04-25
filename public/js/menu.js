
$( document ).ready(function() {
  
  $("#menuSelect").change(function() {
    // if ($(this).val() === 'Breakfast') {
    //   myFunction();
    // } else if ($(this).val() === '2') {
    //   myOtherFunction();
    // } 
    //alert("ana hena")
    ajaxGet($("input[name='msel']:checked").val());
  });

// GET REQUEST
$("#restSearch").submit(function(event){
  event.preventDefault();
  ajaxGet();
});

$("#cuisines_select").click(function(event){
  event.preventDefault();
  ajaxGetCuisines();
});

// DO GET
function ajaxGet(menu){
  var formData = {
      restaurantName :  $("#rest").val(),
      menuType :menu
    }
  $.ajax({
    type : "POST",
    contentType : "application/json",
    url : window.location.origin+"/user/restaurant/items",
    data : JSON.stringify(formData),
    dataType : 'json',
    success: function(result){
      $('#itemrest').empty();
      $.each(result, function(i, item){
        
        var formData2 ={ 
           restaurantName : $("#rest").val(),
           menuType : menu, 
           itemName : item.menuItemName
        }
        var id = menu.replace(/\s/g, '')+item.menuItemName.replace(/\s/g, '')
        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : window.location.origin+"/user/restaurant/itemConfigs",
          data : JSON.stringify(formData2),
          dataType : 'json',
          success: function(result){
            var dd="";
           dd+="<tr> <th scope='row'> <a href='user/restaurantMenu/'> "+
        item.menuItemName + "</a></th> <td > "+
        item.basePrice + "</td><td >"
        
            dd+="<select id='"+id+"'>";
           
            $.each(result, function(i, config){
             dd+="<option value'"+config.configName+ "'>"+config.configName+"</option>"
            });
            
            dd+="</select></td></tr>"
          $('#itemrest').append(dd)
          },
          error : function(e) {
            alert("Error in select")
          }
      }); 

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
    url : window.location.origin+"/user/areas",
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
    url : window.location.origin+"/user/cuisines",
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
  });  