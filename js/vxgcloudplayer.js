
// required jquery

// required videojs-5.18.3.js
// required videojs-contrib-media-sources.min.js?v=1
// required js/videojs-contrib-hls.js
// required CloudAPI.min.js
videojs.options.flash.swf = "swf/video-js-by-vxg-buff200.swf"
videojs.options.hls.overrideNative = true;
videojs.options.hls.overrideNative = true;
videojs.options.html5.nativeAudioTracks = false;
videojs.options.html5.nativeVideoTracks = false;

vxgcloudplayer = function(id, options){
	if(!document.getElementById(id)){
		console.error(" Player with " + id + " did not found");
		return undefined;
	}
	
	if(!window.vxgcloudplayer.players[id]){
		vxgcloudplayer.players[id] = new vxgcloudplayer.create(id, options);
	}
	return window.vxgcloudplayer.players[id];
}

vxgcloudplayer.version="1.0.4"; //version is updated by 'npm run build'
vxgcloudplayer.players = window.vxgcloudplayer.players || {};
vxgcloudplayer.cameraLifeTime = 10*60*1000; // 10 min
vxgcloudplayer.defaultLogin = "vxgcloudplayer";
vxgcloudplayer.defaultPassword = "vxgcloudplayer";
vxgcloudplayer.currentLogin = "vxgcloudplayer";
vxgcloudplayer.currentPassword = "vxgcloudplayer";
vxgcloudplayer.accp_url = window.location.protocol + "//cnvrclient2.videoexpertsgroup.com/";

vxgcloudplayer.accp_login_req_poling = function(data, d){
	$.ajax({
		url: vxgcloudplayer.accp_url + "api/v1/account/login/",
		type: 'POST',
		data: JSON.stringify(data),
		crossDomain: true,
		contentType: 'application/json'
	}).done(function(r){
		console.log(r);
		if(r.cloud_token && r.cloud_token.token){
			var scvp_host = CloudAPI.parseUri(r.svcp_auth_app_url).host;
			var response = {};
			response.token = r.cloud_token.token;
			response.expire = r.cloud_token.expire;
			response.svcp_host = window.location.protocol + "//" + scvp_host + "/";
			CloudAPI.setToStorage("CloudAPI_svcp_host", response.svcp_host);
			d.resolve(response);
		}else{
			if(vxgcloudplayer.currentLogin != data.username && vxgcloudplayer.currentPassword != data.password){
				console.error("Another login and password");
				return;
			}
			console.warn("Try again");
			setTimeout(function(){
				vxgcloudplayer.accp_login_req_poling(data, d);
			},1000);
		}
	}).fail(function(r){
		d.reject(r);
	})
}

window.vxgcloudplayer.accp_login_poling = -1;
window.vxgcloudplayer.accp_login = function(username,password){
	var d = $.Deferred();
	$.ajaxSetup({
		crossDomain: true,
		cache: false
	});
	var data = {};
	vxgcloudplayer.currentLogin = username || vxgcloudplayer.defaultLogin;
	vxgcloudplayer.currentPassword = password || vxgcloudplayer.defaultPassword;
	data.username = vxgcloudplayer.currentLogin;
	data.password = vxgcloudplayer.currentPassword;
	data.cloud_token = true;
	vxgcloudplayer.accp_login_req_poling(data, d);
	return d;
}

window.vxgcloudplayer.updateServerTime = function(){
	CloudAPI.serverTime().done(function(response){
		var current_utc = new Date().getTime();
		vxgcloudplayer.diffServerTime = Date.parse(response.utc + "Z") - current_utc;
		console.log("vxgcloudplayer.diffServerTime: " + vxgcloudplayer.diffServerTime);
	}).fail(function(r){
		if(r.status == 404) return;
		vxgcloudplayer.updateServerTime();
	});
}

