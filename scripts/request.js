var ajaxCreateRequest = (function (page, content, style) {
	this.page = page;
	this.content = content;
	this.style = style;
    this.send = (function () {
        var xmlhttp = new XMLHttpRequest(),
				body = document.getElementsByTagName("body")[0],
				loading = document.getElementById("loading");
        loading.id = "loading";
        console.log("sending");
        xmlhttp.onreadystatechange = (function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById(this.content).innerHTML = xmlhttp.responseText;
                loading.id = "loaded";
                body.className = this.style;
            }
        });
        xmlhttp.open("GET", "php/getContent.php?page=" + this.page, true);
        xmlhttp.send();
    });
});
