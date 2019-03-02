<footer>
   <div class="container">
    <div class="row text-center">
	<div class="col-xs-12 col-sm-7 col-md-7 copyright">
    
    <p class="copyright">&#169; <?=date('Y')?> VXG Inc. | All Rights Reserved.&nbsp;&nbsp;
      <span>
        <a href="https://www.videoexpertsgroup.com/legal-docs/License_and_Terms_of_Service.html">Terms</a>
      </span>  |
      <span>
        <a href="https://www.videoexpertsgroup.com/legal-docs/Privacy_Statement.html">Privacy</a>
      </span>  |
      <span>
        <a href="https://www.videoexpertsgroup.com/legal/">Legal</a>
      </span>
    </p>
    
    </div>
    <div class="col-xs-12 col-sm-5 col-md-5 social text-center">
    
    <a href="https://www.linkedin.com/company/vxg-inc." target="_blank" rel="nofollow"><span class="fa fa-linkedin fa-2x" aria-hidden="true"></span><span class="offset">Linkedin</span></a>
    <a href="https://twitter.com/VXG_Inc" target="_blank" rel="nofollow"><span class="fa fa-twitter fa-2x" aria-hidden="true"></span><span class="offset">Twitter</span></a>
    
    <a href="https://www.facebook.com/videoexpertsgroup/" target="_blank" rel="nofollow"><span class="fa fa-facebook fa-2x" aria-hidden="true"></span><span class="offset">Facebook</span></a>
    <a href="https://www.youtube.com/channel/UCqoDBzdNycAvj3j9R6oOj7A" target="_blank" rel="nofollow"><span class="fa fa-youtube-play fa-2x" aria-hidden="true"></span><span class="offset">Youtube</span></a>
    
    </div>
    
    </div>
    
    </div>
</footer>
<div class="popup">
  <span class="close"><span class="fa fa-times"></span></span>
  <div class="center">
    <p>Your message was sent successfully.</p>
    <p style="font-style: italic;">Thanks.</p>
    <button type="button" class="btn">close</button>
  </div>
</div>



<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 942348930;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/942348930/?value=0&guid=ON&script=0"/>
</div>
</noscript>
<script type="text/javascript" src='https://crm.zoho.com/crm/javascript/zcga.js'> </script>

<!--<script src="/jquery.min.js"></script>-->

<script>
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


</script>

	<?php wp_footer(); ?>

<!--
	</div>
</div>
-->
<!-- Google Code for Remarketing Tag -->
<!--------------------------------------------------
Remarketing tags may not be associated with personally identifiable information or placed on pages related to sensitive categories. See more information and instructions on how to setup the tag on: http://google.com/ads/remarketingsetup
--------------------------------------------------->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 868683700;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/868683700/?guid=ON&amp;script=0"/>
</div>
</noscript>
</body>
</html>