window.vxgcloudplayer.create = function(id, options){
	vxgcloudplayer.defaultWidth = vxgcloudplayer.defaultWidth || 640;
	vxgcloudplayer.defaultHeight = vxgcloudplayer.defaultHeight || 480;

	if(vxgcloudplayer.diffServerTime == undefined){
		vxgcloudplayer.updateServerTime();
	}

	var self = this;
	self.id = id;
	self.player = document.getElementById(id);
	self.m = {};
	options = options || {};
	self.m.autohide = options.autohide || 2000;
	videojs.options.hls = videojs.options.hls || {};
	videojs.options.hls.overrideNative = true;
	videojs.options.html5.nativeAudioTracks = false;
	videojs.options.html5.nativeVideoTracks = false;

	self.lasturl = options.url || self.player.getAttribute('url') || "";
	self.playerWidth = options.width || vxgcloudplayer.defaultWidth;
	self.playerHeight = options.height || vxgcloudplayer.defaultHeight;
	self.playerWidth = parseInt(self.player.getAttribute('width'),10) || self.playerWidth;
	self.playerHeight = parseInt(self.player.getAttribute('height'),10) || self.playerHeight;	
	self.player.style.width = self.playerWidth + 'px';
	self.player.style.height = self.playerHeight + 'px';
	var html = ''
		+ '<div class="vxgcloudplayer-loader" style="display: inline-block"></div>'
		+ '<div class="vxgcloudplayer-screenshot-loading" style="display: none">'
		+ '		<div class="vxgcloudplayer-screenshot-loading">'
		+ '     </div>'
		+ '</div>'
		+ '<div class="vxgcloudplayer-error" style="display: none">'
		+ '	<div class="vxgcloudplayer-error-text" style="display: none"></div>'
		+ '</div>'
		+ '<div class="vxgcloudplayer-controls-zoom-position">'
		+ '		<div class="vxgcloudplayer-zoom-position-cursor"></div>'
		+ '</div>'
		+ '<div class="vxgcloudplayer-info" style="display: none">'
		+ '</div>'
		+ '<div class="vxgcloudplayer-controls-zoom">'
		+ '	<div class="vxgcloudplayer-zoom-up"></div>'
		+ '	<div class="vxgcloudplayer-zoom-progress zoom10x"></div>'
		+ '	<div class="vxgcloudplayer-zoom-down"></div>'
		+ '</div>'
		+ '<div class="vxgcloudplayer-controls">'
		+ '	<div class="vxgcloudplayer-volume-mute"></div>'
		+ '	<div class="vxgcloudplayer-volume-down"></div>'
		+ '	<div class="vxgcloudplayer-volume-progress vol7"></div>'
		+ '	<div class="vxgcloudplayer-volume-up"></div>'
		+ '	<div class="vxgcloudplayer-play"></div>'
		+ '	<div class="vxgcloudplayer-stop" style="display: none"></div>'
		+ '	<div class="vxgcloudplayer-fullscreen"></div>'
		+ '</div>'
		+ '<video crossorigin="anonymous" id="' + id + '_vjs" class="video-js" preload="auto" class="video-js vjs-default-skin vjs-live"'
		+ ' muted=true autoplay=true preload></video>';

	self.player.innerHTML = html;
	self.stopped = true;
	self.playing = false;
	
	self.vjs = videojs(id + '_vjs', {
		"controls": false
	});
	self.vjs.on('error',function(error){
		self.hideloading();
		if(self.vjs.error() != null){
			var e = self.vjs.error();
			self.showerror("Code " + e.code + ": " + e.message);
		}
		self.stop();
	});
	
	// poling time
	self.time = 0;

	var el_controls = self.player.getElementsByClassName('vxgcloudplayer-controls')[0];
	var el_controls = self.player.getElementsByClassName('vxgcloudplayer-controls')[0];
	var el_controls_zoom = self.player.getElementsByClassName('vxgcloudplayer-controls-zoom')[0];
	var el_controls_zoom_position = self.player.getElementsByClassName('vxgcloudplayer-controls-zoom-position')[0];
	var el_play = self.player.getElementsByClassName('vxgcloudplayer-play')[0];
	var el_info = self.player.getElementsByClassName('vxgcloudplayer-info')[0];
	var el_stop = self.player.getElementsByClassName('vxgcloudplayer-stop')[0];
	var el_loader = self.player.getElementsByClassName('vxgcloudplayer-loader')[0];
	var el_error = self.player.getElementsByClassName('vxgcloudplayer-error')[0];
	var el_error_text = self.player.getElementsByClassName('vxgcloudplayer-error-text')[0];
	
	self.startPolingTime = function(){
		clearInterval(self.currentTimeInterval);
		self.currentTimeInterval = setInterval(function(){
			if(self.playing && !self.stopped){
				if(self.vjs.currentTime() == self.time){
					self.showloading();
				}else{
					self.time = self.vjs.currentTime();
					self.hideloading();
				}
			}else{
				self.hideloading();
			}
		},1000);
	}
	
	self.stopPolingTime = function(){
		clearInterval(self.currentTimeInterval);
	}
		
	self.stop = function(){
		self.stopped = true;
		self.playing = false;
		self.reset_vjs();
		el_stop.style.display = "none";
		el_play.style.display = "inline-block";
		self.hideloading();
		self.stopPolingTime();
		vxgcloudplayer.stopPolingMediaTicket();
		vxgcloudplayer.stopPolingCameraLife();
		self.currentCamID = 0;
		self.hideInfo();
	}

	self.reset_vjs = function(){
		videojs(self.id + '_vjs').reset();
		videojs(self.id + '_vjs').controls(false);
		videojs(self.id + '_vjs').muted(false);
		self.volume(self.m.volume);
		self.stopPolingTime();
		vxgcloudplayer.stopPolingMediaTicket();
		vxgcloudplayer.stopPolingCameraLife();
		// videojs('vxg_cloud_player1_vjs')
		self.hideInfo();
	}

	self.src = function(url, login, password){
		self.stopped = false;
		self.playing = true;
		self.startPolingTime();
		self.lasturl = url;
		el_stop.style.display = "inline-block";
		el_play.style.display = "none";
		self.reset_vjs();
		self.hideerror();
		self.showloading();
		vxgcloudplayer.getCamIDByUrl(id, url, login, password);
	}
	
	self.srcByCamID = function(camid){
		self.stopped = false;
		self.playing = true;
		self.startPolingTime();
		self.lasturl = camid;
		el_stop.style.display = "inline-block";
		el_play.style.display = "none";
		self.reset_vjs();
		self.hideerror();
		self.showloading();
		videojs(self.id + '_vjs').reset();
		vxgcloudplayer.loadLiveUrl(camid, self.id);
	}

	self.dispose = function(){
		self.stop();
		clearInterval(self.currentTime);
		delete window.vxgcloudplayer.players[self.id];
	}

	self.showerror = function(text){
		self.hideloading();
		el_error.style.display = "inline-block";
		el_error_text.style.display = "inline-block";
		el_error_text.innerHTML = text;
	}

	self.hideerror = function(){
		el_error.style.display = "none";
		el_error_text.style.display = "none";
	}
	self.showedloading = true;
	
	self.showloading = function(){
		if(!self.showedloading){
			el_loader.style.display = "inline-block";
			self.showedloading = true;
		}
	}

	self.hideloading = function(){
		if(self.showedloading){
			el_loader.style.display = "none";
			self.showedloading = false;
		}
	}

	self.hideloading();

	self.play = function(){
		if(vxgcloudplayer.beforePlay){
			if(!vxgcloudplayer.beforePlay(self)){
				return;
			}
		}

		if(self.lasturl){
			if(Number.isInteger(self.lasturl)){
				self.srcByCamID(self.lasturl);
			}else{
				self.src(self.lasturl);	
			};
		}
	}

	self.size = function(width, height){
		if(width && height){
			if(Number.isInteger(width) && Number.isInteger(height)){
				var w = parseInt(width,10);
				var h = parseInt(height,10);
				self.playerWidth = self.playerWidth != w ? w : self.playerWidth;
				self.playerHeight = self.playerHeight != h ? h : self.playerHeight;
				self.player.style.width = width + 'px';
				self.player.style.height = height + 'px';
			}else{
				self.player.style.width = width;
				self.player.style.height = height;
			}
		}else{
			return  { width: self.playerWidth, height: self.playerHeight };
		}
	};

	self.set_controls_opacity = function(val){
		el_controls.style.opacity = val;
		el_controls_zoom.style.opacity = val;
		el_controls_zoom_position.style.opacity = val;
		el_info.style.opacity = val;
	}
			
	self.restartTimeout = function(){
		if(self.m.autohide <= 0){
			self.set_controls_opacity("0");
			return;
		}
		self.set_controls_opacity("0.7");
		clearTimeout(self.timeout);
		self.timeout = setTimeout(function(){
			self.set_controls_opacity("0");
		},self.m.autohide);
	};

	self.player.addEventListener('mousemove', self.restartTimeout, true);
	self.player.addEventListener('touchmove', self.restartTimeout, true);
	self.player.addEventListener('touchstart', self.restartTimeout, true);

	self.restartTimeout();

	window.vxgcloudplayer.initZoomControls(self);
	window.vxgcloudplayer.initFullscreenControls(self);
	window.vxgcloudplayer.initVolumeControls(self);
	window.vxgcloudplayer.initInfoPanel(self);

	el_play.onclick = self.play;
	el_stop.onclick = self.stop;
}
window.vxgcloudplayer.usehls = false;

