<?php
    $page=$_GET['page'];
?>

<!DOCTYPE html>
<html>
    <head>
        <title>TRI ORIEŠKY</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="description" content="..." />
        <meta name="keywords" content="..." />
        <meta name="author" content="Miroslav Cibulka, Jana Cibulkova" />
        <link rel="stylesheet" type="text/css" href="styles/default.css" />
        <link rel="shortcut icon" type="image/png" href="http://localhost:47538/favicon.ico"/>
        <script type="text/javascript" src="scripts/request.js"></script>
        <script type="text/javascript" src="scripts/gallery.js"></script>
        <script type="text/javascript">
            function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
                }
                return "";
            } 
            function init() {
                var page = "<?php echo $page; ?>";
                console.log(document.cookie);
                if (page == "") {
                    page = getCookie("page");
                    if (page == "") {
                        page = "index";
                        style = "home";
                    }
                }
                if (page == "index") {
                    style = "home";
                } else {
                    style = "default";
                }
                var tmp = new ajaxCreateRequest("header.html", "header-wrapp", style);
                tmp.send();
                tmp = new ajaxCreateRequest(page+".html", "body-wrapp", style);
                tmp.send();
                tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", style);
                tmp.send();
            };
        </script>
    </head>
    <body class="home" onload="init();">
        <div id="wellcome" style="background-image: url('../img/anim.gif?v=<?php echo Date("Y.m.d.G.i.s")?>')" ></div>
        <div id="header-wrapp" onclick="goto('home');"></div>
        <div id="body-wrapp"></div>
        <div id="footer-wrapp"></div>
    </body>
</html>