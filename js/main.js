$(document).ready(function() {
    // Add click event listener to all "Cancel" buttons
    $('.btn-primary').click(function() {
      // Find the parent card of the clicked button
      var card = $(this).closest('.card');
  
      // Remove the parent card from the page
      card.remove();
    });
  });