vxgcloudplayer.applyMediaTiket = function(url_hls, expire){
	console.log("media-tiсket: old = " + vxgcloudplayer.hls_mediaticket_value);
	if(url_hls.indexOf('?') != -1){
		vxgcloudplayer.hls_mediaticket_value = '?' + url_hls.split('?')[1];
	}
	vxgcloudplayer.hls_mediaticket_expire = Date.parse(expire + 'Z');
	console.log("media-tiсket: new = " + vxgcloudplayer.hls_mediaticket_value);
}

window.vxgcloudplayer.polingCameraLifeInterval = undefined;

window.vxgcloudplayer.startPolingCameraLife = function(camid, playerid){
	clearInterval(vxgcloudplayer.polingCameraLifeInterval);
	console.log("camera-life: start poling ");
	var vcp = vxgcloudplayer(playerid);
	vxgcloudplayer.polingCameraLifeInterval = setInterval(function(){
		if(camid != vcp.currentCamID){
			vxgcloudplayer.stopPolingMediaTicket();
			return;
		}
		CloudAPI.cameraInfo(camid).done(function(cam){
			if(cam.url){
				var login = cam.login || "";
				var password = cam.password || "";
				vxgcloudplayer.updateCameraInfo(cam, cam.url, login, password);
			}
		}).fail(function(r){
			if(r.status != 0){
				console.error("camera-life: stop poling ", r);
				vxgcloudplayer.stopPolingMediaTicket();
			}
		})
	},window.vxgcloudplayer.cameraLifeTime/4);
}
window.vxgcloudplayer.stopPolingCameraLife = function(){
	console.log("camera-life: stop poling ");
	clearInterval(vxgcloudplayer.polingCameraLifeInterval);
}

window.vxgcloudplayer.polingMediaTicketInterval = undefined;

window.vxgcloudplayer.startPolingMediaTicket = function(camid, playerid){
	clearInterval(vxgcloudplayer.polingMediaTicketInterval);
	var vcp = vxgcloudplayer(playerid);
	vxgcloudplayer.polingMediaTicketInterval = setInterval(function(){
		if(camid != vcp.currentCamID){
			vxgcloudplayer.stopPolingMediaTicket();
			return;
		}
		var cur_time_utc = new Date().getTime() + vxgcloudplayer.diffServerTime;
		var expired_after = vxgcloudplayer.hls_mediaticket_expire - cur_time_utc;
		expired_after = Math.round(expired_after/1000);
		// console.log("media-tiсket for camid " + camid + ', expired after ' + expired_after + ' s');
		if(expired_after < 2*60){ // less then 2 minutes
			console.log("media-tiсket: Updating");
			CloudAPI.cameraLiveUrls(camid).done(function(live_urls){
				vxgcloudplayer.applyMediaTiket(live_urls.hls, live_urls.expire);
				console.log("media-tiсket: Updated");
			}).fail(function(r){
				if(r.status != 0){
					console.error("media-tiсket: stop poling ", r);
					vxgcloudplayer.stopPolingMediaTicket();
				}
			});
		}
	},10*1000); // every 10 sec
}
window.vxgcloudplayer.stopPolingMediaTicket = function(){
	clearInterval(vxgcloudplayer.polingMediaTicketInterval);
}

