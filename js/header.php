<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta http-equiv="Content-type" content="text/html; charset=<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title><?php echo wp_get_document_title(); ?><?php // bloginfo('name'); ?></title>
  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>"/>
  <!--  <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600" rel="stylesheet">--> <?php wp_head(); ?>
  <script>  (function (i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function () {
              (i[r].q = i[r].q || []).push(arguments)
          }, i[r].l = 1 * new Date();
          a = s.createElement(o), m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
      ga('create', 'UA-53564579-5', 'auto');
      ga('send', 'pageview');</script>
</head>
<body <?php body_class(); ?>>
<!-- BEGIN GADWP v4.9.4 Universal Tracking - https://deconf.com/google-analytics-dashboard-wordpress/ -->
<script>(function (w, d, t, r, u) {
        var f, n, i;
        w[u] = w[u] || [], f = function () {
            var o = {ti: "5140551"};
            o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
        }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
            var s = this.readyState;
            s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
        }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
    })(window, document, "script", "//bat.bing.com/bat.js", "uetq");</script>
<noscript><img src="//bat.bing.com/action/0?ti=5140551&Ver=2" height="0" width="0"
               style="display:none; visibility: hidden;"></noscript>
<script type="text/javascript">  (function (d, w, c) {
        (w[c] = w[c] || []).push(function () {
            try {
                w.yaCounter26960073 = new Ya.Metrika({
                    id: 26960073,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true
                });
            } catch (e) {
            }
        });
        var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () {
            n.parentNode.insertBefore(s, n);
        };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";
        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else {
            f();
        }
    })(document, window, "yandex_metrika_callbacks");</script>
<noscript>
  <div><img src="https://mc.yandex.ru/watch/26960073" style="position:absolute; left:-9999px;" alt=""/></div>
</noscript>
<div class="container-fluid">
  <div class="">
    <header class="header_menu">
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
            <a class="navbar-brand" href="/"><img src="<?php bloginfo('template_url'); ?>/images/logo.png" alt="vxg"
                                                  class="img-responsive"></a></div>
          <div class="collapse navbar-collapse"
               id="bs-example-navbar-collapse-1">                            <? wp_nav_menu(array('theme_location' => 'menu', 'menu_class' => 'nav navbar-nav navbar-right', 'container' => 'false')); ?>            </div>
        </div>
      </nav>
    </header>
  </div>
</div>
<!-- Google Code for Cloud click Conversion PageIn your html page, add the snippet and callgoog_report_conversion when someone clicks on thechosen link or button. -->
<script type="text/javascript">  /* <![CDATA[ */
    goog_snippet_vars = function () {
        var w = window;
        w.google_conversion_id = 868683700;
        w.google_conversion_label = "KjjpCM2l8HUQtJ-cngM";
        w.google_remarketing_only = false;
        w.google_conversion_value = 0;
    }  // DO NOT CHANGE THE CODE BELOW.
    goog_report_conversion = function (url) {
        goog_snippet_vars();
        window.google_conversion_format = "3";
        var opt = new Object();
        opt.onload_callback = function () {
            if (typeof(url) != 'undefined') {
                window.location = url;
            }
        }
        var conv_handler = window['google_trackConversion'];
        if (typeof(conv_handler) == 'function') {
            conv_handler(opt);
        }
    }
    /* ]]> */</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion_async.js"></script>