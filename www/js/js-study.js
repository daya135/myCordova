function myBrowser(){
	var userAgent = window.navigator.userAgent;
	if (userAgent.indexOf("Chrome") > -1) {
		alert("Chrome");
	}
	if (userAgent.indexOf("Opera") > -1) {
		alert("Opera");
	}
	if (userAgent.indexOf("Firefox") > -1) {
		alert("Firefox");
	}
	if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1) {
		//因为chrome浏览器的userAgent也带有safari的版本信息，所以要特殊处理
		alert(Safari);
	}
	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        alert("IE");
    }; //判断是否IE浏览器
}