window.vxgcloudplayer.polingHLSList = function(live_urls, camid, playerid){
	var vcp = vxgcloudplayer(playerid);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', live_urls.hls);
	xhr.onload = function() {
		if(xhr.status === 200){
			if(vcp.currentCamID != camid){
				return;
			}
			vxgcloudplayer.applyMediaTiket(live_urls.hls, live_urls.expire);
			vxgcloudplayer.startPolingMediaTicket(camid, playerid);
			videojs.Hls.xhr.beforeRequest = function(options){
				if(options.uri.indexOf(".ts") + 3 == options.uri.length){
					options.uri += vxgcloudplayer.hls_mediaticket_value;
					return options;
				}
				if(options.uri.indexOf("?") != -1){
					var new_uri = options.uri.split("?")[0];
					if(new_uri.indexOf(".m3u8") + 5 == new_uri.length){
						// console.log("media-tiсket: m3u8 vxgcloudplayer.hls_mediaticket_value = " + vxgcloudplayer.hls_mediaticket_value);
						options.uri = new_uri + vxgcloudplayer.hls_mediaticket_value;
						return options;
					}
				}
				return options;
			}
			vcp.vjs.src([{src: live_urls.hls,
				type: 'application/x-mpegURL'
			}]);
		}else if(xhr.status === 404){
			if(vcp.currentCamID == camid){
				setTimeout(function(){
					console.warn("wait one sec " + live_urls.hls);
					vxgcloudplayer.polingHLSList(live_urls, camid, playerid);
				},1000);
			}
		}else{
			console.error("Unhandled");
		}
	};
	xhr.send();
}

window.vxgcloudplayer.loadLiveUrl = function(camid, playerid, inc){
	inc = inc || 0;
	console.log("loadLiveUrl(inc=" + inc + ", camid=" + camid);
	CloudAPI.cameraLiveUrls(camid).done(function(r){
		console.log(r);
		var vcp = vxgcloudplayer(playerid);
		vcp.vjs.ready(function(){
			vcp.currentCamID = camid;
			if(!vxgcloudplayer.usehls){
				console.log("Set url (rtmp): " + r.rtmp);
				vcp.vjs.src([{src: r.rtmp, type: 'rtmp/mp4'}]);
				vcp.showInfo("Flash");
			}else{
				console.log("Set url (hls): " + r.hls);
				vcp.showInfo("HLS");
				vxgcloudplayer.polingHLSList(r, camid, playerid);
			}
			vxgcloudplayer.startPolingCameraLife(camid, playerid);
			
			vcp.vjs.play();
			vcp.vjs.on('ended', function() {
				vcp.stop();
			});
			vcp.vjs.on('loadeddata', function() {
				vcp.hideloading();
				vxgcloudplayer.initZoomControls(vcp);
				vxgcloudplayer.initVolumeControls(vcp);
			});
		});
	}).fail(function(r){
		if(r.status && r.status == 503){
			// try load urls
			inc++;
			if(inc < 10){
				setTimeout(function(){
					vxgcloudplayer.loadLiveUrl(camid, playerid, inc);
				}, 500);
			}else{
				console.error(r);
				vxgcloudplayer(playerid).showerror(r.responseJSON.errorDetail + "<br> cam#" + camid);
			}
			return;
		}
		var error = "failed (TODO handle this error)";
		console.error(r);
		if(r.responseJSON && r.responseJSON.errorDetail){
			error = r.responseJSON.errorDetail;
		}
		vxgcloudplayer(playerid).showerror(error);
	});
}

window.vxgcloudplayer.splitUserInfoFromURL = function(url){
	var a = CloudAPI.parseUri(url);
	var result = a.protocol + "://" + a.host + (a.port != "" ? ":" + a.port : '') + a.path;
	console.log(a);
	var login = (a.user != "" ? a.user : undefined);
	var password = (a.password != "" ? a.password : undefined);
	return {url: result, login: login, password: password};
}

window.vxgcloudplayer.combineURL = function(url, login, password){
	if(login == "") login = undefined;
	if(password == "") password = undefined;
	var a = CloudAPI.parseUri(url);
	var result = a.protocol + "://";
	if(login || password){
		result += login;
		if(password){
			result += ":" + password;
		}
		result += "@";
	}
	result += a.host + (a.port != "" ? ":" + a.port : '') + a.path;
	return result;
}

window.vxgcloudplayer.isSupportedProtocol = function(url){
	var a = CloudAPI.parseUri(url);
	return (a.protocol == "rtmp" || a.protocol == "rtsp");
}

vxgcloudplayer.updateCameraInfo = function(cam, url_withoutUserInfo, login, password){
	var data = {};
	var need_update = false;
	if(cam.password != password){
		console.warn("Will be updated password");
		data['url'] = vxgcloudplayer.combineURL(url_withoutUserInfo, login, password);
		data['password'] = password;
		need_update = true;
	}
	var d = new Date();
	var current_utc = d.getTime() + vxgcloudplayer.diffServerTime;
	if(cam.delete_at == null){
		console.warn("Will be set cam delete_at");
		data['delete_at'] = CloudAPI.convertUTCTimeToUTCStr(current_utc + vxgcloudplayer.cameraLifeTime);
		need_update = true;
	}else{
		var cam_time = Date.parse(cam.delete_at + 'Z');
		if(cam_time - current_utc < vxgcloudplayer.cameraLifeTime/2){
			console.warn("Will be update cam delete_at");
			data['delete_at'] = CloudAPI.convertUTCTimeToUTCStr(current_utc + vxgcloudplayer.cameraLifeTime);
			need_update = true;
		}
	}

	if(need_update){
		console.log("Update Info");
		CloudAPI.cameraUpdate(cam.id, data);
	}else{
		console.log("delete_at: Not need update");
	}
}

