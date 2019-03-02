window.indexDemo = window.indexDemo || {};

indexDemo.isAndroid = function() { 
	if(navigator.userAgent.match(/Android/i)){
		return true;
	};
	return false;
}

indexDemo.isIOS = function() { 
	if(navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
	){
		return true;
	};
	return false;
}

indexDemo.isWindowsPhone = function() { 
	if(navigator.userAgent.match(/Windows Phone/i)){
		return true;
	};
	return false;
}

indexDemo.isBlackBerry = function() { 
	if(navigator.userAgent.match(/BlackBerry/i)){
		return true;
	};
	return false;
}

function gup(params){
	params = params || {};
	if(CloudAPI.containsPageParam("hls")){
		params["hls"] = "";
	}
	if(CloudAPI.containsPageParam("page_id")){
		params["page_id"] = CloudAPI.pageParams["page_id"];
	}
	if(CloudAPI.containsPageParam("preview")){
		params["preview"] = CloudAPI.pageParams["preview"];
	}
	return params;
}

function resizeVXGCloudPlayer(){
	if(vxgcloudplayer.isMobile()){
		$('body').addClass('mobile-player');
		// $('.content-absolute').width(window.innerWidth);
		// $('.menu-fixed').width(window.innerWidth);
	}else{
		$('body').removeClass('mobile-player');
	}
	
	var scale = Math.min( 
		$('body').outerWidth() / 640,
		$('body').outerHeight() / 480
	);
	scale = scale > 1 ? 1 : scale;
	var new_height = Math.round(scale*480)-30 + 'px';
	var new_width = Math.round(scale*640)-30 + 'px';
	
	$('.vxgcloudplayer').css({width: new_width, height: new_height});
	
	if($('body').outerWidth() > 960){
		$('.vxgcloudplayer-rightpanel').css({
			height: new_height,
			width: '190px',
			'margin-top': ''
		});
	}else{
		$('.vxgcloudplayer-rightpanel').css({
			height: 'auto',
			width: new_width,
			'margin-top': '10px'
		});
	}
}

$(window).resize(resizeVXGCloudPlayer);

indexDemo.showShareDialog = function(url){
	var left = (window.outerWidth - 600)/2;
	var top = (window.outerHeight - 400)/2;
	win = window.open(url, 'VXG Cloud Player', 'left=' + left + ',top=' + top + ',width=600,height=400');
}

indexDemo.startEducation = function(){
	
}

function updateQrCode(player){
	console.log("updateQrCode, player=" + player + ",  c2=" + player.c2);
	$('.page-link input').val(window.location.href);
	$('#qrcode').html('');
	var qrcode = new QRCode("qrcode", {
		text: window.location.href,
		width: 180,
		height: 180,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
}

$(document).ready(function() {

	resizeVXGCloudPlayer();
	$('.mobile-app-download.google-play-store').unbind().bind('click', function(){
		var url = '';
		if(vxgcloudplayer.isMobile()){
			url = 'market://details?id=com.vxg.cloud.player';
		}else{
			url = 'https://play.google.com/store/apps/details?id=com.vxg.cloud.player';
		}
		var win = window.open(url, '_blank');
		win.focus();
	});
	
	$('#play_url').unbind().bind('click',function(e){
		e.preventDefault();
		vxgcloudplayer('vxg_cloud_player1').play(e);
	});
	var switcher_url = false;

	vxgcloudplayer.beforePlay = function(player, event){
		if(switcher_url){
			vxgcloudplayer.swf = vxgcloudplayer.swf_minimal_latency;
			vxgcloudplayer.initSettingsPanel(player);
			player.src({type: 'camera', camid: player.cameraIDForStream, event: event});
			return;
		}
		
		var url = $('#url_input').val();
		var login = $('#url_login').val();
		var password = $('#url_password').val();

		player.src({ type: 'url', url: url, login: login, password: password, event: event});
		return false;
	}
	
	vxgcloudplayer.bind('loggined', function(){
		$('.page-link input').val(window.location.href);
	});
	
	$('#copy_link').unbind().bind('click', function(){
		$('.page-link input').select();
		var successful = false;
		try{var successful = document.execCommand('copy');} catch (err) {}
		if(!successful){
			if(vxgcloudplayer.osname() == "mac"){
				$('#copy_link_error').text("Please use the keyboard shortcuts: Ctrl + C");
			}else{
				$('#copy_link_error').text("Please use the keyboard shortcuts: Cmd ⌘ + C");
			}
			$('#copy_link_error').show();
		}
	})

	vxgcloudplayer.bind('updated_cameraname_streaming', function(plr){
		updateQrCode(plr);
	});

	vxgcloudplayer.bind('updated_current_camid', function(plr){
		updateQrCode(plr);
	});


	vxgcloudplayer.bind('camera_for_streaming_online', function(plr){
		switcher_url = true;
		updateQrCode(plr);
		if(plr.currentCamID == plr.cameraIDForStream && plr.playing){
			console.log("[DEBUG] Already played")
			return;
		}
		plr.play();
		$('.pull-video-form').addClass('disabled');
	});
	
	vxgcloudplayer.bind('camera_for_streaming_offline', function(plr){
		switcher_url = false;
		plr.stop();
		$('.pull-video-form').removeClass('disabled');
	});
	
	$('.share-icon.facebook').unbind().bind('click',function(){
		var url = 'https://www.facebook.com/sharer.php?src=sp&u=' + encodeURIComponent(window.location) + '&title=VXG%20Cloud%20Player&description=&picture=&utm_source=share2';
		indexDemo.showShareDialog(url);
	});
	
	$('.share-icon.gplus').unbind().bind('click',function(){
		var url = 'https://plus.google.com/share?url=' + encodeURIComponent(window.location) + '&utm_source=share2';
		indexDemo.showShareDialog(url);
	});

	$('.share-icon.twitter').unbind().bind('click',function(){
		var url = 'https://twitter.com/intent/tweet?text=VXG%20Cloud%20Player&url=' + encodeURIComponent(window.location) + '&hashtags=vxgcloudplayer&utm_source=share2';
		indexDemo.showShareDialog(url);
	});
	
	$('.share-icon.linkedin').unbind().bind('click',function(){
		var url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(window.location) + '&title=VXG%20Cloud%20Player&summary=&utm_source=share2';
		indexDemo.showShareDialog(url);
	});

	$('.share-icon.telegram').unbind().bind('click',function(){
		var url = 'https://telegram.me/share/url?url=' + encodeURIComponent(window.location) + '&text=VXG%20Cloud%20Player&utm_source=share2';
		indexDemo.showShareDialog(url);
	});
});
