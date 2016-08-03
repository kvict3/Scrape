//Add comments
$('.commentSection').on('click', function(){

	var userComments = $(this).parent();
	$(userComments).empty();

	$(userComments).html