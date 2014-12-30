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
        if (content == "body-wrapp")
            document.cookie = "page=" + this.page.substr(0, this.page.length-5) + ";";
        xmlhttp.onreadystatechange = (function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById(content).innerHTML = xmlhttp.responseText;
                body.className = style;
                if (content == "footer-wrapp")
                    ready = true;
            }
        });
        xmlhttp.open("GET", "php/getContent.php?page=" + this.page, true);
        xmlhttp.send();
    });
};

/// isFree je premenna ktora ukazuje ci sa prave nemeni opacity ak hej tak funkcia nerobi nic
/// c je pocitadlo opacity
/// Ready je zamok ktory caka kym sa nacita a vypise vsetko co sa ma
var isFree = true, c = 25, ready = true;
function goto(add) {
    if (isFree) {
        isFree = false;
        var body = document.getElementById("body-wrapp"), 
            half = false,                       // Half -> ci je pred alebo po zobrazovani kontextu
            int = setInterval(function () {     // cyklicky interval koci ked sa plne zobrazi kontext
                if (c == 1) {
                    ready = false;
                    if (add == "home") {
                        tmp = new ajaxCreateRequest("header.html", "header-wrapp", "home");
                        tmp.send();
                        tmp = new ajaxCreateRequest("index.html", "body-wrapp", "home");
                        tmp.send();
                        tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", "home");
                        tmp.send();
                    } else {
                        tmp = new ajaxCreateRequest("header.html", "header-wrapp", "default");
                        tmp.send();
                        tmp = new ajaxCreateRequest(add, "body-wrapp", "default");
                        tmp.send();
                        tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", "default");
                        tmp.send();
                    }
                    c++;
                    half = true;
                }
                if (ready)
                    if (!half) {
                        c--;
                        body.style.opacity = c / 25;
                    } else if (half) {
                        c++;
                        body.style.opacity = c / 25;
                        if (c == 25) {
                            isFree = true;
                            clearInterval(int);
                        }
                    }
            }, 2);
    }
}