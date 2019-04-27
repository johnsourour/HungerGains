

$( document ).ready(function() {
   $("#aaf").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    alert(this.id)
    //ajaxAdd(this);
  });


    function ajaxAddAdmin(id){
      
      // PREPARE FORM DATA
      var formData = {
        username : $("#uname"+id).val(),
        password :  $("#pwd"+id).val(), 
        phoneNo:    $("#num"+id).val(),
        addressLine1: $("#add"+id).val(),
        email: $("#email"+id).val(),
        Fname : $("#fname"+id).val(),
        Lname: $("#lname"+id).val(),
        day: $("#day"+id).val(),
        month: $("#month"+id).val(),
        year: $("#year"+id).val()
      }
      var url;
      if(id=='aaf'){
        url=window.location.origin+"/admin/CreateAdmin"
      }
      else if(id=='asf'){
        url=window.location.origin+"/admin/CreateStaff"

      }
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : url,
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
       
        $
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
 
    }



});