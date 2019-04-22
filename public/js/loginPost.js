$( document ).ready(function() {
  
  // SUBMIT FORM
    $("#loginForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPost();
  });
    
    
    function ajaxPost(){
      
      // PREPARE FORM DATA
      var formData = {
        username : $("#uname").val(),
        password :  $("#pwd").val()
      }
      
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location + "user/login",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(response) {
        if(response.length)
          window.location.href = "home"
        else  $("#postresult").html("<p>" + 
          "Login Unsuccessful "+ "</p>"); 
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
      
      // Reset FormData after Posting
      resetData();
 
    }
    
    function resetData(){
      $("#uname").val("");
      $("#pwd").val("");
    }
})