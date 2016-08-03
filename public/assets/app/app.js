//Add comments
$('.commentSection').on('click', function(){

	var userComments = $(this).parent();
	$(userComments).empty();

	$(userComments).html(`
		<form action="/update/` + $(userComments).data('id')+`" method="post">
			<fieldset class="form-group">
			    <label for="commentBox">Comment:</label>
			    <textarea class="form-control" name="comment" id="commentBox" rows="3"></textarea>
			</fieldset>

			 <input type="submit" class="btn btn-danger" value="Add Comment"/>
		</form>
	`);
});

//Delete comments
$('.list-group-item').on('click', function(){
	var comments = $(this).text().trim();
	var userID  = $(this).parent().data('id');
	var userDelete = {
		comments: comments,
		userID: userID
	}
	console.log(userDelete);

	var currentURL = window.location.origin;

    $.post(currentURL + "/delete", userDelete);
  
});
