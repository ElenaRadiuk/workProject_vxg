(function ($) {

  var counter = 0;

  $(document).ready(function () {

    $('#fullpage').fullpage({
      scrollBar:true
    });
    
    $('input[name=state-d]').on('change', function () {
      var show = $(this).data('show');

      $(show).fadeIn().addClass('flex').siblings('.group').removeClass('flex').fadeOut();
      });

    //adjustVideoTopPos();
    adjustVideoWebPos();

    $('#qa-showall').on('click', function () {
      $('.qarow > div').slideDown();
      $(this).removeClass('visible-xs').fadeOut();
    });

    // $("a:not(.carousel-control)").click(function () {
    //   var elementClick = $(this).attr("href");
    //   var destination = $(elementClick).offset().top-50;
    //   jQuery("html:not(:animated),body:not(:animated)").animate({
    //     scrollTop: destination
    //   }, 1000);
    // });

    $("a.scrollto").click(function () {
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top;
      jQuery("html:not(:animated),body:not(:animated)").animate({
        scrollTop: destination
      }, 1000);
      return false;
    });


    // $("a.scrollto").click(function () {
    //   // $(".boilsForm").toggle();
    //   var elementClick = $(this).attr("href");
    //   var destination = $(elementClick).offset().top;
    //   jQuery("html:not(:animated),body:not(:animated)").animate({
    //     scrollTop: destination
    //   }, 1000);
    //   return false;
    // });

    // $(".getFree_btn").click(function () {
    //   // $(".boilsForm").toggle();
    //   jQuery("html:not(:animated),body:not(:animated)").animate({
    //     scrollTop: $('.boilsForm').offset().top - 44
    //   }, 1000);
    //
    // });


    $(".btn_choice").hide();
    $("#btn_choice_1").show();


    $("input[name$='platformCheck']").click(function () {
      var desc = $(this).val();
      $(".btn_choice").hide();
      $("#btn_choice_" + desc).fadeIn(400);
    });


    $(".btn_choice2").hide();
    $("#btn_choice_5").show();


    $("input[name$='platform2Check']").click(function () {
      var desc = $(this).val();
      $(".btn_choice2").hide();
      $("#btn_choice_" + desc).fadeIn(400);
    });


    $('.purchase_sdk').hide();
    $('.PerpetualSDKForm').hide();


    var $andr = $('.android_btn'),
      $ios = $(".ios_btn").hide();

    //$('.showIOSphone').hide();

    $('.switch2').click(function () {
      $(this).toggleClass("switch2On");
    });


//      $('.switch').click(function(){
//        $(this).toggleClass("switchOn");
//
//      });


    $('.switch_btn2 .checkbox').on('change', function () {
      if ($(this).prop('checked')) {
        $(".AndroidSDKForm").hide();
        $andr.fadeOut();
        $ios.fadeIn();
//              $('.showAphone').hide("slow");
        $('.showAphone img').fadeOut();
//              $('.showIOSphone').show("slow");
        $('.showIOSphone img').fadeIn();

      } else {
        $(".iOSSDKForm").hide();
        $ios.fadeOut();
        $andr.fadeIn();
        $('.showIOSphone img').fadeOut();
        $('.showAphone img').fadeIn();

      }
    });

    $('.switch_btn3 .checkbox').on('change', function () {
      if ($(this).prop('checked')) {
        $('.showAphone img').fadeOut();
        $('.showIOSphone img').fadeIn();

      } else {
        $('.showIOSphone img').fadeOut();
        $('.showAphone img').fadeIn();

      }
    });


    $('.purch_btn').click(function () {
      if ($(this).hasClass("goto_dashboard")) return;
      var e = $(".purchase_sdk");
      e.slideToggle();
      $(".AndroidSDKForm, .PerpetualSDKForm").hide();
      jQuery("html:not(:animated),body:not(:animated)").animate(e.length ? {
        scrollTop: $('.purchase_sdk').eq(0).offset().top - 44
      }:null, 1000);
    });

    $('.perpet_btn').click(function () {
        var e = $(".PerpetualSDKForm");
      e.slideToggle();
      $(".AndroidSDKForm, .purchase_sdk").hide();
      jQuery("html:not(:animated),body:not(:animated)").animate(e.length ? {
        scrollTop: $('.PerpetualSDKForm').eq(0).offset().top - 44
      }:null, 1000);
    });

    $('.android_btn2').click(function () {
      if ($(this).hasClass("goto_dashboard")) return;
      var e = $(".AndroidSDKForm");
      e.slideToggle();
      $(".PerpetualSDKForm, .purchase_sdk").hide();
      jQuery("html:not(:animated),body:not(:animated)").animate(e.length ? {
        scrollTop: $('.AndroidSDKForm').eq(0).offset().top - 44
      }:null, 1000);
    });


    $andr.click(function () {
      $(".AndroidSDKForm").slideToggle();
      $(".iOSSDKForm").hide();
      jQuery("html:not(:animated),body:not(:animated)").animate({
        scrollTop: $('.what_boils_download').eq(0).offset().top - 44
      }, 1000);
    });

    $ios.click(function () {
      $(".iOSSDKForm").slideToggle();
      $(".AndroidSDKForm").hide();
      jQuery("html:not(:animated),body:not(:animated)").animate({
        scrollTop: $('.what_boils_download').eq(1).offset().top - 44
      }, 1000);
    });


      // var $andrTempl = $('.templates3'),
      //     $iosTempl = $(".templatesiOS:not(.group)").hide();


      var $andrTempl = $('#players .templates3'),
          $iosTempl = $("#players .templatesiOS").hide();


    $('.switch').click(function () {
      $(this).toggleClass("switchOn");
    });


    $('.switch_btn .checkbox').on('change', function () {
      if ($(this).prop('checked')) {
        $andrTempl.fadeOut();
        $iosTempl.fadeIn();
      } else {
        $iosTempl.fadeOut();
        $andrTempl.fadeIn();
      }
    });
  });
  $popup = $('.popup');
  $popup.find('button').add('.close').on('click', function () {
    $popup.removeClass('show');
  });


  var newsItems = $('.grid-item');
  var count = 16;
  $(document).on('click', '#more-posts', function (e) {

    //$(this).hide();
    newsItems.slice(0, count).show(300, function () {
      masonry_init();
    });

    if (newsItems.length <= count) {
      $(this).hide();
    }

    count += 8;
  });


  $(window).on('resize', function () {
    //adjustVideoTopPos();
    adjustVideoWebPos();
  });

  $('a[href=#wizard]').on('click', function () {
    $('.wizard').slideDown();
  });
  $('a[href=#players]').on('click', function () {
    $('.players').slideDown();
  });

  function adjustVideoTopPos() {
    var container = $('.showAphone');
    var height = container.find('img').height();
    container.each(function (i) {
      var multi = (i) ? .815 : .89;
      $(this).height(height).find('video').height(height * multi);
      if (!counter) {
        $(this).find('video').show();
      }
      counter++;
    });
  }

  function adjustVideoWebPos() {
    var container = $('.web-video');
    var height = container.find('img').height();
    container.each(function (i) {
      var multi = (i) ? .815 : .89;
      $(this).find('video').height(height * multi);
    });


  }
})(jQuery);