window.vxgcloudplayer.getCamIDByUrl = function(playerid, url, login, password){
	
	if(!window.vxgcloudplayer.isSupportedProtocol(url)){
		vxgcloudplayer(playerid).stop();
		vxgcloudplayer(playerid).showerror("Sorry this protocol are not supported.<br>Please try rtmp or rtsp");
		return;
	}
	
	var a = vxgcloudplayer.splitUserInfoFromURL(url);
	var url_withoutUserInfo = a.url;
	login = login || a.login || "";
	password = password || a.password || "";
	
	var params = {};
	params['detail']='detail';
	params['url'] = url_withoutUserInfo;
	if(login != ""){
		params['login'] = login;
	}

	CloudAPI.camerasList(params).done(function(r){
		var found = false;
		for(var i = 0; i < r.objects.length; i++){
			var cam = r.objects[i];
			var cam_login = cam.login ? cam.login : "";
			var cam_password = cam.password ? cam.password : "";
			if(cam.url == a.url && cam_login == login && !found){
				found = true;
				vxgcloudplayer.loadLiveUrl(cam.id, playerid);
				vxgcloudplayer.updateCameraInfo(cam, url_withoutUserInfo, login, password);
			}
		}
		if(!found){
			var d = new Date();
			var current_utc = d.getTime() + vxgcloudplayer.diffServerTime;
			CloudAPI.cameraCreate({
				url: url,
				login: login,
				password: password,
				delete_at: CloudAPI.convertUTCTimeToUTCStr(current_utc + vxgcloudplayer.cameraLifeTime)
			}).done(function(r){
				vxgcloudplayer.loadLiveUrl(r.id, playerid);
			}).fail(function(r){
				console.error(r);
				var error = "Limited cameras";
				if(r.responseJSON && r.responseJSON.errorDetail){
					error = r.responseJSON.errorDetail;
				}
				if(r.status == 403){
					error = "The allowed number of live channels is exceeded.<br>Please contact to VXG tech support to increase it.";
					console.log("playerid = " + playerid);
				}
				if(r.status == 400 && error.indexOf('delete_at') != -1 && error.indexOf('malformed') != -1){
					error = "Sorry but this user could not create live channels.<br>Please contact to VXG tech support to request it.";
				}

				vxgcloudplayer(playerid).stop();
				vxgcloudplayer(playerid).showerror(error);
			});
		}
	}).fail(function(r){
		console.error(r);
		vxgcloudplayer(playerid).showerror("failed (TODO handle this error)");
	});
}

