var itemcount = 0;
$( document ).ready(function() {
  
  $("#menuSelect").change(function() {
    
    ajaxGet($("input[name='msel']:checked").val());
  });
 $(document).on("click", 'button[id$="_b"]', function(){
   //event.preventDefault();
   
  addItemPost(this.id);
  })

// GET REQUEST
$("#restSearch").submit(function(event){
  event.preventDefault();
  ajaxGet();
});

$("#areas_select").click(function(event){
    event.preventDefault();
    
    ajaxGetAddresses();
  });

$("#cuisines_select").click(function(event){
  event.preventDefault();
  ajaxGetCuisines();
});

$("#cartForm").submit(function(event){
  event.preventDefault();
  ajaxCreateCart();
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
        var id = menu.replace(/\s/g, '_')+"_"+item.menuItemName.replace(/\s/g, '_')
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
            
            dd+="</select></td>"
          dd+="<td><input type='number' style='width:40px;' id='"+id+"_q' placeholder='0'></input></td>" 
          var cur_id = id+"_b"         
          dd+="<td><button class='btn btn-primary' id='"+cur_id+"'> Add </button></td>"
          dd+="<td><input type='text' id='"+id+"_c'> </input></td></tr>"
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



  });  

function addItemPost(id){
  var str = id.substr(0, id.length-2)  
  var str_p = str.split('_')
  var menuType = str_p[0]
  
  var itemName=""
  str_p.forEach(function(s, i) {
    if(i!=0)
      itemName+=" "+s
  });
  itemName = itemName.slice(1)
  var quantity =  $("#"+str+"_q").val()  
  var comment =  $("#"+str+"_c").val()  
  var cartID =  $("#cartID").val() 
  var configName =  $("#"+str).val()
  var restaurantName = $("#rest").val() 
  var url = window.location.origin+"/user/restaurant/menu/addToCart/"
  var formData = {
    menuType : menuType,
    restaurantName : restaurantName,
    cartID  : cartID, 
    configName : configName, 
    itemName : itemName, 
    quantity : quantity, 
    comment : comment
  }
   $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success: function(result){
        var item_id = itemcount.toString()
        itemcount=itemcount + 1
        $('#cartItems').append("<tr id='"+item_id+"'> <td scope='col'>"+itemName+"</td><td scope='col'>"+configName+"</td><td scope='col'>"+
        comment+"</td><td scope='col'>"+quantity+"</td><td scope='col'><button class='btn btn-danger' id='"+item_id+"_ib'>Remove</button></td></tr>")
   
  
        },
        error : function(e) {
          alert("Error in select")
        }
    }); 
  
}

function ajaxCreateCart(){
  
  var areaName = $("#areas_select").val().split(" - ")[0]
  var address = $("#areas_select").val().slice(areaName.length+3)
  
  var restaurantName = $("#rest").val()
  var discountID = $("#discountCode").val()
  var url =window.location.origin+"/user/restaurant/menu/createCart/"
  
  var formData = {
    areaName : areaName,
    address : address, 
    restaurantName : restaurantName, 
    discountID : discountID
  }
   $.ajax({
        type : "POST",
        contentType : "application/json",
        url : url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success: function(result){
        $('#cartForm').empty();
        $('#cartForm').append("<input type='text' id='cartID' value='"+result[0].cartID+"' hidden></input><p> Cart Created </p>"+
        "<table class='container py-5 table' id='cartItems'> <thead><tr> <th scope='col'>Name</th> <th scope='col'>Config</th> "+
        "<th scope='col'>Comment</th> <th scope='col'>Quantity</th><th scope='col'></th></tr> </thead><tbody id='cartItems'> </tbody> </table>");
  
        },
        error : function(e) {
          alert("Error in select")
        }
    }); 
  
}


function ajaxGetAddresses(){
    var url =window.location.origin+"/user/address/byRestaurant/"+$("#rest").val()
    //alert(url)
    $.ajax({
      type : "GET",
      url : url, 
      success: function(result){
        
        $("#areas").empty();
        $("#areas").append("<label for='areas'>Select Address:</label><select class='form-control' id='areas_select' required>")
        
        $.each(result, function(i, area){
          $("#areas_select").append($('<option>', {
                    text: area.areaName +" - "+ area.addressLine1,
                    val: area.areaName+" - " + area.addressLine1
                }));
        });
        
        $("#areas_select").append("</select>")
        
        },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
  }