function masonry_init() {
  var container = document.querySelector('.grid');

  if (container) {
    var masonry = new Masonry(container, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  }
}
window.onload = masonry_init;

function mobileAndTabletcheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

    return check;
};

if (!mobileAndTabletcheck()) {
    var sources = document.querySelectorAll('video.hidden-xs source');
    var video = document.querySelector('video.hidden-xs');
    for(var i = 0; i<sources.length;i++) {
        sources[i].setAttribute('src', sources[i].getAttribute('data-src'));
    }
    video.load();
}



/**
 * Проверяет элемент на попадание в видимую часть экрана.
 */
function isVisible(elem) {

    var coords = elem.getBoundingClientRect();

    var windowHeight = document.documentElement.clientHeight;

    // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
    var topVisible = coords.top > 0 && coords.top < windowHeight;
    var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
}


function showVisible() {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {

        var img = imgs[i];

        var realsrc = img.getAttribute('data-realsrc');
        if (!realsrc) continue;

        if (isVisible(img)) {
            img.src = realsrc;
            img.setAttribute('data-realsrc', '');
        }
    }

}

window.onscroll = showVisible;
showVisible();

    var trybtn = document.querySelectorAll('.btn a');

    for (var i=0; i<trybtn.length; i++) {
        trybtn[i].addEventListener('click', targetwizard, true);
    }

