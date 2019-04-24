$( document ).ready(function() {
  // SUBMIT FORM
   ajaxInit();
    $("#updateForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPostUpdate();
  });

  $("#addressForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPostAddress();
  });
  $("#areas_select").click(function(event){
    event.preventDefault();
    ajaxGetAreas();
  });
    
    
    function ajaxPostUpdate(){
      
      // PREPARE FORM DATA
      var formData = {
        username : $("#uname").val(),
        password :  $("#pwd").val(), 
        phoneNo:    $("#num").val(),
        addressLine1: $("#add").val(),
        email: $("#email").val(),
        Fname : $("#fname").val(),
        Lname: $("#lname").val(),
        day: $("#day").val(),
        month: $("#month").val(),
        year: $("#year").val()
      }
      
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url :"./user/changeInfo",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
       
        $("#updateRes").html("<p> Info Updated! <br> </p>"); 
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
      // Reset FormData after Posting
      resetData();
 
    }
    
     function ajaxInit(){
      
      // DO POST
      alert(user)
      $.ajax({
      type : "GET",
      url :"./user/profile/"+ user,
      success : function(response) {

        $("#pwd").setval(response.hashedPwd)
        $("#num").val(response.phoneNo)
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
      // Reset FormData after Posting
      resetData();
 
    }


   function ajaxPostAddress(){
      
      // PREPARE FORM DATA
      var formData = {
        areaName :  $("#areas_s").val(),
        address1 : $("#addtext").val()
      }
      alert(JSON.stringify(formData))
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url :"../user/address/add",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
        
        $("#addRes").html("<p> Address Added! <br> </p>"); 
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
      // Reset FormData after Posting
      resetData();
 
    } 
  function ajaxGetAreas(){

    $.ajax({
      type : "GET",
      url : "../user/areas",
      success: function(result){
        $('#areas').empty();
        $('#areas').append("<label for='areas'>Select Area:</label><select class='form-control 'id='areas_s'>")
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
        $('#add1').empty();
        $('#add1').append("<label >Address</label> <input type='text'"+
         "class='form-control' id='addtext' placeholder='address desciption' required></input>");
      },
      error : function(e) {
        alert("ERROR "+JSON.stringify(e));
        console.log("ERROR: ", e);
      }
    });  
  }
    
    function resetData(){
      $("#uname").val("");
      $("#pwd").val("");
      $("#num").val("");
      $("#add").val("");
      $("#email").val("")
      $("#fname").val("");
      $("#lname").val("");
      $("#day").val("");
      $("#month").val("");
      $("#year").val("");
    }
})