// helper function
vxgcloudplayer.getAbsolutePosition = function(element){
	var r = { x: element.offsetLeft, y: element.offsetTop };
	if (element.offsetParent) {
	var tmp = vxgcloudplayer.getAbsolutePosition(element.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
};

vxgcloudplayer.initZoomControls = function(self){
	self.currentZoom = 0;
	
	var el_controls_zoom = self.player.getElementsByClassName('vxgcloudplayer-controls-zoom')[0];
	var el_controls_zoom_position = self.player.getElementsByClassName('vxgcloudplayer-controls-zoom-position')[0];
	var el_zoomUp = self.player.getElementsByClassName('vxgcloudplayer-zoom-up')[0];
	var el_zoomDown = self.player.getElementsByClassName('vxgcloudplayer-zoom-down')[0];
	var el_zoomProgress = self.player.getElementsByClassName('vxgcloudplayer-zoom-progress')[0];
	var el_zoomPositionCursor = self.player.getElementsByClassName('vxgcloudplayer-zoom-position-cursor')[0];
	var el_videojs = self.player.getElementsByClassName('video-js')[0];

	self.setNewZoom = function(v){
		if(v >= 30){ v = 30; }
		if(v <= 10){ v = 10; }
		
		if(self.currentZoom != v){
			self.currentZoom = v;
			el_videojs.style.transform = "scale(" + (self.currentZoom/10) + ")";
			el_zoomPositionCursor.style.transform = "scale(" + (10/self.currentZoom) + ")";
			el_zoomProgress.className = el_zoomProgress.className.replace(/zoom\d+x/g,'zoom' + Math.ceil(self.currentZoom) + 'x');
			el_controls_zoom_position.style.display = self.currentZoom == 10 ? "none" : "";
			el_videojs.style.left = '';
			el_videojs.style.top = '';
			el_zoomPositionCursor.style.left = '';
			el_zoomPositionCursor.style.top = '';
		}
	}
	
	self.setNewZoom(10);
	
	self.zoomUp = function(){
		self.setNewZoom(self.currentZoom + 5)
	}
	self.zoomDown = function(){
		self.setNewZoom(self.currentZoom - 5);
	}
	self.zoomProgressDownBool = false;
	self.zoomProgressDown = function(e){
		self.zoomProgressDownBool = true;
	}

	self.zoomProgressMove = function(e){
		if(self.zoomProgressDownBool == true){
			var y = e.pageY - vxgcloudplayer.getAbsolutePosition(e.currentTarget).y;
			var height = el_zoomProgress.offsetHeight;
			var steps = height/5;
			y = 10*(Math.floor((height-y)/steps)/2 + 1);
			self.setNewZoom(y);				
		}
	}
	self.zoomProgressLeave = function(e){
		self.zoomProgressDownBool = false;
	}
	self.zoomProgressUp = function(e){
		if(self.zoomProgressDownBool == true){
			var y = e.pageY - vxgcloudplayer.getAbsolutePosition(e.currentTarget).y;
			var height = el_zoomProgress.offsetHeight;
			var steps = height/5;
			y = 10*(Math.floor((height-y)/steps)/2 + 1);
			self.setNewZoom(y);	
		}
		self.zoomProgressDownBool = false;
	}
	
	self.zoomCursorDownBool = false;
	self.zoomCursorX = 0;
	self.zoomCursorY = 0;
	self.zoomCursorWidth = 160;
	self.zoomCursorHeight = 120;
	self.zoomControlsWidth = 0;
	self.zoomControlsHeight = 0;
	self.zoomCursorDown = function(e){
		self.zoomCursorX = e.pageX;
		self.zoomCursorY = e.pageY;
		self.zoomCursorWidth = el_zoomPositionCursor.offsetWidth;
		self.zoomCursorHeight = el_zoomPositionCursor.offsetHeight;
		self.zoomControlsWidth = el_controls_zoom_position.offsetWidth;
		self.zoomControlsHeight = el_controls_zoom_position.offsetHeight;
		self.zoomCursorDownBool = true;
	}
	
	self.zoomCursorUp = function(e){
		console.log("zoomCursorUp");
		self.zoomCursorDownBool = false;
	}
	
	self.zoomCursorMove = function(e){
		if(self.zoomCursorDownBool == true){
			var diffX = self.zoomCursorX - e.pageX;
			var diffY = self.zoomCursorY - e.pageY;
			self.zoomCursorX = e.pageX;
			self.zoomCursorY = e.pageY;
			var newx = el_zoomPositionCursor.offsetLeft - diffX;
			var newy = el_zoomPositionCursor.offsetTop - diffY;
			var d2x = (self.zoomControlsWidth - self.zoomCursorWidth*(10/self.currentZoom));
			var d2y = (self.zoomControlsHeight - self.zoomCursorHeight*(10/self.currentZoom));
			var minX = -1*d2x/2;
			var maxX = d2x/2;
			var minY = -1*d2y/2;
			var maxY = d2y/2;
			if(newx < minX) newx = minX;
			if(newy < minY) newy = minY;
			if(newx >= maxX) newx = maxX;
			if(newy >= maxY) newy = maxY;
			el_zoomPositionCursor.style.left = newx + "px";
			el_zoomPositionCursor.style.top = newy + "px";
			var zoom = self.currentZoom/10 - 1;
			var left = Math.floor(-100*((newx/d2x)*zoom));
			var top = Math.floor(-100*((newy/d2y)*zoom));
			el_videojs.style.left = left + '%';
			el_videojs.style.top = top + '%';
		}
	}

	self.setNewZoom = function(v){
		if(v >= 30){ v = 30; }
		if(v <= 10){ v = 10; }
		
		if(self.currentZoom != v){
			self.currentZoom = v;
			el_videojs.style.transform = "scale(" + (self.currentZoom/10) + ")";
			el_zoomPositionCursor.style.transform = "scale(" + (10/self.currentZoom) + ")";
			el_zoomProgress.className = el_zoomProgress.className.replace(/zoom\d+x/g,'zoom' + Math.ceil(self.currentZoom) + 'x');
			el_controls_zoom_position.style.display = self.currentZoom == 10 ? "none" : "";
			el_videojs.style.left = '';
			el_videojs.style.top = '';
			el_zoomPositionCursor.style.left = '';
			el_zoomPositionCursor.style.top = '';
		}
	}
	
	self.zoomUp = function(){
		self.setNewZoom(self.currentZoom + 5)
	}
	self.zoomDown = function(){
		self.setNewZoom(self.currentZoom - 5);
	}
	self.zoomProgressDownBool = false;
	self.zoomProgressDown = function(e){
		self.zoomProgressDownBool = true;
	}

	self.zoomProgressMove = function(e){
		if(self.zoomProgressDownBool == true){
			var y = e.pageY - vxgcloudplayer.getAbsolutePosition(e.currentTarget).y;
			var height = el_zoomProgress.offsetHeight;
			var steps = height/5;
			y = 10*(Math.floor((height-y)/steps)/2 + 1);
			self.setNewZoom(y);				
		}
	}
	self.zoomProgressLeave = function(e){
		self.zoomProgressDownBool = false;
	}
	self.zoomProgressUp = function(e){
		if(self.zoomProgressDownBool == true){
			var y = e.pageY - vxgcloudplayer.getAbsolutePosition(e.currentTarget).y;
			var height = el_zoomProgress.offsetHeight;
			var steps = height/5;
			y = 10*(Math.floor((height-y)/steps)/2 + 1);
			self.setNewZoom(y);	
		}
		self.zoomProgressDownBool = false;
	}
	
	self.zoomCursorDownBool = false;
	self.zoomCursorX = 0;
	self.zoomCursorY = 0;
	self.zoomCursorWidth = 160;
	self.zoomCursorHeight = 120;
	self.zoomControlsWidth = 0;
	self.zoomControlsHeight = 0;
	self.zoomCursorDown = function(e){
		self.zoomCursorX = e.pageX;
		self.zoomCursorY = e.pageY;
		self.zoomCursorWidth = el_zoomPositionCursor.offsetWidth;
		self.zoomCursorHeight = el_zoomPositionCursor.offsetHeight;
		self.zoomControlsWidth = el_controls_zoom_position.offsetWidth;
		self.zoomControlsHeight = el_controls_zoom_position.offsetHeight;
		self.zoomCursorDownBool = true;
	}
	
	self.zoomCursorUp = function(e){
		console.log("zoomCursorUp");
		self.zoomCursorDownBool = false;
	}
	
	self.zoomCursorMove = function(e){
		if(self.zoomCursorDownBool == true){
			var diffX = self.zoomCursorX - e.pageX;
			var diffY = self.zoomCursorY - e.pageY;
			self.zoomCursorX = e.pageX;
			self.zoomCursorY = e.pageY;
			var newx = el_zoomPositionCursor.offsetLeft - diffX;
			var newy = el_zoomPositionCursor.offsetTop - diffY;
			var d2x = (self.zoomControlsWidth - self.zoomCursorWidth*(10/self.currentZoom));
			var d2y = (self.zoomControlsHeight - self.zoomCursorHeight*(10/self.currentZoom));
			var minX = -1*d2x/2;
			var maxX = d2x/2;
			var minY = -1*d2y/2;
			var maxY = d2y/2;
			if(newx < minX) newx = minX;
			if(newy < minY) newy = minY;
			if(newx >= maxX) newx = maxX;
			if(newy >= maxY) newy = maxY;
			el_zoomPositionCursor.style.left = newx + "px";
			el_zoomPositionCursor.style.top = newy + "px";
			var zoom = self.currentZoom/10 - 1;
			var left = Math.floor(-100*((newx/d2x)*zoom));
			var top = Math.floor(-100*((newy/d2y)*zoom));
			el_videojs.style.left = left + '%';
			el_videojs.style.top = top + '%';
		}
	}

	el_zoomUp.onclick = self.zoomUp;
	el_zoomDown.onclick = self.zoomDown;
	el_zoomPositionCursor.addEventListener('mousedown',self.zoomCursorDown,false);
	el_zoomPositionCursor.addEventListener('mousemove',self.zoomCursorMove,false);
	el_zoomPositionCursor.addEventListener('mouseleave',self.zoomCursorUp,false);
	el_zoomPositionCursor.addEventListener('mouseup',self.zoomCursorUp,false);
	el_zoomProgress.addEventListener('mousedown',self.zoomProgressDown,false);
	el_zoomProgress.addEventListener('mousemove',self.zoomProgressMove,false);
	el_zoomProgress.addEventListener('mouseleave',self.zoomProgressLeave,false);
	el_zoomProgress.addEventListener('mouseup',self.zoomProgressUp,false);
}

vxgcloudplayer.initFullscreenControls = function(self){
	var el_fullscreen = self.player.getElementsByClassName('vxgcloudplayer-fullscreen')[0];
	
	self.changedFullscreen = function(){
		console.log('changedFullscreen');
		if (document.webkitIsFullScreen){
			self.size('100%', '100%');
			console.log('changedFullscreen -> fullscreen');
		}else{
			self.size(self.playerWidth + 'px', self.playerHeight + 'px');
			console.log('changedFullscreen -> NOT fullscreen');
		}
	};

	if (document.addEventListener){
		document.addEventListener('webkitfullscreenchange', self.changedFullscreen, false);
		document.addEventListener('mozfullscreenchange', self.changedFullscreen, false);
		document.addEventListener('fullscreenchange', self.changedFullscreen, false);
		document.addEventListener('MSFullscreenChange', self.changedFullscreen, false);
	}

	self.fullscreen = function(){
		console.log("fullscreen: clicked");
		if(document.webkitIsFullScreen == true){
			document.webkitCancelFullScreen();
		}else{
			if(self.player.requestFullscreen) {
				self.player.requestFullscreen();
			} else if(self.player.webkitRequestFullscreen) {
				self.player.webkitRequestFullscreen();
			} else if(self.player.mozRequestFullscreen) {
				self.player.mozRequestFullScreen();
			}
		}
	};
	
	el_fullscreen.onclick = self.fullscreen;
}

window.vxgcloudplayer.initInfoPanel = function(self){
	var el_info = self.player.getElementsByClassName('vxgcloudplayer-info')[0];
	self.showInfo = function(s){
		el_info.style.display='block';
		el_info.innerHTML = s;
	}
	self.hideInfo = function(){
		el_info.style.display='none';
	}
}

vxgcloudplayer.initVolumeControls = function(self){
	var el_volumeMute = self.player.getElementsByClassName('vxgcloudplayer-volume-mute')[0];
	var el_volumeDown = self.player.getElementsByClassName('vxgcloudplayer-volume-down')[0];
	var el_volumeProgress = self.player.getElementsByClassName('vxgcloudplayer-volume-progress')[0];
	var el_volumeUp = self.player.getElementsByClassName('vxgcloudplayer-volume-up')[0];

	self.m = self.m || {};
	self.m.volume = 0.5;
	if(self.m.mute){
		el_volumeDown.style.display='none';
		el_volumeProgress.style.display='none';
		el_volumeUp.style.display='none';
	}

	self.mute = function(){
		self.m.mute = !self.m.mute;
		if(self.m.mute){
			el_volumeDown.style.display='none';
			el_volumeProgress.style.display='none';
			el_volumeUp.style.display='none';
			el_volumeProgress.className = el_volumeProgress.className.replace(/vol\d+/g,'vol0')
		}else{
			el_volumeDown.style.display='inline-block';
			el_volumeProgress.style.display='inline-block';
			el_volumeUp.style.display='inline-block';
			el_volumeProgress.className = el_volumeProgress.className.replace(/vol\d+/g,'vol' + Math.floor(self.m.volume*10));
		}
		self.vjs.volume(self.m.mute? 0: '' + self.m.volume.toFixed(1));
	}

	self.volume = function(val){
		if(val != undefined){
			val = val > 1 ? 1 : val;
			val = val < 0 ? 0 : val;
			self.m.volume = Math.ceil(val*10)/10;
			self.vjs.volume(self.m.volume.toFixed(1));
			el_volumeProgress.className = el_volumeProgress.className.replace(/vol\d+/g,'vol' + Math.ceil(self.m.volume*10));
		}else{
			return self.m.volume;
		}
	}

	self.volup = function(){
		if(Math.round(self.m.volume*10) < 10){
			self.m.volume = self.m.volume + 0.1;
			self.vjs.volume(self.m.volume.toFixed(1));
			el_volumeProgress.className = el_volumeProgress.className.replace(/vol\d+/g,'vol' + Math.ceil(self.m.volume*10));
		}
	};

	self.voldown = function(){
		if(Math.round(self.m.volume*10) > 0){
			self.m.volume = self.m.volume - 0.1;
			self.vjs.volume(self.m.volume.toFixed(1));
			el_volumeProgress.className = el_volumeProgress.className.replace(/vol\d+/g,'vol' + Math.floor(self.m.volume*10));
		}
	};
	
	el_volumeMute.onclick = self.mute;
	el_volumeDown.onclick = self.voldown;
	el_volumeUp.onclick = self.volup;
	
	// init volume
	self.vjs.ready(function(){
		self.vjs.muted(false);
		self.volume(self.m.volume);	
	});
	
}

vxgcloudplayer.isIpV4 = function(ip){
	return (ip.match(/^([0-9]{1,3}\.){3}[0-9]{1,3}/)!=null);
}

vxgcloudplayer.validIpV4 = function(ip){
	var cur_a = ip.split(".");
	for(var i = 0; i < 4; i++){
		var t = parseInt(cur_a[i],10);
		if(t < 0 || t > 255){
			return false;
		}
	}
	return true;
}

vxgcloudplayer.convertIpV4ToInt = function(ip){
	var cur_a = ip.split(".");
	var result = 0;
	var k = 1;
	for(var i = 3; i >= 0; i--){
		result += parseInt(cur_a[i],10)*k;
		k = k*256;
	}
	return result;
}

vxgcloudplayer.isPublicUrl = function(url){
	var a = CloudAPI.parseUri(url);
	if(a.host == "localhost") return false;
	if(vxgcloudplayer.isIpV4(a.host)){
		if(!vxgcloudplayer.validIpV4(a.host)){
			console.error("Address " + a.host + " - invalid address");
			return false;
		}

		var cur_a = vxgcloudplayer.convertIpV4ToInt(a.host);
		var local_addresses = [];
		local_addresses.push({'from': '10.0.0.0', 'to': '10.255.255.255', 'comment': 'single class A network'});
		local_addresses.push({'from': '172.16.0.0', 'to': '172.31.255.255', 'comment': '16 contiguous class B network'});
		local_addresses.push({'from': '192.168.0.0', 'to': '192.168.255.255', 'comment': '256 contiguous class C network'});
		local_addresses.push({'from': '169.254.0.0', 'to': '169.254.255.255', 'comment': 'Link-local address also refered to as Automatic Private IP Addressing'});
		local_addresses.push({'from': '127.0.0.0', 'to': '127.255.255.255', 'comment': 'localhost addresses'});		
		for(var i in local_addresses){
			var range_from = vxgcloudplayer.convertIpV4ToInt(local_addresses[i].from);
			var range_to = vxgcloudplayer.convertIpV4ToInt(local_addresses[i].to);
			var comment = local_addresses[i].comment;
			if(cur_a >= range_from && cur_a <= range_to){
				console.error(comment);
				return false;
			}
		}
	}
	return true;
}

vxgcloudplayer.isMobile = function() { 
	if(navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	){
		return true;
	};
	return false;
}

vxgcloudplayer.loggined = function(){
	CloudAPI.accountInfo().done(function(r){
		if(r.preferred_name == "vxgcloudplayer"){
			r.preferred_name = "demo";
		}
		$('.logout').html('Logout (' + r.preferred_name + ')');
		resizeVXGCloudPlayer();
		console.log(r);
	});
}

// on load init 
document.addEventListener('DOMContentLoaded', function() {
	if(CloudAPI.isExpiredApiToken()){
		vxgcloudplayer.accp_login().done(function(){
			vxgcloudplayer.loggined();
		});
	}else{
		vxgcloudplayer.loggined();
	}
	
	var els = document.getElementsByClassName("vxgcloudplayer");
	for (var i = 0; i < els.length; i++) {
		if(els[i].id){
			vxgcloudplayer(els[i].id);
		}else{
			console.error("Player has not id", els[i]);
		}
	}
});
