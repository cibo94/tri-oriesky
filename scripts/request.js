function ajaxCreateRequest (page, content, style) {
    this.page = page;
    this.content = content;
    this.style = style;
    this.send = (function () {
        var xmlhttp = new XMLHttpRequest(),
            body = document.getElementsByTagName("body")[0],
            loading = document.getElementById("loading"),
            content = this.content,
            style = this.style;
        xmlhttp.onreadystatechange = (function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById(content).innerHTML = xmlhttp.responseText;
                body.className = style;
            }
        });
        xmlhttp.open("GET", "php/getContent.php?page=" + this.page, true);
        xmlhttp.send();
    });
};

var tmp = new ajaxCreateRequest("header.html", "header-wrapp", "home");
tmp.send();
tmp = new ajaxCreateRequest("index.html", "body-wrapp", "home");
tmp.send();
tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", "home");
tmp.send();
