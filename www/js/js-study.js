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

/*
 * 练习数组和对象的创建方式
 */
function arrayAndObjext(){
	
	var a = new Array({key:"jzz", value:"100"}, {key:"jzl", value:"1000"});
	for (var i = 0; i < a.length; i++) {
		console.log(a[i].key + " " + a[i].value);
	}
	var b = new Array("a", "b", "c");
	for (var i = 0; i < b.length; i++) {
		console.log(b[i]);
	}
	
	var c = (1, 2, 3);	//这种方式是错误的数组定义方法
	for (var i = 0; i < c.length; i++) {
		console.log(c[i]);
	}

	var d = new Array();
	d[0] = 1;
	d[1] = 2;
	for (var i = 0; i < d.length; i++) {
		console.log(d[i]);
	}

	//创建对象方法1
	var person=new Object();
	person.firstname="Bill";
	person.lastname="Gates";
	person.age=56;
	person.toString=function(){
		return this.firstname + this.lastname + this.age;
	}
	console.log(person);
	console.log(person.toString());
	//创建对象方法2
	var person={firstname:"John",lastname:"Doe",age:50,eyecolor:"blue"};
	console.log(person);
	
}