function targetwizard() {

      var w = window.pageYOffset,
        hash = this.getAttribute('href').substring(1);
      var t = document.getElementById(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
        V = 1,  // скорость
      start = null;

    requestAnimationFrame(step);
    function step(time) {
        if (start === null) start = time;
        var progress = time - start,
            r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
        window.scrollTo(0,r);
        if (r != w + t) {
            requestAnimationFrame(step)
        } else {
            location.hash = hash;  // URL с хэшем
        }
    }

}



var svcp_host = 'https://web.skyvr.videoexpertsgroup.com';
var accp_host = 'https://cnvrclient2.videoexpertsgroup.com';

function showUserIdWindow() {
    var vendor = $('#vendor').val();
    var provider = $('#provider').val();
    popupWin = window.open(svcp_host + '/svcauth/init?&src=doc&nouser&provider=' + provider + '&vendor=' + vendor + '&redirect=' + window.location + '../api/user_info.html',
        'Client Login','location');
    popupWin.focus();
    return false
}

function loginAsAdmin() {
    var uname = $('#adm_login').val();
    var pwd = $('#adm_pwd').val();
    $.ajax(accp_host + '/api/v1/account/login/', {
        type : 'POST',
        async : false,
        crossDomain: true,
        data: JSON.stringify({"username": uname, "password": pwd}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        complete : function(response, textStatus) {
            if (response.status == 200) {
                var obj = JSON.parse(response.responseText);
                url = obj['svcp_auth_web_url']
                console.log(url + '&redirect=' + window.location + 'adm_login_done.html');
                window.open(url + '&redirect=' + window.location + '../api/adm_login_done.html');
            }
            else
                alert('Wrong login/password. Please try again...')
        }
    })
}

var ApiToken = null, ApiTokenExpire = null;
function saveApiToken(token, expire) {
    ApiToken = token;
    ApiTokenExpire = expire;

    // Initial token has a short life time - refresh it
    // Here must be start of a normal refreshing scheme later
    $.ajax(svcp_host + '/api/v2/account/token/api/', {
        type : 'GET',
        async: true,
        crossDomain: true,
        headers: {
            "Authorization": "SkyVR " + ApiToken
        },
        complete : function(response, textStatus) {
            var obj = JSON.parse(response.responseText);
            ApiToken = obj['token'];
            ApiTokenExpire = obj['expire'];
        }
    });

    if (ApiToken) {
        done_msg.innerHTML = '<b>Done!</b>'
    }
}

function fillUserID(suid) {
    $('#suid').val(suid);
}

var UserID = null
function createUser() {
    if (ApiToken == null) {
        alert('Please login as admin first ...')
        return;
    }

    var provider = $('#provider').val();
    var suid = $('#suid').val();
    if (provider == "" || suid == "") {
        alert('Please check that Google User ID is  filled...')
        return;
    }

    $.ajax(svcp_host + '/api/v2/admin/users/', {
        type : 'POST',
        async : false,
        crossDomain: true,
        data: JSON.stringify({"usrc": provider, "suid": suid}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "SkyVR " + ApiToken
        },
        complete : function(response, textStatus) {
            switch(response.status) {
                case 201:
                    var obj = JSON.parse(response.responseText);
                    UserID = obj['id'];
                    $('#vxg_user_id').val(UserID);
                    $('#vxg_user_id2').val(UserID);
                    alert( "User successfully created!" );
                    break;
                case 409:
                    $.ajax(svcp_host + '/api/v2/admin/users/?usrc=' + provider + '&suid=' + suid, {
                        type : 'GET',
                        async : false,
                        crossDomain: true,
                        headers: {
                            "Authorization": "SkyVR " + ApiToken
                        },
                        complete : function(response, textStatus) {
                            var obj = JSON.parse(response.responseText);
                            UserID = obj['objects'][0]['id']
                            $('#vxg_user_id').val(UserID);
                            $('#vxg_user_id2').val(UserID);

                            alert( "Existing user info successfully obtained!" );
                        }
                    });
                    break;
                default:
                    alert( "Can't create user:nn" + response.responseText );
            }
        }
    });
}

function buildGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function createVideoSource() {
    if (UserID == null) {
        alert('Please login as admin and create new user first')
        return;
    }

    var guid = buildGuid();
    var suid = $('#suid').val();
    var cam_id = null;
    $.ajax(svcp_host + '/api/v2/admin/cameras/', {
        type : 'POST',
        async : false,
        crossDomain: true,
        data: JSON.stringify({"owner": {"id": UserID}, "uuid": guid, "limits": {"expected_bitrate": 500, "records_duration": 8, "download_duration": 8, "clips_duration": 1}}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "SkyVR " + ApiToken
        },
        complete : function(response, textStatus) {
            if (response.status == 201) {
                var obj = JSON.parse(response.responseText);
                cam_id = obj['id'];
            }
            else
                alert( "Can't create video source:nn" + response.responseText);
        }
    })

    if (cam_id != null) {
        $.ajax(svcp_host + '/api/v2/admin/cameras/' + cam_id.toString(10) + '/reg_tokens/', {
            type : 'POST',
            async : false,
            crossDomain: true,
            data: JSON.stringify({"ttl": 86400}),     // ttl = 1 day
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "SkyVR " + ApiToken
            },
            complete : function(response, textStatus) {
                if (response.status == 201) {
                    var obj = JSON.parse(response.responseText);
                    $('#reg_token').val(obj['token'])
                    alert( "Video source successfully created!");
                }
                else
                    alert( "Can't get reg_token:nn" + response.responseText);
            }
        })
    }
}
