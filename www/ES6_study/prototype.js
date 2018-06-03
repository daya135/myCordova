/* prototype constructor typeof instanceof */
/* 定义function时，JavaScript内部自动做了以下操作：
 * （前提：所有function均为Function的实例对象）
 * 1.为该函数添加一个原形（即 prototype）属性
 * 2.为prototype 对象额外添加一个 constructor 属性，并且该属性保存指向函数F的一个引用，所以其实例对象也获得了constructor属性
 */
function Person(id, username, password){
	this.id = id;
	this.username = username;
	this.password = password;
	
	Person.prototype.getPrimaryKey = function() {
		return 'id';
	}
}

var person = new Person('1','jzz','123');
console.log(Person.prototype.constructor === person.constructor); //true  每一个对象实例中可以访问构造函数的 prototype 所有拥有的全部属性和方法，就好像它们是实例自己的一样。
console.log(person.constructor === Person); //true
console.log(Person.constructor === Function); //true 所有函数都是 Function 构造函数的实例对象

console.log(Person.prototype.toString());
console.log(person.prototype);  //undefined, 这很好理解，虽说person获了得Person.prototype的全部属性（但person对象自身并没有prototype属性，除非自己手动添加）

console.log(Person instanceof Function); // true
console.log(person instanceof Person); //true
console.log(typeof(Person));  //'function'  typeof返回的一定是个字符串
console.log(typeof(person)); //'object' 注意这里，足以显示出typeof的局限性，不能返回具体的类型
