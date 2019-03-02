$('#contact_from_custom_webplayer').unbind().bind('submit',function(event){
	event.preventDefault();

	var data = {};
	data.productname = 'vxgcloudplayer';
	data.first_name = $('#first_name').val();
	data.last_name = $('#last_name').val();
	data.email = $('#email').val();
	data.company = $('#company').val();
	data.message = $('#message').val();
	var error = false;
	
	if(data.last_name.length == 0){
		error = true;
		$('.lastname').append('<span role="alert" class="wpcf7-not-valid-tip">Please fill the required field.</span>');
	}else{
		$('.lastname span').remove();
	}
	
	if(data.first_name.length == 0){
		error = true;
		$('.Firstname').append('<span role="alert" class="wpcf7-not-valid-tip">Please fill the required field.</span>');
	}else{
		$('.Firstname span').remove();
	}
	
	if(data.email.length == 0){
		error = true;
		$('.your-email').append('<span role="alert" class="wpcf7-not-valid-tip">Please fill the required field.</span>');
	}else{
		$('.your-email span').remove();
	}
	
	if(data.company.length == 0){
		error = true;
		$('.Company').append('<span role="alert" class="wpcf7-not-valid-tip">Please fill the required field.</span>');
	}else{
		$('.Company span').remove();
	}

	if(error){
		$('.ajax-loader').removeClass('is-active');
		return false;
	}
	$('.ajax-loader').addClass('is-active');
	
	$.ajax({
		type: 'POST',
		url: 'https://exchange.videoexpertsgroup.com/cloud/admin/api/v1/codes/request/',
		contentType: "application/json",
		data: JSON.stringify(data)
	}).done(function(r){
		console.log(r);
		$('.popup').addClass('show');
		$('.ajax-loader').removeClass('is-active');
	}).fail(function(r){
		console.error(r);
		$('.ajax-loader').removeClass('is-active');
		$('.modal-title').html('VXG Cloud Player (Trial)');
		if(r.responseJSON){
			$('.modal-body').html(r.responseJSON.errorDetail);
		}else{
			$('.modal-body').html('Sorry something wrong. <br>Please <a href="https://www.videoexpertsgroup.com/contact/">contact us</a>');
		}
		$('#trial_period_has_expired').modal('show');
	});
	
	return false;
})
