<?php
    $page=$_GET['page'];
    if ($page == "") {
        $page="index";
        $style="home";
    } 
    if ($page != "index") {
        $style="default";
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="description" content="..." />
        <meta name="keywords" content="..." />
        <meta name="author" content="Miroslav Cibulka, Jana Cibulkova" />
        <title>TRI ORIEŠKY</title>
        <link rel="stylesheet" type="text/css" href="styles/default.css" />
        <script type="text/javascript" src="scripts/request.js"></script>
        <script type="text/javascript">
            function init() {
                var tmp = new ajaxCreateRequest("header.html", "header-wrapp", "<?php echo $style; ?>");
                tmp.send();
                tmp = new ajaxCreateRequest("<?php echo $page; ?>.html", "body-wrapp", "<?php echo $style; ?>");
                tmp.send();
                tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", "<?php echo $style; ?>");
                tmp.send();
            };
        </script>
    </head>
    <body class="home" onload="init();">
        <div id="header-wrapp"></div>
        <div id="body-wrapp"></div>
        <div id="footer-wrapp"></div>
    </body>
</html>